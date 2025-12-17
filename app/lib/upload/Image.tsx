'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    arrayMove,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import {isFile, makeArray} from "@/lib/function";
import { useUploadState } from '@/lib/upload/hook/useUploadState';

type UploadImageItem = {
    id: string;
    file?: File | string;
    preview: string;
};

type UploadImageProps = {
    title: string;
    uploadState: ReturnType<typeof useUploadState>;
};

// 개별 이미지 박스
function SortableImage({
                           image,
                           onDelete,
                       }: {
    image: UploadImageItem;
    onDelete: (id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: image.id,
    });

    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        width: '150px',
        height: '150px',
        position: 'relative',
        flex: '0 0 auto',
        cursor: 'default',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="rounded border shadow-sm overflow-hidden bg-white"
        >
            <img
                {...listeners}
                src={image.preview}
                alt="preview"
                className="w-full h-full cursor-pointer"
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(image.id);
                }}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded"
            >
                ✕
            </button>
        </div>
    );
}

export default function UploadImage({ title, uploadState }: UploadImageProps) {
    const [images, setImages] = useState<UploadImageItem[]>([]);
    const objectUrlMap = useRef<Map<string, string>>(new Map());

    // 최초 fileData로 초기화
    useEffect(() => {
        const initial = uploadState.fileData.map((item, index) => {
            if (typeof item === 'string') {
                return {
                    id: item,
                    file: item,
                    preview: process.env.NEXT_PUBLIC_PROFILE == "local" ? `http://localhost:9090/${item}` : "/"+item
                };
            } else {
                let url = objectUrlMap.current.get(item.name);
                if (!url) {
                    url = URL.createObjectURL(item);
                    objectUrlMap.current.set(item.name, url);
                }

                return {
                    id: item.name + index,
                    file: item,
                    preview: url
                };
            }
        });

        setImages(initial);
    }, [uploadState.fileData]);

    // 파일 업로드 시 처리
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map((file) => ({
            id: uuidv4(),
            file,
            preview: URL.createObjectURL(file),
        }));

        const initFiles = [...images]
            .filter((img): img is UploadImageItem & { file: (File | string) } => !!img.file)
            .map(img => img.file);

        const allFiles = [...images, ...newImages]
            .filter((img): img is UploadImageItem & { file: (File | string) } => !!img.file)
            .map(img => img.file);

        uploadState.setFileOrder(makeArray(initFiles.length));
        uploadState.setFileData(allFiles);

        uploadState.fileMultipartFileOrder
            ? uploadState.setFileMultipartFileOrder([
                ...uploadState.fileMultipartFileOrder,
                ...Array.from({ length: newImages.length }, (_, i) => allFiles.length + i - 1)
            ])
            : uploadState.setFileMultipartFileOrder(
                Array.from({ length: newImages.length }, (_, i) => initFiles.length + i)
            );

    }, [images, uploadState]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
        maxSize: 10 * 1024 * 1024,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(rejection => {
                rejection.errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        alert(`파일 "${rejection.file.name}" 은(는) 10MB를 초과하여 업로드할 수 없습니다.`);
                    }
                });
            });
        }
    });

    // 삭제
    const onDelete = useCallback((id: string) => {
        const toRevoke = images.find((img) => img.id === id);
        if (toRevoke?.file) {
            URL.revokeObjectURL(toRevoke.preview);
        }

        const updated = images.filter((img) => img.id !== id);

        const updatedToMap = updated
            .filter((img): img is UploadImageItem & { file: File | string } => !!img.file)
            .map((img) => img.file);

        setImages(updated);
        uploadState.setFileData(updatedToMap);

        uploadState.setFileOrder(updated
            .map((img, index) => (typeof img.file === 'string' ? index : -1))
            .filter(index => index !== -1));

        uploadState.setFileMultipartFileOrder(updated
            .map((img, index) => (img.file instanceof File ? index : -1))
            .filter(index => index !== -1));

        if (!isFile(toRevoke?.file)) {
            let imageIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === id);
            uploadState.setFileIndex(uploadState.fileIndex.filter((_, idx) => idx !== imageIndex));
            uploadState.fileDeleteIndex
                ? uploadState.setFileDeleteIndex([...uploadState.fileDeleteIndex, uploadState.fileIndex[imageIndex]])
                : uploadState.setFileDeleteIndex([uploadState.fileIndex[imageIndex]]);
        }
    }, [images, uploadState]);

    // 정렬 변경
    const onDragEnd = useCallback((event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over?.id);
            const oldImage = images.find((img) => img.id === active.id);
            const newImage = images.find((img) => img.id === over?.id);
            const newImages = arrayMove(images, oldIndex, newIndex);
            setImages(newImages);

            const orderedFiles = newImages
                .filter((img): img is UploadImageItem & { file: (File | string | object) } => !!img.file)
                .map((img) => img.file);

            let oldImageIsFile = isFile(oldImage?.file);
            let newImageIsFile = isFile(newImage?.file);

            uploadState.setFileData(orderedFiles);

            const newMultipartStringOrder = newImages
                .map((img, index) => (typeof img.file === 'string' ? index : -1))
                .filter(index => index !== -1);

            uploadState.setFileOrder(newMultipartStringOrder);

            if(!oldImageIsFile && !newImageIsFile){
                let oldStringIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === active.id);
                let newStringIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === over?.id);

                let newImagesIndex = arrayMove(uploadState.fileIndex, oldStringIndex, newStringIndex);
                uploadState.setFileIndex(newImagesIndex);
            }

            if(uploadState.fileMultipartFileOrder){
                const newMultipartFileOrder = newImages
                    .map((img, index) => (img.file instanceof File ? index : -1))
                    .filter(index => index !== -1);

                uploadState.setFileMultipartFileOrder(newMultipartFileOrder);
            }
        }
    }, [images, uploadState]);

    return (
        <div className="w-full mx-auto py-2">
            <h1 className="text-sm font-bold my-3">
                {title}
            </h1>

            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg cursor-pointer hover:border-blue-500 transition"
            >
                <input {...getInputProps()} />
                <p className="text-gray-600">이미지를 클릭 또는 드래그하여 업로드하세요</p>

                {images.length > 0 && (
                    <div className="mt-6">
                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
                                <div className="flex flex-wrap gap-4">
                                    {images.map((image) => (
                                        <SortableImage key={image.id} image={image} onDelete={onDelete}/>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                )}
            </div>
        </div>
    );
}
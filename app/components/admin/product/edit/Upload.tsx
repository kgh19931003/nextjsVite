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
import {isFile, isNumeric, makeArray} from "@/lib/function";

type UploadImageItem = {
    id: string;
    file?: File;        // 선택된 파일
    preview: (File | string | object)[];    // URL 또는 createObjectURL
};

type UploadImageProps = {
    productImage: (File | string)[];
    productImageIndex: number[],
    productImageDeleteIndex: number[],
    productImageMultipartFileOrder: number[],
    productImageOrder: number[],
    productImageUuid: string[],
    productImageDeleteUuid: string[],
    setProductImage: (files: (File | string | object)[]) => void;
    setProductImageIndex: (imageIndex: number[]) => void;
    setProductImageDeleteIndex: (imageDeleteIndex: number[]) => void;
    setProductImageMultipartFileOrder: (imageMultipartFileOrder: number[]) => void;
    setProductImageOrder: (imageOrder: number[]) => void;
    setProductImageUuid: (imageUuid: string[]) => void;
    setProductImageDeleteUuid: (imageDeleteUuid: string[]) => void;
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
                className="w-full h-full object-cover cursor-pointer"
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

export default function UploadImage({
                  productImage, setProductImage,
                  productImageIndex, setProductImageIndex,
                  productImageUrl, setProductImageUrl,
                  productImageOrder, setProductImageOrder,
                  productImageUuid, setProductImageUuid,
                  productImageDeleteUuid, setProductImageDeleteUuid,
                  productImageMultipartFileOrder, setProductImageMultipartFileOrder,
                  productImageDeleteIndex, setProductImageDeleteIndex
}: UploadImageProps) {

    const [images, setImages] = useState<UploadImageItem[]>([]);
    const objectUrlMap = useRef<Map<string, string>>(new Map());


    // 최초 productImage로 초기화
    useEffect(() => {
        const initial = productImage.map((item, index) => {
            if (typeof item === 'string') {
                return {
                    id: item, // 문자열 URL 자체를 id로 사용
                    file: item,
                    preview: "http://localhost" + item
                };
            } else {
                // File일 경우 캐시된 URL 재사용
                let url = objectUrlMap.current.get(item.name);
                if (!url) {
                    url = URL.createObjectURL(item);
                    objectUrlMap.current.set(item.name, url);
                }

                return {
                    id: item.name + index, // 파일명+인덱스 조합으로 id 생성
                    file: item,
                    preview: url
                };
            }
        });

        setImages(initial);
    }, [productImage]);

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


        const newFiles = [...newImages]
            .filter((img): img is UploadImageItem & { file: (File | string) } => !!img.file)
            .map(img => img.file);

        setProductImageOrder(makeArray(initFiles.length))
        setProductImage(allFiles);

        productImageMultipartFileOrder ? setProductImageMultipartFileOrder([...productImageMultipartFileOrder, ...Array.from({ length: newImages.length }, (_, i) => allFiles.length + i - 1 )]) : setProductImageMultipartFileOrder(Array.from({ length: newImages.length }, (_, i) => initFiles.length + i ))

    }, [images, setProductImage]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    // 삭제
    const onDelete = (id: string) => {
        let updated: UploadImageItem[] = [];
        const indexToRemove = images.findIndex((img) => img.id === id); // 인덱스 추출

        const toRevoke = images.find((img) => img.id === id);
        if (toRevoke?.file) {
            URL.revokeObjectURL(toRevoke.preview);
        }

        updated = images.filter((img) => img.id !== id);

        const updatedToMap = updated
            .filter((img): img is UploadImageItem & { file: File | string } => !!img.file)
            .map((img) => img.file);

        // ✅ 먼저 이미지 상태만 갱신
        setImages(updated);


        // ✅ 이후에 다른 상태들 갱신 (렌더링 끝난 이후 실행됨)
        setProductImage(updatedToMap);


        setProductImageOrder(updated
            .map((img, index) => (typeof img.file === 'string' ? index : -1))
            .filter(index => index !== -1));

        setProductImageMultipartFileOrder(updated
            .map((img, index) => (img.file instanceof File ? index : -1))
            .filter(index => index !== -1))


        if (!isFile(toRevoke?.file)) {
            let imageIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === id);
            setProductImageIndex(productImageIndex.filter((_, idx) => idx !== imageIndex));
            productImageDeleteIndex ? setProductImageDeleteIndex( [...productImageDeleteIndex, productImageIndex[imageIndex]]) : setProductImageDeleteIndex([productImageIndex[imageIndex]])
        }
    };

    // 정렬 변경
    const onDragEnd = (event: any) => {
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


            let oldImageIsFIle = isFile(oldImage?.file)
            let newImageIsFIle = isFile(newImage?.file)

            setProductImage(orderedFiles);

            const newMultipartStringOrder = newImages
                .map((img, index) => (typeof img.file === 'string' ? index : -1))
                .filter(index => index !== -1);

            setProductImageOrder(newMultipartStringOrder)


            if(!oldImageIsFIle && !newImageIsFIle){
                let oldStringIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === active.id);
                let newStringIndex = images.filter(img => typeof img.file === 'string').findIndex((img) => img.id === over?.id);

                console.log("oldStringIndex : "+oldStringIndex)
                console.log("newStringIndex : "+newStringIndex)

                let newImagesIndex = arrayMove(productImageIndex, oldStringIndex, newStringIndex );
                console.log("newImagesIndex : "+newImagesIndex)
                setProductImageIndex(newImagesIndex);
            }

            if(productImageMultipartFileOrder){
                const newMultipartFileOrder = newImages
                    .map((img, index) => (img.file instanceof File ? index : -1))
                    .filter(index => index !== -1);

                //console.log("newMultipartFileOrder : "+ newMultipartFileOrder)
                setProductImageMultipartFileOrder(newMultipartFileOrder)
            }

        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
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
                                        <SortableImage key={image.id} image={image} onDelete={onDelete} />
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

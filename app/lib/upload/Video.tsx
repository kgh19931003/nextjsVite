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

type UploadVideoItem = {
    id: string;
    file?: File | string;
    preview: string;
    thumbnail?: string;
    fileOriginalName?: string;
};

type UploadVideoProps = {
    title: string;
    uploadState: ReturnType<typeof useUploadState>;
};

// 개별 비디오 박스
function SortableVideo({
                           video,
                           onDelete,
                       }: {
    video: UploadVideoItem;
    onDelete: (id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: video.id,
    });

    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        width: '350px',
        height: '250px',
        position: 'relative',
        flex: '0 0 auto',
        cursor: 'default',
    };

    console.log("video.fileOriginalName : "+video.fileOriginalName)

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="rounded border shadow-sm overflow-hidden bg-white"
        >
            <video
                {...listeners}
                src={video.preview}
                className="w-full h-full object-cover cursor-pointer"
                muted
                playsInline
                controls
            />
            {(video.file instanceof File || video.fileOriginalName) && (
                <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-10 max-w-[280px] truncate">
                    {video.file instanceof File ? video.file.name : video.fileOriginalName}
                </div>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(video.id);
                }}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded z-10"
            >
                ✕
            </button>
        </div>
    );
}

export default function UploadVideo({ title, uploadState }: UploadVideoProps) {
    const [videos, setVideos] = useState<UploadVideoItem[]>([]);
    const objectUrlMap = useRef<Map<string, string>>(new Map());

    // 최초 fileData로 초기화
    useEffect(() => {
        const initial = uploadState.fileData.map((item, index) => {
            const originalName = uploadState.fileOriginalName[index];

            if (typeof item === 'string') {
                return {
                    id: item,
                    file: item,
                    preview: process.env.NEXT_PUBLIC_PROFILE == "local" ? `http://localhost:9090/${item}` : "/"+item,
                    fileOriginalName: originalName
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

        setVideos(initial);
    }, [uploadState.fileData]);

    // 파일 업로드 시 처리
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newVideos = acceptedFiles.map((file) => ({
            id: uuidv4(),
            file,
            preview: URL.createObjectURL(file),
        }));

        const initFiles = [...videos]
            .filter((vid): vid is UploadVideoItem & { file: (File | string) } => !!vid.file)
            .map(vid => vid.file);

        const allFiles = [...videos, ...newVideos]
            .filter((vid): vid is UploadVideoItem & { file: (File | string) } => !!vid.file)
            .map(vid => vid.file);

        uploadState.setFileOrder(makeArray(initFiles.length));
        uploadState.setFileData(allFiles);

        uploadState.fileMultipartFileOrder
            ? uploadState.setFileMultipartFileOrder([
                ...uploadState.fileMultipartFileOrder,
                ...Array.from({ length: newVideos.length }, (_, i) => allFiles.length + i - 1)
            ])
            : uploadState.setFileMultipartFileOrder(
                Array.from({ length: newVideos.length }, (_, i) => initFiles.length + i)
            );

    }, [videos, uploadState]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'video/*': [] },
        multiple: true,
        maxSize: 50 * 1024 * 1024,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(rejection => {
                rejection.errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        alert(`파일 "${rejection.file.name}" 은(는) 50MB를 초과하여 업로드할 수 없습니다.`);
                    }
                });
            });
        }
    });

    // 삭제
    const onDelete = useCallback((id: string) => {
        const toRevoke = videos.find((vid) => vid.id === id);
        if (toRevoke?.file) {
            URL.revokeObjectURL(toRevoke.preview);
        }

        const updated = videos.filter((vid) => vid.id !== id);

        const updatedToMap = updated
            .filter((vid): vid is UploadVideoItem & { file: File | string } => !!vid.file)
            .map((vid) => vid.file);

        setVideos(updated);
        uploadState.setFileData(updatedToMap);

        uploadState.setFileOrder(updated
            .map((vid, index) => (typeof vid.file === 'string' ? index : -1))
            .filter(index => index !== -1));

        uploadState.setFileMultipartFileOrder(updated
            .map((vid, index) => (vid.file instanceof File ? index : -1))
            .filter(index => index !== -1));

        if (!isFile(toRevoke?.file)) {
            let videoIndex = videos.filter(vid => typeof vid.file === 'string').findIndex((vid) => vid.id === id);
            uploadState.setFileIndex(uploadState.fileIndex.filter((_, idx) => idx !== videoIndex));
            uploadState.fileDeleteIndex
                ? uploadState.setFileDeleteIndex([...uploadState.fileDeleteIndex, uploadState.fileIndex[videoIndex]])
                : uploadState.setFileDeleteIndex([uploadState.fileIndex[videoIndex]]);
        }
    }, [videos, uploadState]);

    // 정렬 변경
    const onDragEnd = useCallback((event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = videos.findIndex((vid) => vid.id === active.id);
            const newIndex = videos.findIndex((vid) => vid.id === over?.id);
            const oldVideo = videos.find((vid) => vid.id === active.id);
            const newVideo = videos.find((vid) => vid.id === over?.id);
            const newVideos = arrayMove(videos, oldIndex, newIndex);
            setVideos(newVideos);

            const orderedFiles = newVideos
                .filter((vid): vid is UploadVideoItem & { file: (File | string | object) } => !!vid.file)
                .map((vid) => vid.file);

            let oldVideoIsFile = isFile(oldVideo?.file);
            let newVideoIsFile = isFile(newVideo?.file);

            uploadState.setFileData(orderedFiles);

            const newMultipartStringOrder = newVideos
                .map((vid, index) => (typeof vid.file === 'string' ? index : -1))
                .filter(index => index !== -1);

            uploadState.setFileOrder(newMultipartStringOrder);

            if(!oldVideoIsFile && !newVideoIsFile){
                let oldStringIndex = videos.filter(vid => typeof vid.file === 'string').findIndex((vid) => vid.id === active.id);
                let newStringIndex = videos.filter(vid => typeof vid.file === 'string').findIndex((vid) => vid.id === over?.id);

                let newVideosIndex = arrayMove(uploadState.fileIndex, oldStringIndex, newStringIndex);
                uploadState.setFileIndex(newVideosIndex);
            }

            if(uploadState.fileMultipartFileOrder){
                const newMultipartFileOrder = newVideos
                    .map((vid, index) => (vid.file instanceof File ? index : -1))
                    .filter(index => index !== -1);

                uploadState.setFileMultipartFileOrder(newMultipartFileOrder);
            }
        }
    }, [videos, uploadState]);

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
                <p className="text-gray-600">영상을 클릭 또는 드래그하여 업로드하세요</p>

                {videos.length > 0 && (
                    <div className="mt-6">
                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={videos.map((vid) => vid.id)} strategy={rectSortingStrategy}>
                                <div className="flex flex-wrap gap-4">
                                    {videos.map((video) => (
                                        <SortableVideo key={video.id} video={video} onDelete={onDelete}/>
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
import { useState, useCallback } from 'react';

export type UploadStateType = {
    fileData: (File | string)[];
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileOriginalIndex: number[];
    fileIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];
};

export type UploadStateActions = {
    setFileData: (files: (File | string)[]) => void;
    setFileUuid: (uuid: string[]) => void;
    setFileDeleteUuid: (uuid: string[]) => void;
    setFileOriginalIndex: (index: number[]) => void;
    setFileIndex: (index: number[]) => void;
    setFileDeleteIndex: (index: number[]) => void;
    setFileMultipartFileOrder: (order: number[]) => void;
    setFileOrder: (order: number[]) => void;
    resetUploadState: () => void;
    initializeUploadState: (data: Partial<UploadStateType>) => void;
};

const initialState: UploadStateType = {
    fileData: [],
    fileUuid: [],
    fileDeleteUuid: [],
    fileOriginalIndex: [],
    fileIndex: [],
    fileDeleteIndex: [],
    fileMultipartFileOrder: [],
    fileOrder: [],
};

export function useUploadState(): UploadStateType & UploadStateActions {
    const [state, setState] = useState<UploadStateType>(initialState);

    const setFileData = useCallback((files: (File | string)[]) => {
        setState(prev => ({ ...prev, fileData: files }));
    }, []);

    const setFileUuid = useCallback((uuid: string[]) => {
        setState(prev => ({ ...prev, fileUuid: uuid }));
    }, []);

    const setFileDeleteUuid = useCallback((uuid: string[]) => {
        setState(prev => ({ ...prev, fileDeleteUuid: uuid }));
    }, []);

    const setFileOriginalIndex = useCallback((index: number[]) => {
        setState(prev => ({ ...prev, fileOriginalIndex: index }));
    }, []);

    const setFileIndex = useCallback((index: number[]) => {
        setState(prev => ({ ...prev, fileIndex: index }));
    }, []);

    const setFileDeleteIndex = useCallback((index: number[]) => {
        setState(prev => ({ ...prev, fileDeleteIndex: index }));
    }, []);

    const setFileMultipartFileOrder = useCallback((order: number[]) => {
        setState(prev => ({ ...prev, fileMultipartFileOrder: order }));
    }, []);

    const setFileOrder = useCallback((order: number[]) => {
        setState(prev => ({ ...prev, fileOrder: order }));
    }, []);

    const resetUploadState = useCallback(() => {
        setState(initialState);
    }, []);

    const initializeUploadState = useCallback((data: Partial<UploadStateType>) => {
        setState(prev => ({ ...prev, ...data }));
    }, []);

    return {
        ...state,
        setFileData,
        setFileUuid,
        setFileDeleteUuid,
        setFileOriginalIndex,
        setFileIndex,
        setFileDeleteIndex,
        setFileMultipartFileOrder,
        setFileOrder,
        resetUploadState,
        initializeUploadState,
    };
}
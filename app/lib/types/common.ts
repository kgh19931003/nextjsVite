export type Spec =
    | { label: string; type?: 'xyz'; value: { x: string; y: string; z: string } }
    | { label: string; type?: 'text'; value: string };

export type Machine = {
    image: string;
    width: number;
    height: number;
    specs: Spec[];
};

export interface VideoFile {
    id: string;        // 드래그 정렬용 고유 ID
    file: File;        // 업로드 실제 파일
    preview: string;   // 브라우저에서 재생할 미리보기 URL (URL.createObjectURL)
}

export interface ProductResponse {
    language: string;
    name: string;
    price: number;
    material: string;
    dimension: string;
    weight: string;
    surface: string;
    tolerance: string;

    // 제품 이미지
    productImage?: string[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage: string[];
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];

    // 비디오
    fileVideo?: string[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoIndex?: number[];
    videoOriginalIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}

export interface productFormType {
    language: string;
    name?: string;
    price?: string | number;
    material?: string;
    dimension?: string;
    weight?: string;
    surface?: string;
    tolerance?: string;

    // 제품 이미지
    productImage?: (File | string)[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage?: (File | string)[];
    fileUuid?: string[];
    fileDeleteUuid?: string[];
    fileOrder?: number[];
    fileIndex?: number[];
    fileOriginalIndex?: number[];
    fileDeleteIndex?: number[];
    fileMultipartFileOrder?: number[];

    // 비디오
    fileVideo?: (File | string)[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoOriginalIndex?: number[];
    videoIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}


export interface PostResponse {
    language: string;
    category: string;
    title: string | number;
    subtitle: string | number;
    content: string;

    // 제품 이미지
    productImage?: string[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage: string[];
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];

    // 비디오
    fileVideo?: string[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoIndex?: number[];
    videoOriginalIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}

export interface PostFormType {
    language: string;
    category: string;
    title: string | number;
    subtitle: string | number;
    content: string;

    // 제품 이미지
    productImage?: (File | string)[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage?: (File | string)[];
    fileUuid?: string[];
    fileDeleteUuid?: string[];
    fileOrder?: number[];
    fileIndex?: number[];
    fileOriginalIndex?: number[];
    fileDeleteIndex?: number[];
    fileMultipartFileOrder?: number[];

    // 비디오
    fileVideo?: (File | string)[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoOriginalIndex?: number[];
    videoIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}


export interface AlloyResponse {
    language: string;
    type: string;
    title: string | number;
    subtitle: string | number;
    content: string;

    // 제품 이미지
    productImage?: string[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage: string[];
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];

    // 비디오
    fileVideo?: string[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoIndex?: number[];
    videoOriginalIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}

export interface AlloyFormType {
    language: string;
    type: string;
    title: string | number;
    subtitle: string | number;
    content: string;

    // 제품 이미지
    productImage?: (File | string)[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage?: (File | string)[];
    fileUuid?: string[];
    fileDeleteUuid?: string[];
    fileOrder?: number[];
    fileIndex?: number[];
    fileOriginalIndex?: number[];
    fileDeleteIndex?: number[];
    fileMultipartFileOrder?: number[];

    // 비디오
    fileVideo?: (File | string)[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoOriginalIndex?: number[];
    videoIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}



export interface AmResponse {
    language: string;
    category: string;
    material: string;
    dimension: string;
    weight: string;
    surface: string;
    tolerance: string;

    // 제품 이미지
    productImage?: string[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage: string[];
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];

    // 비디오
    fileVideo?: string[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoIndex?: number[];
    videoOriginalIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}

export interface AmFormType {
    language: string;
    category: string;
    material?: string;
    dimension?: string;
    weight?: string;
    surface?: string;
    tolerance?: string;
    feature?: string;

    // 제품 이미지
    productImage?: (File | string)[];
    productImageUuid?: string[];
    productImageDeleteUuid?: string[];
    productImageIndex?: number[];
    productImageOriginalIndex?: number[];
    productImageDeleteIndex?: number[];
    productImageMultipartFileOrder?: number[];
    productImageOrder?: number[];

    // 수행사례 이미지
    fileImage?: (File | string)[];
    fileUuid?: string[];
    fileDeleteUuid?: string[];
    fileOrder?: number[];
    fileIndex?: number[];
    fileOriginalIndex?: number[];
    fileDeleteIndex?: number[];
    fileMultipartFileOrder?: number[];

    // 비디오
    fileVideo?: (File | string)[];
    videoUuid?: string[];
    videoDeleteUuid?: string[];
    videoOriginalIndex?: number[];
    videoIndex?: number[];
    videoDeleteIndex?: number[];
    videoMultipartFileOrder?: number[];
    videoOrder?: number[];
}




export interface FileUploadResponse {
    language: string;

    // 금속 이미지
    metalImage?: string[];
    metalImageUuid?: string[];
    metalImageDeleteUuid?: string[];
    metalImageIndex?: number[];
    metalImageDeleteIndex?: number[];
    metalImageMultipartFileOrder?: number[];
    metalImageOrder?: number[];
    metalImageOriginalName?: string[];

    // 금속 비디오
    metalFileImage?: string[];
    metalFileUuid?: string[];
    metalFileDeleteUuid?: string[];
    metalFileIndex?: number[];
    metalFileDeleteIndex?: number[];
    metalFileMultipartFileOrder?: number[];
    metalFileOrder?: number[];
    metalFileOriginalName?: string[];

    // 플라스틱 이미지
    plasticImage?: string[];
    plasticImageUuid?: string[];
    plasticImageDeleteUuid?: string[];
    plasticImageIndex?: number[];
    plasticImageDeleteIndex?: number[];
    plasticImageMultipartFileOrder?: number[];
    plasticImageOrder?: number[];
    plasticImageOriginalName?: string[];
    // 플라스틱 비디오
    plasticFileImage?: string[];
    plasticFileUuid?: string[];
    plasticFileDeleteUuid?: string[];
    plasticFileIndex?: number[];
    plasticFileDeleteIndex?: number[];
    plasticFileMultipartFileOrder?: number[];
    plasticFileOrder?: number[];
    plasticFileOriginalName?: string[];
    // 보수 이미지
    repairImage?: string[];
    repairImageUuid?: string[];
    repairImageDeleteUuid?: string[];
    repairImageIndex?: number[];
    repairImageDeleteIndex?: number[];
    repairImageMultipartFileOrder?: number[];
    repairImageOrder?: number[];
    repairImageOriginalName?: string[];
    // 보수 비디오
    repairFileImage?: string[];
    repairFileUuid?: string[];
    repairFileDeleteUuid?: string[];
    repairFileIndex?: number[];
    repairFileDeleteIndex?: number[];
    repairFileMultipartFileOrder?: number[];
    repairFileOrder?: number[];
    repairFileOriginalName?: string[];
}

export interface FileUploadFormType {
    language: string;

    // 금속 이미지
    metalFileImage?: (File | string)[];
    metalFileUuid?: string[];
    metalFileDeleteUuid?: string[];
    metalFileIndex?: number[];
    metalFileOriginalIndex?: number[];
    metalFileDeleteIndex?: number[];
    metalFileMultipartFileOrder?: number[];
    metalFileOrder?: number[];

    // 금속 비디오
    metalFileVideo?: (File | string)[];
    metalVideoUuid?: string[];
    metalVideoDeleteUuid?: string[];
    metalVideoIndex?: number[];
    metalVideoOriginalIndex?: number[];
    metalVideoDeleteIndex?: number[];
    metalVideoMultipartFileOrder?: number[];
    metalVideoOrder?: number[];

    // 플라스틱 이미지
    plasticFileImage?: (File | string)[];
    plasticFileUuid?: string[];
    plasticFileDeleteUuid?: string[];
    plasticFileIndex?: number[];
    plasticFileOriginalIndex?: number[];
    plasticFileDeleteIndex?: number[];
    plasticFileMultipartFileOrder?: number[];
    plasticFileOrder?: number[];

    // 플라스틱 비디오
    plasticFileVideo?: (File | string)[];
    plasticVideoUuid?: string[];
    plasticVideoDeleteUuid?: string[];
    plasticVideoIndex?: number[];
    plasticVideoOriginalIndex?: number[];
    plasticVideoDeleteIndex?: number[];
    plasticVideoMultipartFileOrder?: number[];
    plasticVideoOrder?: number[];

    // 보수 이미지
    repairFileImage?: (File | string)[];
    repairFileUuid?: string[];
    repairFileDeleteUuid?: string[];
    repairFileIndex?: number[];
    repairFileOriginalIndex?: number[];
    repairFileDeleteIndex?: number[];
    repairFileMultipartFileOrder?: number[];
    repairFileOrder?: number[];

    // 보수 비디오
    repairFileVideo?: (File | string)[];
    repairVideoUuid?: string[];
    repairVideoDeleteUuid?: string[];
    repairVideoIndex?: number[];
    repairVideoOriginalIndex?: number[];
    repairVideoDeleteIndex?: number[];
    repairVideoMultipartFileOrder?: number[];
    repairVideoOrder?: number[];
}
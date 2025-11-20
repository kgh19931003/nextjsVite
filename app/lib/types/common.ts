export interface VideoFile {
    id: string;        // 드래그 정렬용 고유 ID
    file: File;        // 업로드 실제 파일
    preview: string;   // 브라우저에서 재생할 미리보기 URL (URL.createObjectURL)
}


export interface ProductResponse {
    language: string;
    name: string;
    price: number;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];                // res.productImgIdx 가 배열이라 가정
    fileOriginalIndex: number[];        // 위와 동일하게 number[]
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];                 // res.productImgOrder 도 배열로 추정
    fileImage: string[];                      // 문자열 배열 (단일 string일 수도 있어 배열로 처리)
}


export interface productFormType {
    language: string;
    name: string;
    price: string | number;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileOrder: number[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    // 기타 필드들...

    videoUuid: string[],
    videoDeleteUuid: string[],
    videoOriginalIndex: number[],
    videoIndex: number[],
    videoDeleteIndex: number[],
    videoMultipartFileOrder: number[],
    videoOrder: number[],

}
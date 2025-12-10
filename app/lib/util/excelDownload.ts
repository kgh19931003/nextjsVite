export async function downloadExcel(
    url: string,
    defaultFileName: string = 'download.xlsx'
) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Blob으로 변환
        const blob = await response.blob();

        // Content-Disposition에서 파일명 추출
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = defaultFileName;

        if (contentDisposition) {
            // filename*=UTF-8''encoded-name.xlsx 형식 파싱
            const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;\r\n]+)/i);
            if (utf8Match?.[1]) {
                fileName = decodeURIComponent(utf8Match[1]);
            } else {
                // filename="name.xlsx" 형식 파싱
                const simpleMatch = contentDisposition.match(/filename="?([^";\r\n]+)"?/i);
                if (simpleMatch?.[1]) {
                    fileName = simpleMatch[1];
                }
            }
        }

        // 파일 다운로드
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // 정리
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        return { success: true, fileName };
    } catch (error) {
        console.error('엑셀 다운로드 실패:', error);
        throw error;
    }
}
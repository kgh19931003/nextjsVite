import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';

export async function GET() {
    // JSON 파일 경로 (루트 기준)
    const jsonPath = path.join(process.cwd(), '/locale/data.json');
    const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // 새 워크북 생성
    const wb = XLSX.utils.book_new();

    // 각 최상위 키(카테고리)별로 시트 생성
    for (const category in json) {
        const entries = Object.entries(json[category]);

        // 각 value 내에 '\n' 문자도 실제 줄바꿈으로 변환
        const sheetData = entries.map(([key, value]) => [
            key,
            typeof value === 'string' ? value.replace(/\\n/g, '\n') : value,
        ]);

        // 시트 첫 행에 컬럼명 추가 (Key, Value)
        sheetData.unshift(['한국어', '영어']);

        // 2차원 배열을 시트로 변환
        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        // 워크북에 시트 추가 (시트명 = 카테고리명)
        XLSX.utils.book_append_sheet(wb, ws, category);
    }
    // 워크북을 바이너리(buffer)로 변환
    const wbout = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // 파일 다운로드용 Response 반환
    return new NextResponse(wbout, {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=data.xlsx',
        },
    });
}

import fs from 'fs';
import path from 'path';

// 재귀 함수로 폴더 내 모든 json 파일 읽어 병합
function readLocaleFilesRecursively(dir: string): object {
    let merged = {};

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // 폴더면 재귀 호출
            const nestedMessages = readLocaleFilesRecursively(fullPath);
            merged = { ...merged, ...nestedMessages };
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            try {
                const fileContents = fs.readFileSync(fullPath, 'utf-8');
                const messages = JSON.parse(fileContents);
                merged = { ...merged, ...messages };
            } catch (err) {
                console.warn(`⚠️ Error parsing locale file: ${fullPath}`, err);
            }
        }
    }

    return merged;
}

export async function getMergedLocaleMessages(locale: string) {
    // locale이 undefined일 가능성까지 방지
    const safeLocale = locale || "ko";
    const localeDir = path.resolve(process.cwd(), 'locale', safeLocale);

    try {
        return await readLocaleFilesRecursively(localeDir);
    } catch (err) {
        console.warn(`⚠️ Locale directory not found or empty: ${localeDir}`, err);
        return {};
    }
}

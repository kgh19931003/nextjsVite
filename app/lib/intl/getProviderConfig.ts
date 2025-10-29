'use server'; // 서버 전용 함수임을 명시

export async function getProviderConfig() {
    return {
        getMessageFallback({ key }: { key: string }) {
            return key;
        }
    };
}

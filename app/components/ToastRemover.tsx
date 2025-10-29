'use client';

import { useEffect } from 'react';

export default function ToastRemover() {
    useEffect(() => {
        const disable = process.env.NEXT_PUBLIC_DISABLE_NEXTJS_TOAST === 'true';
        if (!disable) return;

        const removeToasts = () => {
            const toast = document.querySelector('[data-nextjs-toast]');
            const badge = document.querySelector('[data-next-badge-root]');
            const devTools = document.querySelector('[data-nextjs-devtools]'); // optional future-proof

            toast?.remove();
            badge?.remove();
            devTools?.remove();

            //console.log('[ToastRemover] nextjs-toast, badge removed');
        };

        // 첫 시도
        removeToasts();

        // MutationObserver로 반복 제거
        const observer = new MutationObserver(() => {
            removeToasts();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return null;
}

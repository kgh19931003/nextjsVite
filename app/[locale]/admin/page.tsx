'use client';

import {router} from "next/client";
import {usePathname, useRouter} from "next/navigation";

export default function mainPage() {
    const router = useRouter();
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];
    window.location.href = `/${locale}/admin/blog/list`;
}

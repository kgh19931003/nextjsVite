'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// 동적 import (SSR 비활성화)
const UserFormPage = dynamic(() => import('@/components/admin/users/edit/FormPage'), {
    ssr: false,
});

export default function UserFormWrapper() {
    return <UserFormPage />;
}

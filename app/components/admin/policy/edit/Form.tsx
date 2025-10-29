'use client';

import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import { swrFetcher } from '@/lib/function';
import { mutate } from 'swr';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Plugin } from 'prosemirror-state';
import { Fragment, Slice } from 'prosemirror-model';
import { CustomImage } from '@/lib/tiptap/Image'; // 위에서 만든 파일
import SoftBreak from '@/lib/tiptap/SoftBreak';
import HardBreak from '@tiptap/extension-hard-break'
import Paragraph from "@tiptap/extension-paragraph";
import Editor from "@/lib/tiptap/Editor";
interface BlogData {
    title: string;
    content: string;
    category: string;
    regDate: string;
}

interface ImageUploadResponse {
    url: string;
}


const categoryList: Record<string, string[]> = {
    "ko": [
        "갓테크소식",
        "뉴스기사"
    ],

    "en": [
        "Godtech Announce",
        "News"
    ]
}

const CustomParagraph = Paragraph.extend({
    parseHTML() {
        return [
            {
                tag: 'p',
                getAttrs: element => ({
                    preserveNewlines: true
                }),
            },
        ]
    },
})


// font size 확장 정의
const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    fontSize: {
                        default: null,
                        renderHTML: attributes => {
                            let size = attributes.fontSize;

                            // fontSize가 객체라면 문자열로 변환
                            if (typeof size === 'object' && size !== null && 'fontSize' in size) {
                                size = size.fontSize;
                            }

                            if (!size) return {};
                            return { style: `font-size: ${size}` };
                        },
                        parseHTML: element => ({
                            fontSize: element.style.fontSize?.replace(/['"]/g, ''),
                        }),
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                fontSize =>
                    ({ chain }) => {
                        return chain().setMark('textStyle', { fontSize }).run();
                    },
            unsetFontSize:
                () =>
                    ({ chain }) => {
                        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
                    },
        };
    },
});


const CleanPaste = Extension.create({
    name: 'cleanPaste',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    transformPastedHTML(html) {
                        return html
                            // 스타일 제거
                            .replace(/style="[^"]*"/g, '')
                            .replace(/<span[^>]*>/g, '')
                            .replace(/<\/span>/g, '')

                            // 코드 블록 제거
                            .replace(/<pre[^>]*>/g, '<p>')
                            .replace(/<\/pre>/g, '</p>')

                            // div → p
                            .replace(/<div[^>]*>/g, '<p>')
                            .replace(/<\/div>/g, '</p>')

                            // p 태그 안쪽에 불필요한 br 제거
                            //.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
                    },

                    transformPasted(slice) {
                        const { schema } = slice.content.content[0].type;
                        const paragraphs: any[] = [];

                        slice.content.forEach(node => {
                            if (node.isText) {
                                const lines = node.text?.split('\n') || [];
                                lines.forEach(line => {
                                    const textNode = schema.text(line);
                                    const paragraph = schema.nodes.paragraph.create({}, textNode);
                                    paragraphs.push(paragraph);
                                });
                            } else if (node.isBlock) {
                                paragraphs.push(node);
                            }
                        });

                        return new Slice(Fragment.fromArray(paragraphs), 0, 0);
                    },
                },
            }),
        ];
    },
});


function normalizeFontSizeAttributes(node: any) {
    if (!node) return node;

    if (node.attrs && node.attrs.fontSize) {
        // fontSize가 중첩 객체면 문자열로 변환
        if (typeof node.attrs.fontSize === 'object' && 'fontSize' in node.attrs.fontSize) {
            node.attrs.fontSize = node.attrs.fontSize.fontSize;
        }
    }

    // 자식 노드가 있으면 재귀 처리
    if (node.content && Array.isArray(node.content)) {
        node.content = node.content.map(normalizeFontSizeAttributes);
    }

    return node;
}


function getSelectionFontSize(editor: any) {
    if (!editor) return null;

    const { state } = editor;
    const { from, to } = state.selection;

    const fontSizes: any = new Set();

    state.doc.nodesBetween(from, to, (node: any) => {
        if (!node.marks) return;
        node.marks.forEach((mark: any) => {
            if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
                fontSizes.add(mark.attrs.fontSize);
            }
        });
    });

    if (fontSizes.size === 1) {
        return [...fontSizes][0];
    } else if (fontSizes.size > 1) {
        return 'mixed'; // 여러 개면 'mixed'로 리턴
    }

    return '10px'; // 기본값
}


const Form = ({ locale, idx }: { locale: string; idx?: string }) => {
    const router = useRouter();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    const [type, setType] = useState('');
    var [content, setContent] = useState('');
    let editorGetHTML = () => '';

    const fetchData = useCallback(async () => {
        if (!isEditMode) return;
        try {
            const res = await swrFetcher<BlogData>(`/${currentLocale}/api/admin/policy/one/${idx}`);
            setType(res.type);
            setContent(res.content)
        } catch {
            alert('정책 정보를 불러오는 데 실패했습니다.');
        }
    }, [isEditMode, idx]);

    useEffect(() => {
        if (isEditMode) {
            fetchData(); // fetch 내부에서 editor.commands.setContent() 호출
        }
    }, [fetchData, isEditMode]);


    const handleSubmit = async () => {
        if (!type.trim()) {
            alert('제목을 입력하세요');
            return;
        }

        setLoading(true);

        content = editorGetHTML(); // submit 시점 HTML 가져오기
        content = content.replace(/<p>\s*<\/p>/g, '<br/>'); // 빈 <p></p> → <br/> 변환

        const url = isEditMode
            ? `/${currentLocale}/api/admin/policy/update/${idx}`
            : `/${currentLocale}/api/admin/policy/create`;

        const method = isEditMode ? 'PUT' : 'POST';

        try {
            await swrFetcher(url, {
                method,
                body: {
                    "language": currentLocale,
                    "type": type,
                    "content": content
                },
            });

            alert(isEditMode ? '수정 완료' : '추가 완료');
            await mutate(`/${currentLocale}/api/admin/policy/list?page=1`);
            router.push(`/${currentLocale}/admin/policy/list`);
        } catch {
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">{isEditMode ? '정책 정보수정' : '정책 정보추가'}</h1>

            <div className="space-y-4">
                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">분류</label>
                    <input
                        type="text"
                        name="type"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        placeholder="분류"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        autoFocus
                    />
                </div>


                {/* 에디터 본문 */}
                {/* 에디터 박스 */}
                <div>
                    <Editor
                        idx={idx}
                        initialContent={content}
                        getEditorHTML={(fn) => (editorGetHTML = fn)}
                        editorImageUploadUrl={`/${currentLocale}/api/admin/policy/imageUpload/${idx}`}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    type="button"
                >
                    {isEditMode ? '수정하기' : '추가하기'}
                </button>
            </div>
        </div>
    );
};

export default Form;

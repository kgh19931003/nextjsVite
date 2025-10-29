'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Extension, Node, mergeAttributes } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { Fragment, Slice } from 'prosemirror-model';

import { CustomImage } from '@/lib/tiptap/Image';
import SoftBreak from '@/lib/tiptap/SoftBreak';
import Paragraph from "@tiptap/extension-paragraph";
import Heading from '@tiptap/extension-heading'
import { Color } from '@tiptap/extension-color'
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {swrFetcher} from "@/lib/function";
import {usePathname} from "next/navigation";
import ColorPicker from "@/lib/reactColor/ColorPicker"
/* ---------------- Custom Extension 정의 ---------------- */

interface ImageUploadResponse {
    url: string;
}

interface EditorProps {
    idx?: string | string[];
    initialContent?: string;
    getEditorHTML?: (fn: () => string) => void;
    editorImageUploadUrl: string;
}

const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute("style"),
                renderHTML: attrs => {
                    return attrs.style ? { style: attrs.style } : {};
                },
            },
            class: {
                default: null,
                parseHTML: element => element.getAttribute("class"),
                renderHTML: attrs => {
                    return attrs.class ? { class: attrs.class } : {};
                },
            },
        };
    },
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



function getSelectionFontSize(editor: any): string | 'mixed' | null {
    if (!editor) return null;

    const { state } = editor;
    const { from, to } = state.selection;

    const fontSizes = new Set<string>();

    state.doc.nodesBetween(from, to, (node: any) => {
        if (!node.marks) return;
        node.marks.forEach((mark: any) => {
            if (mark.type.name === 'textStyle') {
                let size = mark.attrs.fontSize;
                if (typeof size === 'object' && size !== null && 'fontSize' in size) {
                    size = size.fontSize;
                }
                if (size) fontSizes.add(size);
            }
        });
    });

    if (fontSizes.size === 1) {
        return [...fontSizes][0];
    } else if (fontSizes.size > 1) {
        return 'mixed';
    }

    return '10px';
}

const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: { default: null },
            style: { default: null },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'h3',
                getAttrs: dom => ({
                    class: dom.getAttribute('class'),
                    style: dom.getAttribute('style'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['h3', HTMLAttributes, 0]
    },
})



const CustomDiv = Node.create({
    name: 'customDiv',
    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => ({ class: attributes.class }),
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    }
})
/* ---------------- Editor 컴포넌트 ---------------- */

interface EditorProps {
    idx?: string | Array<string>;
    initialContent?: string;
    getEditorHTML?: (fn: () => string) => void; // submit 시점용
    editorImageUploadUrl: string;
}

const Editor: React.FC<EditorProps> = ({ idx, initialContent = '', getEditorHTML, editorImageUploadUrl }) => {
    const [isHtmlView, setIsHtmlView] = useState(false);
    const [htmlContent, setHtmlContent] = useState(initialContent);
    const [activeFontSize, setActiveFontSize] = useState('10px');
    const pathname = usePathname();

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    // 이전 상태를 기억하기 위한 ref
    const previousImagesRef = useRef<string[]>([]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false, // StarterKit 기본 paragraph 비활성화
            }),
            CustomParagraph,
            TextStyle,
            Color,
            FontSize,
            Image.extend({
                addAttributes() {
                    return {
                        src: { default: null },
                        alt: { default: null },
                        title: { default: null },
                        class: { default: null },
                        style: { default: null },
                    };
                },
            }),
            CustomHeading,
            CustomDiv,
            CustomImage,
            CleanPaste,
            Link.configure({ openOnClick: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            SoftBreak.configure({
                keepMarks: true,
            }),
            Table.configure({
                resizable: true,       // 테이블 크기 조절 가능
                HTMLAttributes: { class: 'border-collapse border border-gray-400' }
            }),
            TableRow,
            TableHeader,
            TableCell.configure({
                HTMLAttributes: { class: 'border border-gray-400 px-2 py-1' }
            }),
        ],
        content: '',
        autofocus: true,
        editable: true,
        injectCSS: true,
        onUpdate: ({ editor }) => {
            const currentImages: string[] = [];
            editor.state.doc.descendants((node) => {
                if (node.type.name === 'image' && node.attrs.src) {
                    currentImages.push(node.attrs.src);
                }
            });

            // 이전 상태에 있었지만 현재 content에는 없는 이미지 → 삭제된 이미지
            const deletedImages = previousImagesRef.current.filter(
                (src) => !currentImages.includes(src)
            );

            if (deletedImages.length > 0) {
                swrFetcher('/api/admin/performance/imageDelete', {
                    method: 'POST',
                    body: deletedImages,
                });
            }

            // 현재 이미지를 이전 상태로 저장
            previousImagesRef.current = currentImages;
        },
        onSelectionUpdate: ({ editor }) => {
            const size = getSelectionFontSize(editor);
            console.log("size : "+ size)
            setActiveFontSize(getSelectionFontSize(editor) ?? '10px');
        },
        editorProps: {
            handlePaste(view, event) {
                const text = event.clipboardData?.getData('text/plain')
                if (text?.includes('\n')) {
                    const { state, dispatch } = view
                    const hardBreak = state.schema.nodes.hardBreak
                    const tr = state.tr
                    const lines = text.split('\n')
                    lines.forEach((line, i) => {
                        tr.insertText(line)
                        if (i < lines.length - 1) tr.replaceSelectionWith(hardBreak.create())
                    })
                    dispatch(tr)
                    return true
                }
                return false
            },
            attributes: {
                style: `
                outline: none;
                border: none;
                box-shadow: none;
                `,
                class: 'my-editor',
            }
        },
        parseOptions: {
            preserveWhitespace: 'full',
        },
        // SSR-safe
        immediatelyRender: false,
    });



    useEffect(() => {
        if (editor) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    useEffect(() => {
        if (getEditorHTML && editor) {
            getEditorHTML(() => editor.getHTML());
        }
    }, [editor, getEditorHTML]);

    /* 툴바 핸들러 */
    const toggleView = () => {
        if (!editor) return;
        if (isHtmlView) {
            // HTML → 에디터로 반영
            editor.commands.setContent(htmlContent);
            setIsHtmlView(false);
        } else {
            // 에디터 → HTML 코드로 변환
            setHtmlContent(editor.getHTML());
            setIsHtmlView(true);
        }
    };


    const handleAlign = (align: 'left' | 'center' | 'right') => {
        if (!editor) return;

        // 1. 텍스트 정렬
        editor.chain().focus().setTextAlign(align).run();

        // 2. 이미지 정렬 (선택 범위 내 모든 이미지에 적용)
        const { state, view } = editor;
        const { from, to } = state.selection;

        const classMap = {
            left: 'block ml-0 mr-auto',
            center: 'block mx-auto',
            right: 'block ml-auto mr-0',
        };

        state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === 'image') {
                const newAttrs = {
                    ...node.attrs,
                    class: classMap[align],
                };
                view.dispatch(state.tr.setNodeMarkup(pos, undefined, newAttrs));
            }
        });
    };


    const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        editor?.chain().focus().setFontSize(value).run();
        setActiveFontSize('10px');
    };

    const toggleImageClass = (classesToToggle: string[]) => {
        if (!editor) return;

        const { state, view } = editor;
        const { from, to } = state.selection;

        state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === 'image') {
                const currentClassList = (node.attrs.class || '').split(' ').filter(Boolean);
                const newClassList = [...currentClassList];

                classesToToggle.forEach(cls => {
                    const index = newClassList.indexOf(cls);
                    if (index >= 0) {
                        newClassList.splice(index, 1); // 이미 있으면 제거
                    } else {
                        newClassList.push(cls); // 없으면 추가
                    }
                });

                const newAttrs = {
                    ...node.attrs,
                    class: newClassList.join(' '),
                };

                view.dispatch(state.tr.setNodeMarkup(pos, undefined, newAttrs));
            }
        });
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await swrFetcher<ImageUploadResponse>(editorImageUploadUrl, {
                method: 'POST',
                body: formData,
            });

            return res.url;
        } catch (error) {
            alert('이미지 업로드 실패');
            console.error(error);
            return null;
        }
    };

    const addImage = async (file: File) => {
        if (!editor) return;
        const url = await handleImageUpload(file);
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const onImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];

            const maxSize = 1 * 1024 * 1024; // 1MB


            if (file.size > maxSize) {
                alert('이미지 크기가 1MB를 초과합니다.');
                e.target.value = ''; // 파일 input 리셋
                return;
            }

            addImage(file);
            e.target.value = '';
        }
    };

    const fontSizes = Array.from({ length: (96 - 10) / 2 + 1 }, (_, i) => `${10 + i * 2}px`);

    return (
        <div className="border rounded min-h-[400px] relative">
            {/* 툴바 */}
            <div
                className="absolute top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap items-center gap-2 z-10 shadow-sm rounded-t">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    onMouseDown={e => e.preventDefault()}
                    className={`w-[30px] h-[30px] flex justify-center items-center rounded-md border transition-colors duration-200 ease-in-out font-bold
                            ${editor?.isActive('bold')
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    type="button"
                    title="Bold"
                >
                    B
                </button>
                {/* Italic */}
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    onMouseDown={e => e.preventDefault()}
                    className={`w-[30px] h-[30px] flex justify-center items-center rounded-md border transition-colors duration-200 ease-in-out
                            ${editor?.isActive('italic')
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    type="button"
                    title="Italic"
                >
                    <em>I</em>
                </button>


                {/* 글자 색상 선택 */}
                <ColorPicker editor={editor}/>


                {/* 정렬 */}
                <button onClick={() => handleAlign('left')} title="왼쪽 정렬"
                        className="w-[30px] h-[30px] flex justify-center items-center border rounded border-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <rect x="3" y="5" width="18" height="1" fill="currentColor"/>
                        <rect x="3" y="9" width="12" height="1" fill="currentColor"/>
                        <rect x="3" y="13" width="18" height="1" fill="currentColor"/>
                        <rect x="3" y="17" width="12" height="1" fill="currentColor"/>
                    </svg>
                </button>
                <button onClick={() => handleAlign('center')} title="중앙 정렬"
                        className="w-[30px] h-[30px] flex justify-center items-center border rounded border-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <rect x="3" y="5" width="18" height="1" fill="currentColor"/>
                        <rect x="6" y="9" width="12" height="1" fill="currentColor"/>
                        <rect x="3" y="13" width="18" height="1" fill="currentColor"/>
                        <rect x="6" y="17" width="12" height="1" fill="currentColor"/>
                    </svg>
                </button>
                <button onClick={() => handleAlign('right')} title="오른쪽 정렬"
                        className="w-[30px] h-[30px] flex justify-center items-center border rounded border-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <rect x="3" y="5" width="18" height="1" fill="currentColor"/>
                        <rect x="9" y="9" width="12" height="1" fill="currentColor"/>
                        <rect x="3" y="13" width="18" height="1" fill="currentColor"/>
                        <rect x="9" y="17" width="12" height="1" fill="currentColor"/>
                    </svg>
                </button>

                {/* 이미지 클래스 토글 */}
                <button onClick={() => toggleImageClass(['rounded-xl', 'shadow-lg'])}
                        className="w-[30px] h-[30px] flex justify-center items-center border rounded border-gray-300 hover:bg-gray-100"
                        title="이미지 라운딩+쉐도우"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor"
                              fill="white"/>
                        <path d="M3 21l3-3h15" stroke="currentColor" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
                <button onClick={() => toggleImageClass(['w-full'])}
                        className="w-[30px] h-[30px] flex justify-center items-center border rounded border-gray-300 hover:bg-gray-100"
                        title="이미지 100% 확대"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        {/* 중앙 점 */}
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                        {/* 상 방향 화살표 */}
                        <line x1="12" y1="2" x2="12" y2="10" stroke="currentColor" strokeLinecap="round"/>
                        <polyline points="9,5 12,2 15,5" stroke="currentColor" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        {/* 하 방향 화살표 */}
                        <line x1="12" y1="14" x2="12" y2="22" stroke="currentColor" strokeLinecap="round"/>
                        <polyline points="9,19 12,22 15,19" stroke="currentColor" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        {/* 좌 방향 화살표 */}
                        <line x1="2" y1="12" x2="10" y2="12" stroke="currentColor" strokeLinecap="round"/>
                        <polyline points="5,9 2,12 5,15" stroke="currentColor" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        {/* 우 방향 화살표 */}
                        <line x1="14" y1="12" x2="22" y2="12" stroke="currentColor" strokeLinecap="round"/>
                        <polyline points="19,9 22,12 19,15" stroke="currentColor" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                    </svg>
                </button>


                {/* 링크 */}
                <button
                    onClick={() => {
                        if (!editor) return;
                        if (editor.isActive('link')) {
                            editor.chain().focus().unsetLink().run();
                        } else {
                            const url = window.prompt('링크 URL을 입력하세요');
                            if (url) editor.chain().focus().setLink({href: url}).run();
                        }
                    }}
                    className={`w-[30px] h-[30px] flex justify-center items-center rounded-md border transition-colors duration-200 ease-in-out
                            ${editor?.isActive('link')
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    type="button"
                    title="링크 삽입/삭제"
                >
                    🔗
                </button>

                {/* 이미지 업로드 */}
                <label
                    htmlFor="image-upload"
                    className="w-[30px] h-[30px] flex justify-center items-center rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    title="이미지 업로드"
                >
                    🖼️
                </label>

                <input id="image-upload" type="file" accept="image/*" onChange={onImageInputChange} className="hidden"/>

                {/* 폰트 사이즈 */}
                <select
                    value={activeFontSize}
                    onChange={handleFontSizeChange}
                    className="w-[70px] h-[30px] flex justify-center items-center border border-gray-300 rounded-mdtext-gray-700 hover:border-blue-500 focus:outline-none"
                    title="글자 크기"
                >
                    {fontSizes.map(size => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                {/* 🔘 토글 버튼 */}
                <button onClick={toggleView}
                        className="flex justify-center items-center py-1 px-2  rounded bg-gray-200">
                    {isHtmlView ? "📝 본문" : "🧾 HTML"}
                </button>
            </div>

            {/* 본문 */}
            <div className="p-3 pt-15">
                {isHtmlView ? (
                    <textarea
                        value={htmlContent}
                        onChange={(e) => setHtmlContent(e.target.value)}
                        className="w-full h-[400px] font-mono border-none outline-none focus:outline-none focus:ring-0 text-sm"
                    />
                ) : (
                    <EditorContent editor={editor} className="min-h-[400px]"/>
                )}
            </div>
        </div>
    );
};

export default Editor;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
    editor: any; // TipTap editor
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
    const [color, setColor] = useState('#000000');
    const [showPicker, setShowPicker] = useState(false);

    const pickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const editorRef = useRef<HTMLElement | null>(null);

    // 3자리 HEX → 6자리 HEX 변환
    const normalizeHex = (hex: string) => {
        if (/^#([0-9a-f]{3})$/i.test(hex)) {
            return hex.replace(
                /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
                '#$1$1$2$2$3$3'
            );
        }
        return hex;
    };

    const togglePicker = () => setShowPicker(prev => !prev);

    const handleColorChange = (newColor: { hex: string }) => {
        setColor(newColor.hex);

        if (!editor) return;

        // TipTap에 텍스트 색상 적용
        editor.chain().focus().extendMarkRange('textStyle').setColor(newColor.hex).run();
    };

    // 선택 영역 바뀌면 색상 상태 동기화
    useEffect(() => {
        if (!editor) return;

        const updateColor = () => {
            const { state } = editor;
            const { from, to } = state.selection;
            let newColor = '#000000';

            state.doc.nodesBetween(from, to, (node: any) => {
                if (!node.marks) return;
                node.marks.forEach((mark: any) => {
                    if (mark.type.name === 'textStyle' && mark.attrs.color) {
                        newColor = mark.attrs.color;
                    }
                });
            });

            setColor(newColor);
        };

        editor.on('selectionUpdate', updateColor);
        return () => editor.off('selectionUpdate', updateColor);
    }, [editor]);



    // 에디터 DOM 참조
    useEffect(() => {
        if (!editor) return;
        editorRef.current = editor.view.dom;
    }, [editor]);


    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                pickerRef.current &&
                !pickerRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target) &&
                editorRef.current &&
                !editorRef.current.contains(target) // 에디터 내부 클릭은 제외
            ) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            {/* 색상 버튼 */}
            <button
                ref={buttonRef}
                onClick={togglePicker}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                title="글자 색상"
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                >
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="16"
                        fontWeight="bold"
                        fill={color} // 현재 선택 색상
                    >
                        C
                    </text>
                </svg>
            </button>

            {/* 색상 선택기 */}
            {showPicker && (
                <div
                    ref={pickerRef}
                    style={{position: 'absolute', zIndex: 50, bottom:50 , left: 40}}
                >
                    <ChromePicker color={color} onChange={handleColorChange} disableAlpha/>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;

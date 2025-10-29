// extensions/CustomImage.ts
import { Image as TiptapImage } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export const CustomImage = TiptapImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
                renderHTML: attributes => {
                    return {
                        class: attributes.class,
                    };
                },
            },
        };
    },
});

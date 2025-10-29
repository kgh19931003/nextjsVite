import { Extension } from '@tiptap/core'

const SoftBreak = Extension.create({
    name: 'softBreak',

    addKeyboardShortcuts() {
        return {
            'Shift-Enter': () => {
                return this.editor.commands.command(({ tr, dispatch }) => {
                    const { state } = this.editor
                    if (dispatch) {
                        const { selection } = state
                        tr.insertText('\n', selection.from, selection.to)
                        dispatch(tr)
                    }
                    return true
                })
            },
        }
    },
})

export default SoftBreak;

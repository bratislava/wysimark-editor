import { useState } from "react"
import { createEditor, Editor, Transforms } from "slate"
import { withHistory } from "slate-history"
import { ReactEditor, withReact } from "slate-react"

import { parse, serialize } from "../convert"
import { Element } from "./plugins"
import { withSink } from "./SinkEditable"
import { WysimarkEditor } from "./types"

export function useEditor({
  authToken,
  height,
  minHeight,
  maxHeight,
  onUploadButtonClick,
}: {
  authToken?: string
  height?: number
  minHeight?: number
  maxHeight?: number
  onUploadButtonClick?: () => void
}): Editor & ReactEditor & WysimarkEditor {
  const [editor] = useState(() => {
    const editor = createEditor()
    const nextEditor = withSink(withReact(withHistory(editor)), {
      upload: { authToken, onUploadButtonClick },
      image: {},
      toolbar: {
        height,
        minHeight,
        maxHeight,
        showCustomUploadButton: !!onUploadButtonClick,
        /**
         * If `authToken` is provided then show upload buttons.
         */
        showUploadButtons: !!authToken,
      },
    })
    nextEditor.convertElement.addConvertElementType("paragraph")
    editor.wysimark = {
      //   initialMarkdown,
      //   initialValue: parse(initialMarkdown),
    }
    editor.getMarkdown = () => {
      return serialize(editor.children as Element[])
    }
    editor.setMarkdown = (markdown: string) => {
      const documentValue = parse(markdown)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
    return nextEditor
  })

  return editor
}

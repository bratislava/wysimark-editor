import React from "react"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

import { $InlineCode } from "./styles"
import { InlineCodePluginCustomTypes } from "./types"
export * from "./styles"
export * from "./types"

export const InlineCodePlugin = () =>
  createPlugin<InlineCodePluginCustomTypes>((editor) => {
    editor.supportsInlineCode = true
    const p = (editor.inlineCodePlugin = {
      toggleInlineCode: () => editor.marksPlugin.toggleMark("code"),
    })
    return {
      name: "inline-code",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          if (leaf.code) {
            return <$InlineCode>{children}</$InlineCode>
          } else {
            return children
          }
        },
        onKeyDown: createHotkeyHandler({
          "mod+j": () => p.toggleInlineCode(),
        }),
      },
    }
  })

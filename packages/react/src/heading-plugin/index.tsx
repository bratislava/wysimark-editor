export * from "./types"

import {
  createAutocompleteSpaceHandler,
  createHotkeyHandler,
  createPlugin,
  curryOne,
  curryTwo,
  TypedPlugin,
} from "~/src/sink"

import { insertBreak } from "./insert-break"
import { createHeadingMethods } from "./methods"
import { $Heading } from "./styles"
import { HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = createPlugin<HeadingPluginCustomTypes>(
  (editor) => {
    editor.convertElement.addConvertElementType("heading")
    editor.heading = createHeadingMethods(editor)
    const hotkeyHandler = createHotkeyHandler({
      "super+1": curryTwo(editor.heading.convertHeading, 1, true),
      "super+2": curryTwo(editor.heading.convertHeading, 2, true),
      "super+3": curryTwo(editor.heading.convertHeading, 3, true),
      "super+4": curryTwo(editor.heading.convertHeading, 4, true),
      "super+5": curryTwo(editor.heading.convertHeading, 5, true),
      "super+6": curryTwo(editor.heading.convertHeading, 6, true),
    })
    const autocompleteHandler = createAutocompleteSpaceHandler(editor, {
      "#": curryTwo(editor.heading.convertHeading, 1, false),
      "##": curryTwo(editor.heading.convertHeading, 2, false),
      "###": curryTwo(editor.heading.convertHeading, 3, false),
      "####": curryTwo(editor.heading.convertHeading, 4, false),
      "#####": curryTwo(editor.heading.convertHeading, 5, false),
      "######": curryTwo(editor.heading.convertHeading, 6, false),
    })
    return {
      name: "heading",
      editor: {
        insertBreak: curryOne(insertBreak, editor),
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "heading") {
            /**
             * We type this to React.ElementType because we are confident that
             * this will result in h1 through h6 which is a valid
             * React.ElementType.
             */
            const tag = `h${element.level}` as React.ElementType
            return (
              <$Heading as={tag} {...attributes}>
                {children}
              </$Heading>
            )
          }
        },
        onKeyDown: (e) => {
          if (hotkeyHandler(e)) return true
          if (autocompleteHandler(e)) return true
          return false
        },
      },
    }
  }
) as TypedPlugin<HeadingPluginCustomTypes>
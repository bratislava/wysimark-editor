import { Editor } from "slate"

import { setNodes } from "~/src/sink"

import { isListItem, ListItemElement } from ".."

export function outdent(editor: Editor): boolean {
  const entries = Array.from(
    Editor.nodes<ListItemElement>(editor, {
      match: isListItem,
    })
  )
  /**
   * Don't allow `shift+tab` if any of the list items are already at a
   * depth of `0`
   */
  for (const entry of entries) {
    if (entry[0].depth === 0) return true
  }
  return setNodes<ListItemElement>(editor, {
    match: isListItem,
    convert: (node) => ({ depth: Math.max(0, node.depth - 1) }),
  })
}

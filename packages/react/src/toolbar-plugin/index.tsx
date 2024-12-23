import { createPlugin, TypedPlugin } from "~/src/sink"

import { renderEditable } from "./render-editable"

export type ToolbarEditor = {
  toolbar: {
    height?: number
    minHeight?: number
    maxHeight?: number
    showUploadButtons?: boolean
    showCustomUploadButton?: boolean
  }
}

export type ToolbarOptions = {
  toolbar: {
    height?: number
    minHeight?: number
    maxHeight?: number
    showUploadButtons?: boolean
    showCustomUploadButton?: boolean
  }
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
  Options: ToolbarOptions
}

export const ToolbarPlugin = createPlugin<ToolbarPluginCustomTypes>(
  (editor, options) => {
    editor.toolbar = {
      height: options.toolbar?.height,
      minHeight: options.toolbar?.minHeight,
      maxHeight: options.toolbar?.maxHeight,
      showUploadButtons: options.toolbar?.showUploadButtons ?? false,
      showCustomUploadButton: options.toolbar?.showCustomUploadButton ?? false,
    }
    return {
      name: "toolbar",
      editor: {},
      renderEditable,
      editableProps: {},
    }
  }
) as TypedPlugin<ToolbarPluginCustomTypes>

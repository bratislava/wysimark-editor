import { styled } from "goober"
import { forwardRef } from "react"

export const $InlineCode = styled("code", forwardRef)`
  background-color: var(--inline-code-bgcolor);
  border-radius: 0.25em;
  padding: 0.25em;
  font-size: 0.875em;
`
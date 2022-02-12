import React, { forwardRef } from "react"
import styled from "../css.setup"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

export interface RadioProps {
  chidren: any
  type?: string //auto, scroll, hover, always
  scrollHideDelay?: number
}

const ScrollArea = forwardRef(function (
  { type = "scroll", scrollHideDelay, ...props }: RadioProps | any,
  ref: any
) {
  return (
    <StyledScrollArea ref={ref} type={type} scrollHideDelay={scrollHideDelay}>
      <ScrollAreaPrimitive.Viewport {...props} />
      <StyledScrollbar orientation="vertical">
        <StyledThumb />
      </StyledScrollbar>
      <StyledScrollbar orientation="horizontal">
        <StyledThumb />
      </StyledScrollbar>
      <StyledCorner />
    </StyledScrollArea>
  )
})

ScrollArea.displayName = "Q-ScrollArea"

export default ScrollArea

const StyledScrollArea = styled(ScrollAreaPrimitive.Root)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledThumb = styled(ScrollAreaPrimitive.Thumb)`
  flex: 1;
  background-color: $gray30;
  border-radius: $pill;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44;
    min-height: 44;
  }
`

const StyledCorner = styled(ScrollAreaPrimitive.Corner)`
  background: $bg1;
`

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: $1;
  background: $bg1;
  transition: background 160ms ease-out;

  &:hover {
    background: $bg3;
  }

  &:hover ${StyledThumb} {
    background-color: $gray;
  }

  &[data-orientation="vertical"] {
    width: 10px;
    border-left: 1px solid $gray50;
  }

  &[data-orientation="horizontal"] {
    flexdirection: column;
    height: 10px;
  }
`

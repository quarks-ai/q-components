import React, { forwardRef } from "react"

export interface EmptyProps {
  as?: any
  style?: any

  width?: string
  height?: string
}

const Empty = forwardRef(function (
  { style, width = "100%", height = "100%", ...props }: EmptyProps,
  ref: any
) {
  return (
    <div
      {...props}
      style={{
        ...style,
        width,
        height,
      }}
      ref={ref}
    />
  )
})

Empty.displayName = "Q-Empty"

export default Empty

import React, { forwardRef, useLayoutEffect, useState } from "react"
import ReactDOM from "react-dom"

import styled from "../css.setup"

const Portal = forwardRef(function ({ containerRef, ...props }: any, ref: any) {
  const hostElement = containerRef?.current ?? globalThis?.document?.body
  const [, forceUpdate] = useState({})

  useLayoutEffect(() => {
    forceUpdate({})
  }, [])

  if (hostElement) {
    return ReactDOM.createPortal(
      <StyledPortal ref={ref} {...props} />,
      hostElement
    )
  }

  return null
})

Portal.displayName = "Q-Portal"
export default Portal

const StyledPortal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: $max;
  pointer-event: none;
`

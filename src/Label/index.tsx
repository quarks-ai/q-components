import React, { forwardRef, useEffect, useRef } from "react"
import styled from "../css.setup"

export interface LabelProps {
  as?: any
  id?: string
  children?: React.ReactNode | any
}

const Label = forwardRef(function (
  { id, htmlFor, onClick, ...props }: LabelProps | any,
  ref: any
) {
  const target: any = useRef(null)

  useEffect(() => {
    target.current = document.getElementById(htmlFor)
  }, [])

  function handleClick(e: Event) {
    onClick?.(e)
    if (!target.current || e.defaultPrevented) return
    if (e.isTrusted === true) {
      target.current.click()
      target.current.focus()
    }
  }

  return (
    <SyledLabel
      id={id}
      ref={ref}
      role="label"
      onClick={handleClick}
      {...props}
    />
  )
})

Label.displayName = "Q-Label"

export default Label

const SyledLabel = styled.span`
  user-select: none;

  margin-block-end: 0.4em;
  margin-block-start: 0.4em;

  font-size: $button;
  font-weight: $medium;
  line-height: $button;
`

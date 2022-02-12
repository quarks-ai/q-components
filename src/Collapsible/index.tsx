import React, { forwardRef, useEffect, useRef } from "react"
import styled from "../css.setup"
import useToggle from "../hooks/useToggle"
import useCreateContext from "../utils/createContext"
import mergeRefs from "../utils/mergeRefs"

export interface CollapsibleProps {
  as?: any
  children?: React.ReactNode | any

  open?: boolean
  readOnly?: boolean
  disabled?: boolean
  defaultOpen?: boolean

  onChange?: any
}

const [CollapsibleProvider, useCollapsibleContext] =
  useCreateContext("Collapsible")

const Collapsible = forwardRef(function (
  {
    open,
    onChange,
    disabled,
    defaultOpen,
    readOnly = false,
    ...props
  }: CollapsibleProps | any,
  ref: any
) {
  return (
    <CollapsibleProvider
      get={useToggle}
      on={open}
      readOnly={readOnly || disabled}
      onChange={onChange}
      defaultOn={defaultOpen}
    >
      <div ref={ref} data-disabled={disabled ? "" : undefined} {...props} />
    </CollapsibleProvider>
  )
})

Collapsible.displayName = "Q-Collapsible"

const CollapsibleTrigger = forwardRef(
  ({ disabled, onClick, ...props }: any, ref: any) => {
    const { on, toggle } = useCollapsibleContext()

    return (
      <button
        ref={ref}
        data-open={on ? "" : undefined}
        data-closed={!on ? "" : undefined}
        disabled={disabled}
        {...props}
        onClick={(e: Event) => {
          toggle()
          onClick?.(e)
        }}
      />
    )
  }
)

CollapsibleTrigger.displayName = "Q-CollapsibleTrigger"

const CollapsibleContent = forwardRef(({ ...props }: any, ref: any) => {
  const { on, _ } = useCollapsibleContext()
  const contentRef: any = useRef(null)

  const heightRef = useRef(0)
  const height = heightRef.current
  const widthRef = useRef(0)
  const width = widthRef.current

  useEffect(() => {
    const el = contentRef?.current
    if (el) {
      heightRef.current = contentRef.current.scrollHeight
      widthRef.current = contentRef.current.scrollWidth
    }
  }, [])

  return (
    <StyledCollapsibleContent
      ref={mergeRefs(ref, contentRef)}
      width={width}
      height={height}
      data-open={on ? "" : undefined}
      data-closed={!on ? "" : undefined}
      {...props}
    />
  )
})

CollapsibleContent.displayName = "Q-CollapsibleContent"

export {
  Collapsible as Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content,
}

const StyledCollapsibleContent = styled.div`
  --width: $p.width + "px" || "0px";
  --height: $p.height + "px" || "0px";

  overflow: hidden;
  will-change: height;
  transition: height 0.2s ease;

  &[data-open] {
    height: var(--height);
  }

  &[data-closed] {
    height: 0px;
  }
`

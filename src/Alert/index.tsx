import React, { forwardRef, useRef } from "react"
import styled from "../css.setup"

import useToggle from "../hooks/useToggle"
import mergeRefs from "../utils/mergeRefs"
import useScrollLock from "../hooks/useLockScroll"
import useCreateContext from "../utils/createContext"
import useClickOutside from "../hooks/useClickOutside"

import Slot from "../Slot"
import Portal from "../Portal"
import VisuallyHidden from "../VisuallyHidden"
import { FocusScope } from "@radix-ui/react-focus-scope"

export interface AlertProps {
  as?: any
  children?: React.ReactNode | any

  open?: boolean
  readOnly?: boolean
  disabled?: boolean
  defaultOpen?: boolean

  onChange?: any
}

const [AlertProvider, useAlertContext] = useCreateContext("Alert")

const Alert = forwardRef(function (
  {
    open,
    onChange,
    disabled,
    children,
    defaultOpen = false,
    readOnly = false,
  }: AlertProps | any,
  ref: any
) {
  return (
    <AlertProvider
      get={useToggle}
      on={open}
      readOnly={readOnly || disabled}
      onChange={onChange}
      defaultOn={defaultOpen}
    >
      {children}
    </AlertProvider>
  )
})

Alert.displayName = "Q-Alert"

const AlertTrigger = forwardRef(
  ({ disabled, onClick, ...props }: any, ref: any) => {
    const { on, toggle } = useAlertContext()

    return (
      <Slot
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

AlertTrigger.displayName = "Q-AlertTrigger"

const AlertContent = forwardRef(({ ...props }: any, ref: any) => {
  const overlayRef = useRef(null)
  const { on, toggle } = useAlertContext()

  useClickOutside(overlayRef, on ? toggle : null)
  useScrollLock(on)

  return (
    <Portal>
      {on && (
        <FocusScope asChild trapped={on} loop={true}>
          <Wrapper
            preventEvents={!on}
            data-open={on ? "" : undefined}
            data-closed={!on ? "" : undefined}
          >
            <Slot
              ref={mergeRefs(overlayRef, ref)}
              data-open={on ? "" : undefined}
              data-closed={!on ? "" : undefined}
              {...props}
            />
          </Wrapper>
        </FocusScope>
      )}
    </Portal>
  )
})

AlertContent.displayName = "Q-AlertContent"

export { Alert as Root, AlertTrigger as Trigger, AlertContent as Content }

const Wrapper = styled(VisuallyHidden)`
  background: #00000020;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &[data-closed] {
    width: 0;
    height: 0;
    opacity: 0;

    visibility: hidden;
    pointer-events: none;
  }
`

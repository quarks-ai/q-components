import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react"

import useToggle from "../hooks/useToggle"
import mergeRefs from "../utils/mergeRefs"
import useScrollLock from "../hooks/useLockScroll"
import useCreateContext from "../utils/createContext"
import useClickOutside from "../hooks/useClickOutside"

import Portal from "../Portal"
import * as PopperPrimitive from "@radix-ui/react-popper"
import { createPopperScope } from "@radix-ui/react-popper"
import useIsInViewport from "../hooks/useInViewport"

const [PopperProvider, usePopperContext] = useCreateContext("Alert")
const usePopperScope: any = createPopperScope()

export interface PopperProps {
  as?: any
  children?: React.ReactNode | any

  open?: boolean
  readOnly?: boolean
  disabled?: boolean
  defaultOpen?: boolean

  delayDuration?: number

  onChange?: any
}

let openTimeoutID: any
const Popper = function ({
  open,
  onChange,
  disabled,
  children,
  readOnly = false,
  openDelay = 0,
  closeDelay = 0,
  openOn = "onMouseEnter",
  closeOn = "onMouseLeave",
}: PopperProps | any) {
  const popperScope = usePopperScope()

  const trigger = useRef(null)

  const [shouldOpen, setShouldOpen] = useState(false)
  const [isTriggerIn, setIsTriggerIn] = useState(false)

  const { on, set } = useToggle({
    open,
    readOnly: readOnly || disabled,
    onChange,
    defaultOpen: false,
  })

  useEffect(() => {
    if (shouldOpen && !on) {
      if (openDelay > 0) {
        openTimeoutID = setTimeout(() => {
          set(true)
        }, openDelay)
      } else {
        set(true)
      }
    }

    if (!shouldOpen && on) {
      clearTimeout(openTimeoutID)
      if (closeDelay > 0) {
        setTimeout(() => {
          set(false)
        }, closeDelay)
      } else {
        set(false)
      }
    }
  }, [on, shouldOpen, openDelay, closeDelay])

  return (
    <PopperPrimitive.Root {...popperScope}>
      <PopperProvider
        on={on}
        openOn={openOn}
        trigger={trigger}
        closeOn={closeOn}
        set={setShouldOpen}
        isTriggerIn={isTriggerIn}
        setIsTriggerIn={setIsTriggerIn}
      >
        {children}
      </PopperProvider>
    </PopperPrimitive.Root>
  )
}

Popper.displayName = "Q-Popper"

const PopperTrigger = forwardRef(
  (
    {
      disabled,
      openOn: openOnOverride,
      closeOn: closeOnOverride,
      ...props
    }: any,
    ref: any
  ) => {
    const anchorRef = useRef(null)
    const popperScope = usePopperScope()
    const { set, on, openOn, closeOn, trigger, isTriggerIn, setIsTriggerIn } =
      usePopperContext()

    const isIn = useIsInViewport(anchorRef)

    useEffect(() => {
      if (isIn !== isTriggerIn) {
        setIsTriggerIn(isIn)
      }
    }, [isIn, isTriggerIn])

    const memoizedOpen = useMemo(
      () => (openOnOverride ? openOnOverride : openOn),
      [openOnOverride, openOn]
    )

    const memoizedClose = useMemo(
      () => (closeOnOverride ? closeOnOverride : closeOn),
      [closeOnOverride, closeOn]
    )

    function handleAction(actionName: string, e: Event) {
      actionName.includes("onContextMenu") && e.preventDefault()
      memoizedOpen.includes(actionName) && !on && set(true)
      memoizedClose.includes(actionName) && on && set(false)
      props[actionName]?.(e)
    }

    useEffect(() => {
      trigger.current = ref?.current || anchorRef?.current
    })

    return (
      <PopperPrimitive.Anchor
        {...popperScope}
        ref={mergeRefs(ref, anchorRef)}
        data-open={on ? "" : undefined}
        data-closed={!on ? "" : undefined}
        onClick={(e: Event) => handleAction("onClick", e)}
        onMouseEnter={(e: Event) => handleAction("onMouseEnter", e)}
        onMouseLeave={(e: Event) => handleAction("onMouseLeave", e)}
        onContextMenu={(e: Event) => handleAction("onContextMenu", e)}
        onFocus={(e: Event) => handleAction("onFocus", e)}
        onBlur={(e: Event) => handleAction("onBlur", e)}
        onKeyDown={(e: any) => {
          if (memoizedOpen.includes(e.key) || memoizedClose.includes(e.key)) {
            handleAction(e.key, e)
          }
          props?.onKeyDown?.(e)
        }}
        {...props}
      />
    )
  }
)

PopperTrigger.displayName = "Q-AlertTrigger"

const PopperContent = forwardRef(
  (
    {
      sideOffset,
      alignOffset,
      side = "bottom",
      align = "center",
      collisionTolerance,
      avoidCollisions = true,
      ...props
    }: any,
    ref: any
  ) => {
    const containerRef = useRef(null)
    const popperScope = usePopperScope()
    const { on, set, closeOn, trigger, isTriggerIn } = usePopperContext()

    useClickOutside(
      containerRef,
      () => {
        closeOn.includes("onOutside") && on ? set(false) : null
      },
      closeOn.includes("onOutside") && on ? [trigger] : [],
      closeOn.includes("onOutside") && on ? ["click"] : []
    )

    useScrollLock(on)

    return (
      isTriggerIn && (
        <Portal>
          <PopperPrimitive.Content
            asChild
            ref={mergeRefs(ref, containerRef)}
            data-open={on ? "" : undefined}
            data-closed={!on ? "" : undefined}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionTolerance={collisionTolerance}
            {...props}
            {...popperScope}
          />
        </Portal>
      )
    )
  }
)

PopperContent.displayName = "Q-PopperContent"

export { Popper as Root, PopperTrigger as Trigger, PopperContent as Content }

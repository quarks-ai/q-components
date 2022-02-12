import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react"
import mergeRefs from "../utils/mergeRefs"

// from https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props
  const childArray = Children.toArray(children)

  if (childArray.some(isSlottable)) {
    return (
      <>
        {childArray.map((child) => {
          return isSlottable(child) ? (
            <SlotClone {...slotProps} ref={forwardedRef}>
              {child.props.children}
            </SlotClone>
          ) : (
            child
          )
        })}
      </>
    )
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  )
})

Slot.displayName = "Slot"

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children: React.ReactNode
}

const SlotClone = forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: mergeRefs(forwardedRef, (children as any).ref),
    })
  }

  return Children.count(children) > 1 ? Children.only(null) : null
})

SlotClone.displayName = "SlotClone"

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return isValidElement(child) && child.type === Slottable
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps }

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName]
    const childPropValue = childProps[propName]

    const isHandler = /^on[A-Z]/.test(propName)
    // if it's a handler, modify the override by composing the base handler
    if (isHandler) {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue?.(...args)
        slotPropValue?.(...args)
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue }
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ")
    }
  }

  return { ...slotProps, ...overrideProps }
}

export default Slot
export type { SlotProps }

import React, { forwardRef } from "react"
import styled from "../css.setup"
import BaseInput from "../BaseInput"
import Button from "../Button"
import useToggle from "../hooks/useToggle"

export interface CheckboxProps {
  as?: any
  children?: React.ReactNode | any

  name?: string
  size?: string
  variant?: any
  color?: string
  autoComplete?: string

  error?: boolean
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  autoFocus?: boolean
  indeterminate?: boolean

  value?: any
  onChange?: any
  defaultValue?: any
}

const ChecboxInput = forwardRef(function (
  {
    size = "s",
    name,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    autoFocus,
    defaultValue,
    indeterminate = false,
    error = false,
    color = "black",
    ...props
  }: CheckboxProps | any,
  ref: any
) {
  const { on: checked, toggle } = useToggle({
    on: value,
    onChange,
    defaultOn: defaultValue,
    readOnly,
  })

  return (
    <SyledButton
      iconOnly
      ref={ref}
      size={size}
      type="button"
      role="checkbox"
      onClick={(e: any) => {
        e.stopPropagation()
        toggle()
      }}
      color={color}
      variant={variant}
      disabled={disabled}
      disableanimationsifdisabled
      {...props}
    >
      <BaseInput
        hidden
        name={name}
        aria-hidden
        type="checbox"
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={error}
        autoFocus={autoFocus}
        defaultValue={checked}
        defaultChecked={checked}
      />

      <IconContainer viewBox="0 0 24 24" size={size}>
        <IconPath
          color={"colors." + color}
          checked={checked}
          variant={variant}
          d="M4.5 10L10.5 16L24.5 1"
          ignore={["checked"]}
        />
        {indeterminate && <IconRect x={4} y={11} rx="2" ry="2" />}
      </IconContainer>
    </SyledButton>
  )
})

ChecboxInput.displayName = "Q-Checbox"

export default ChecboxInput

const SyledButton = styled(Button)`
  padding: $none;

  &[hovered] {
    transform: none;
    box-shadow: 0 0 0 2px var(--focus-color);
    transition: box-shadow 0.2s ease;
  }

  $props.size === "xs" {
    border-radius: $2;
    height: 20px;
    width: 20px;
  }
`

const IconContainer = styled.svg`
  width: 24px;
  height: 24px;

  $props.size === "s" {
    width: 20px;
    height: 20px;
  }

  $props.size === "xs" {
    width: 18px;
    height: 18px;
  }
`

const IconPath = styled.path`
  --color: $p.color || "$colors.black";

  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke: $white;
  stroke-dasharray: 16.5px 33px;
  stroke-dashoffset: 17.5px;
  transition: stroke-dashoffset 0.2s ease;

  $props.checked {
    stroke-dashoffset: 46.5px;
  }

  $props.variant === "outlined"||$props.variant === "text" {
    stroke: var(--color);
  }
`

const IconRect = styled.rect`
  --color: $p.color || "$colors.black";

  fill: $white;
  width: 16px;
  height: 3px;

  $props.variant === "outlined"||$props.variant === "text" {
    fill: var(--color);
  }
`

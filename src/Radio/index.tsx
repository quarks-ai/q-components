import React, { forwardRef } from "react"
import styled from "../css.setup"
import BaseInput from "../BaseInput"
import Button from "../Button"
import useToggle from "../hooks/useToggle"

export interface RadioProps {
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

  value?: any
  onChange?: any
  defaultValue?: any
}

const RadioInput = forwardRef(function (
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
    error = false,
    color = "black",
    ...props
  }: RadioProps | any,
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
      role="radio"
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
        type="radio"
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={error}
        autoFocus={autoFocus}
        defaultValue={checked}
        defaultChecked={checked}
      />

      <IconContainer
        viewBox="0 0 24 24"
        size={size}
        checked={checked}
        ignore={["checked"]}
      >
        <IconCircle
          color={"colors." + color}
          checked={checked}
          variant={variant}
          cx="12"
          cy="12"
          r="7"
          ignore={["checked"]}
        />
      </IconContainer>
    </SyledButton>
  )
})

RadioInput.displayName = "Q-Switch"

export default RadioInput

const SyledButton = styled(Button)`
  padding: $none;
  border-radius: $round;

  &[hovered] {
    transform: none;
    box-shadow: 0 0 0 2px var(--focus-color);
    transition: box-shadow 0.2s ease;
  }

  $props.size === "xs" {
    height: 20px;
    width: 20px;
  }
`

const IconContainer = styled.svg`
  width: 29px;
  height: 29px;
  border: none;

  $props.size === "xs" {
    width: 20px;
    height: 20px;
  }

  $props.size === "s" {
    width: 27px;
    height: 27px;
  }
`

const IconCircle = styled.circle`
  --color: $p.color || "$colors.black";

  transform: scale(0);
  transform-origin: center center;
  transition: transform 0.2s ease;

  $props.checked {
    transform: scale(1);
  }

  stroke-width: 3px;
  fill: $white;
  stroke: $white;

  $props.variant === "outlined"||$props.variant === "text" {
    stroke: var(--color);
    fill: var(--color);
  }
`

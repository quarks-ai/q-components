import React, { forwardRef } from "react"
import styled from "../css.setup"

export interface InputProps {
  as?: any
  children?: React.ReactNode | any

  name?: string
  size?: string
  variant?: any
  color?: string
  type?: string
  placeholder?: string
  autoComplete?: string

  error?: boolean
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  autoFocus?: boolean
  fullWidth?: boolean

  value?: any
  onChange?: any
  defaultValue?: any
  startAdornment?: any
}

const InputBase = forwardRef(function (
  {
    size,
    name,
    type,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    tabIndex,
    fullWidth,
    autoFocus,
    autoComplete,
    defaultValue,
    endAdornment,
    error = false,
    hidden = false,
    startAdornment,
    color = "black",
    placeholder = "input",
    ...props
  }: InputProps | any,
  ref: any
) {
  const ignoreProps = ["hidden", "color", "fullWidth"]

  return (
    <StyledInput
      ref={ref}
      size={size}
      name={name}
      type={type}
      value={value}
      hidden={hidden}
      variant={variant}
      onChange={onChange}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      aria-hidden={hidden}
      aria-invalid={error}
      ignore={ignoreProps}
      autoFocus={autoFocus}
      className="appearance"
      tabIndex={tabIndex || -1}
      color={"colors." + color}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      disableanimationsifdisabled
      {...props}
    />
  )
})

InputBase.displayName = "Q-Input"

export default InputBase

const StyledInput = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  outline: none;
  border: none;

  $props.hidden {
    pointer-events: none;
    visibility: hidden !important;

    opacity: 0;
    border: none !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`

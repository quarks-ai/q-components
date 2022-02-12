import React, { forwardRef } from "react"
import styled from "../css.setup"
import BaseInput from "../BaseInput"

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

const Input = forwardRef(function (
  {
    size,
    name,
    type,
    value,
    style,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    fullWidth,
    autoFocus,
    className,
    autoComplete,
    defaultValue,
    endAdornment,
    error = false,
    startAdornment,
    color = "black",
    placeholder = "input",
    ...props
  }: InputProps | any,
  ref: any
) {
  const ignoreProps = ["color", "fullWidth"]

  return (
    <StyledInputContainer
      ref={ref}
      size={size}
      type="button"
      role="input"
      variant={variant}
      disabled={disabled}
      aria-invalid={error}
      ignore={ignoreProps}
      onClick={(e: any) => {
        e.stopPropagation()
      }}
      className={className}
      fullWidth={fullWidth}
      color={"colors." + color}
      disableanimationsifdisabled
      style={style}
    >
      {startAdornment}
      <StyledBaseInput
        size={size}
        name={name}
        type={type}
        value={value}
        variant={variant}
        onChange={onChange}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={error}
        ignore={ignoreProps}
        autoFocus={autoFocus}
        className="appearance"
        color={"colors." + color}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disableanimationsifdisabled
        style={style}
        {...props}
      />

      {endAdornment}
    </StyledInputContainer>
  )
})

Input.displayName = "Q-Input"

export default Input

const StyledInputContainer = styled.button`
	--color: $p.color || "$colors.black";
	--focus-color: $p.color ? $p.color + "70" : "$colors.black70";

	border: none;
	outline: none;

	height: 33px;
	min-width: $5;
	border-radius: $3;
	background-color: var(--color);

	cursor: text;
	overflow: hidden;
	position: relative;
	align-items: center;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	
	transition: box-shadow 0.2s ease;

	&[hovered] {
		box-shadow: 0 0 0 2px var(--focus-color);
		transition: box-shadow 0.2s ease;
	}

	&:focus-within {
		box-shadow: 0 0 0 2px var(--focus-color);
		transition: box-shadow 0.2s ease;
	}

	$props.size === "s" {
		height: 27px;
	}

	$props.size === "l" {
		height: 40px;
	}

	$props.disabled {
		background-color: $gray30;
		color: $black30;
		cursor: not-allowed;
	}

	$props.fullWidth {
		width: 100%;
	}

	$props.variant === "outlined" {
		background-color: $transparent;
		color: var(--color);
		border: 1px solid;
		border-color: var(--color);

		$props.disabled {
			background-color: $transparent;
			color: $gray;
			border: 1px solid $gray;

		}
	}
`

const StyledBaseInput = styled(BaseInput)`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;

  padding: $m $l;

  color: $white;
  font-size: $button;
  font-weight: $regular;
  line-height: $button;
  text-decoration: none;
  background: $transparent;

  &::placeholder {
    font-weight: $regular;
    color: $gray50;
  }

  $props.size === "s" {
    padding: $xs $s;
  }

  $props.size === "l" {
    padding: $m $xl;
  }

  $props.disabled {
    cursor: not-allowed;
    color: $gray;

    &::placeholder {
      color: $gray;
    }
  }

  $props.variant === "outlined" {
    color: $black;

    &::placeholder {
      color: $gray;
    }
  }
`

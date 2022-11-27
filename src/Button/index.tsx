import React, { forwardRef } from "react"
import styled from "../css.setup"

export interface ButtonProps {
  as?: any
  children?: React.ReactNode | any

  type?: string
  size?: string
  color?: string
  variant?: string

  disabled?: boolean
  fullWidth?: boolean

  iconOnly?: boolean
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
}

const Button = forwardRef(function (
  {
    href,
    children,
    endIcon,
    startIcon,
    disabled = false,
    color = "black",
    ...props
  }: ButtonProps | any,
  ref: any
) {
  return (
    <StyledButton
      ref={ref}
      disabled={disabled}
      color={"colors." + color}
      as={href ? "a" : "button"}
      disableanimationsifdisabled
      ignore={["fullWidth", "iconOnly", "color"]}
      {...props}
    >
      {startIcon && (
        <IconContainer iconOnly={props.iconOnly} ignore={["iconOnly"]}>
          {startIcon}
        </IconContainer>
      )}
      {children}
      {endIcon && (
        <IconContainer
          variant="end"
          iconOnly={props.iconOnly}
          ignore={["iconOnly"]}
        >
          {endIcon}
        </IconContainer>
      )}
    </StyledButton>
  )
})

Button.displayName = "Q-Button"

export default Button

const StyledButton = styled.button`
	--color: $p.color || "$colors.black";
	--focus-color: $p.color ? $p.color + "70" : "$colors.black70";
	--click-color: $p.color ? $p.color + "20" : "$colors.black20";

	border: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	padding: $s $l;
	border-radius: $2;

	min-width: $5;
	height: 33px;
	position: relative;
	align-items: center;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;

	color: $white;
	background-color: var(--color);

	line-height: $button;
	font-size: $button;
	font-weight: $medium;
	text-decoration: none;

	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&[hovered] {
		transform: translateY(-3px);
		transition: transform 0.2s ease;
	}

	&[clicked] {
		background-color: var(--click-color);
	}

	&[focused] {
		box-shadow: var(--focus-color) 0 0 0 2px;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	&[focused-off] {
		box-shadow: $t.colors.transparent 0 0 0 0px;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	$props.size === "s" {
		padding: $xs $s;
		height: 27px;
	}

	$props.size === "l" {
		padding: $m $xl;
		height: 40px;
	}

	$props.iconOnly {
		min-width: auto;
		width: 33px;
		border-radius: $2;
		padding: $none;

		$props.size === "s" {
			width: 27px;
		}

		$props.size === "l" {
			width: 40px;
		}
	}

	$props.fullWidth {
		width: 100%;
	}

	$props.disabled {
		background-color: $gray50;
		color: $gray;
		cursor: not-allowed;
	}

	$props.variant === "outlined" {
		--click-color: "$colors.gray90";

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

	$props.variant === "text" {
		--click-color: "$colors.gray90";

		background-color: $transparent;
		color: var(--color);

		$props.disabled {
			background-color: $transparent;
			color: $gray;
		}
	}
`

const IconContainer = styled.span`
  display: inherit;
  margin-right: $m;

  $props.variant === "end" {
    margin-right: $none;
    margin-left: $m;
  }

  $props.iconOnly {
    margin: $none;
  }
`

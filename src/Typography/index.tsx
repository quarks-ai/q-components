import React, { forwardRef } from "react"
import styled from "../css.setup"

export interface TypographyProps {
  as?: any
  children?: React.ReactNode | any
  color?: string
  variant?: any
}

const Typography = forwardRef(function (
  { variant = "p", color = "black", ...props }: TypographyProps | any,
  ref: any
) {
  return (
    <StyledTypography
      ref={ref}
      as={variant.startsWith("h") && !props.as ? variant : props.as || "p"}
      color={"colors." + color}
      variant={variant}
      {...props}
    />
  )
})

Typography.displayName = "Q-Typography"

export default Typography

const StyledTypography = styled.p`
  --color: $p.color || "$colors.black";

  font-weight: $regular;
  font-size: $default;
  line-height: $default;
  margin-block-start: 0.4em;
  margin-block-end: 0.4em;

  color: var(--color);

  $props.variant === "h1" {
    font-size: $h1;
    line-height: $h1;
    font-weight: $light;
  }

  $props.variant === "h2" {
    font-size: $h2;
    line-height: $h2;
    font-weight: $light;
  }

  $props.variant === "h3" {
    font-size: $h3;
    line-height: $h3;
    font-weight: $regular;
  }

  $props.variant === "h4" {
    font-size: $h4;
    line-height: $h4;
    font-weight: $regular;
  }

  $props.variant === "h5" {
    font-size: $h5;
    line-height: $h5;
    font-weight: $regular;
  }

  $props.variant === "h6" {
    font-size: $h6;
    line-height: $h6;
    font-weight: $medium;
  }

  $props.variant === "subtitle1" {
    font-size: $subtitle1;
    font-weight: $regular;
    line-height: $subtitle1;
  }

  $props.variant === "subtitle2" {
    font-size: $subtitle2;
    font-weight: $medium;
    line-height: $subtitle2;
  }

  $props.variant === "body1" {
    font-size: $body1;
    line-height: $body1;
    font-weight: $regular;
  }

  $props.variant === "body2" {
    font-size: $body2;
    line-height: $body2;
    font-weight: $regular;
  }

  $props.variant === "button" {
    font-size: $button;
    font-weight: $medium;
    line-height: $button;

    background: $transparent;
    border: none;
  }

  $props.variant === "caption" {
    font-size: $caption;
    font-weight: $regular;
    line-height: $regular;
  }
`

import React, { forwardRef } from "react"
import styled from "../css.setup"

export interface VisuallyHiddenProps {
  as?: any
  children?: React.ReactNode | any
}

const VisuallyHidden = forwardRef(function (
  { preventEvents = true, ...props }: VisuallyHiddenProps | any,
  ref: any
) {
  return (
    <Container
      ref={ref}
      preventEvents={preventEvents}
      ignore={["preventEvents"]}
      {...props}
    />
  )
})

VisuallyHidden.displayName = "Q-VisuallyHidden"

export default VisuallyHidden

const Container = styled.span`
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 0;

	border: $none;
	padding: $none;
	margin: $none;

	overflow: hidden;
	background-red;

	display: flex;
	align-items: center;
	justify-content: center;

	$props.preventEvents {
		pointer-events: none;
	}
`

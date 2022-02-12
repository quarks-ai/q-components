import React, { forwardRef } from "react"
import styled from "../css.setup"

const ORIENTATIONS = ["horizontal", "vertical"]

export interface SeparatorProps {
  as?: any
  children?: React.ReactNode | any
  orientation?: number
}

const Separator = forwardRef(function (
  { orientation, color = "gray50", ...props }: SeparatorProps | any,
  ref: any
) {
  return (
    <StyledSeparator
      orientation={ORIENTATIONS?.[orientation] ?? ORIENTATIONS[0]}
      color={"colors." + color}
      ref={ref}
      {...props}
    />
  )
})

Separator.displayName = "Q-Separator"

export default Separator

const StyledSeparator = styled.div`
	--color: $p.color || "$colors.black";

	position: relative;
	width: 100%;
    height: 1px;

    margin: $m 0;
    background-color var(--color);

	display: flex;
	align-items: center;
	justify-content: center;

	$props.orientation === "${ORIENTATIONS[1]}" {
        width: 1px;
        height: 100%:
		margin: 0 $m;
	}
`

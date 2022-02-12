import React, { forwardRef } from "react"
import styled from "../css.setup"

export interface FormProps {
  as?: any
  children?: React.ReactNode | any
}

const Form = forwardRef(function (props: FormProps | any, ref: any) {
  return <StyledForm ref={ref} {...props} />
})

Form.displayName = "Q-Form"

export default Form

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

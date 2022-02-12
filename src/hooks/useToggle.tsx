import { useEffect, useState } from "react"

export default function useToggle({
  on: propOn,
  onChange,
  defaultOn = false,
  readOnly = false,
}: any = {}) {
  const [on, setOn] = useState(propOn != null && onChange ? propOn : defaultOn)

  useEffect(() => {
    if (propOn && !onChange) {
      console.warn("on value was provided without an onChange handler")
    }
  }, [propOn, onChange])

  const toggle = () => {
    !readOnly ? (onChange && propOn ? onChange(!on) : setOn(!on)) : null
  }

  const set = (val: boolean) => {
    !readOnly ? (onChange && propOn ? onChange(val) : setOn(val)) : null
  }

  return {
    on,
    set,
    toggle,
  }
}

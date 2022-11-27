import { useEffect, useState } from "react"

export default function useToggle({
  on: propOn,
  onChange,
  defaultOn = false,
  readOnly = false,
}: any = {}) {
  const [on, setOn] = useState(propOn != null ? propOn : defaultOn)

  useEffect(() => {
    if (propOn !== null && !onChange) {
      // console.warn("on value was provided without an onChange handler")
    }
  }, [propOn, onChange])

  const toggle = () => {
    if (!readOnly) {
      onChange?.(!on)
      setOn(!on)
    }
  }

  const set = (val: boolean) => {
    if (!readOnly) {
      onChange?.(val)
      setOn(val)
    }
  }

  return {
    on,
    set,
    toggle,
  }
}

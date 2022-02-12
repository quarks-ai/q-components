import { useEffect } from "react"

const DEFAULT_EVENTS = ["mousedown", "touchstart"]

export default function useClickOutside<T extends HTMLElement = any>(
  ref: any,
  cb: () => void,
  ignore: any[] = [],
  events?: string[] | null
) {
  useEffect(() => {
    const listener = (e: any) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !ignore.some((r) => r?.current?.contains(e.target) || false)
      ) {
        cb?.()
      }
    }

    ;(events || DEFAULT_EVENTS).forEach((fn) =>
      document.addEventListener(fn, listener)
    )

    return () => {
      ;(events || DEFAULT_EVENTS).forEach((fn) =>
        document.removeEventListener(fn, listener)
      )
    }
  }, [ref, cb])

  return
}

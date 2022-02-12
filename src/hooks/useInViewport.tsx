import { useEffect, useState } from "react"
import { observeElementInViewport } from "observe-element-in-viewport"

export default function useIsInViewport(ref: any) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    if (ref && ref.current) {
      return observeElementInViewport(
        ref.current,
        function () {
          setIsInViewport(true)
        },
        function () {
          setIsInViewport(false)
        },
        {
          viewport: null,
        }
      )
    } else {
      return undefined
    }
  }, [ref])

  return isInViewport
}

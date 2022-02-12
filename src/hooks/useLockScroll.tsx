//github.com/mantinedev/mantine/blob/master/src/mantine-hooks/src/use-scroll-lock/use-scroll-lock.ts
import { useEffect, useRef, useState } from "react"

export default function useScrollLock(
  lock?: boolean,
  options = {
    disableBodyPadding: false,
  }
) {
  const [scrollLocked, setScrollLocked] = useState(lock || false)
  const scrollTop = useRef(0)

  const { disableBodyPadding } = options

  const stylesheet = useRef<CSSStyleSheet | any | null>(null)

  const lockScroll = () => {
    scrollTop.current = window.scrollY

    const styles = getLockStyles({ disableBodyPadding })
    const sheet = makeStyleTag()

    injectStyles(sheet, styles)
    insertStyleTag(sheet)

    stylesheet.current = sheet
  }

  const unlockScroll = () => {
    if (!stylesheet?.current) return

    stylesheet.current.parentNode.removeChild(stylesheet.current)
    stylesheet.current = null
  }

  useEffect(() => {
    if (scrollLocked) {
      lockScroll()
    } else {
      unlockScroll()
    }

    return unlockScroll
  }, [scrollLocked])

  useEffect(() => {
    if (lock !== undefined) {
      setScrollLocked(lock)
    }
  }, [lock])

  useEffect(() => {
    if (lock === undefined && typeof window !== "undefined") {
      window.document.body.style.overflow === "hidden" && setScrollLocked(true)
    }
  }, [setScrollLocked])

  return [scrollLocked, setScrollLocked] as const
}

function getScrollWidth() {
  if (typeof window === "undefined" || typeof document === "undefined") return 0

  const paddingRight = parseInt(
    window.getComputedStyle(document.body).paddingRight,
    10
  )
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth

  return paddingRight + scrollbarWidth
}

const getLockStyles = ({ disableBodyPadding }: any) => {
  const scrollWidth = disableBodyPadding ? null : getScrollWidth()

  const styles = `body {
          --removed-scroll-width: ${scrollWidth}px;
          touch-action: none;
          overflow: hidden !important;
          position: relative !important;
          ${
            scrollWidth
              ? "padding-right: var(--removed-scroll-width) !important;"
              : ""
          }
          `

  return styles
}

function injectStyles(tag: any, css: any): void {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css
  } else {
    tag.appendChild(document.createTextNode(css))
  }
}

function insertStyleTag(tag: any) {
  const head = document.head || document.getElementsByTagName("head")[0]
  head.appendChild(tag)
}

function makeStyleTag() {
  const tag = document.createElement("style")
  tag.type = "text/css"
  tag.setAttribute("mantine-scroll-lock", "")

  return tag
}

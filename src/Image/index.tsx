import React, { forwardRef, useLayoutEffect, useState } from "react"
import { useCallbackRef } from "../hooks/useCallbackRef"
import useImageLoadingStatus from "../hooks/useImageLoadingStatus"
import useCreateContext from "../utils/createContext"

const [AvatarProvider, useAvatarContext] = useCreateContext("Avatar")
type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error"

const ImageContext = forwardRef((props: any, forwardedRef) => {
  const [loadingStatus, setLoadingStatus] = useState("idle")

  return (
    <AvatarProvider
      loadingStatus={loadingStatus}
      setLoadingStatus={setLoadingStatus}
    >
      <span ref={forwardedRef} {...props} />
    </AvatarProvider>
  )
})

ImageContext.displayName = "ImageContext"

const Image = forwardRef(
  ({ src, onLoadingStatusChange = () => {}, ...props }: any, forwardedRef) => {
    const imageLoadingStatus = useImageLoadingStatus(src)
    const { setLoadingStatus } = useAvatarContext()
    const handleLoadingStatusChange = useCallbackRef(
      (status: ImageLoadingStatus) => {
        onLoadingStatusChange(status)
      }
    )

    useLayoutEffect(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus)
        setLoadingStatus(imageLoadingStatus)
      }
    }, [imageLoadingStatus, handleLoadingStatusChange])

    return imageLoadingStatus === "loaded" ? (
      <img {...props} ref={forwardedRef} src={src} />
    ) : null
  }
)

Image.displayName = "Image"

const Fallback = forwardRef(({ delayMs, ...props }: any, forwardedRef) => {
  const { loadingStatus } = useAvatarContext()

  return loadingStatus !== "loaded" ? (
    <span {...props} ref={forwardedRef} />
  ) : null
})

Fallback.displayName = "Fallback"

export { ImageContext, Image, Fallback }

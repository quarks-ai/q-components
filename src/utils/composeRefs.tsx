import { useCallback } from "react"

// from https://www.radix-ui.com/....
function composeRefs(...refs: any[]) {
  return (node: any) =>
    refs.forEach((ref: any) => (ref.current = ref(node) || node))
}

function useComposedRefs(...refs: any[]) {
  return useCallback(composeRefs(...refs), refs)
}

export { composeRefs, useComposedRefs }

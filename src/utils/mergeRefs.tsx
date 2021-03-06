/**
 * from https://gist.github.com/wojtekmaj/3848f00c1dc78bfa0686bec96fef9608
 * Allows to use multiple refs on a single React element.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```jsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {...Array<Function|Object>} inputRefs Array of refs
 */
export default function mergeRefs(...inputRefs: any) {
	return (ref: any) => {
		inputRefs.forEach((inputRef: any) => {
			if (!inputRef) {
				return;
			}

			if (typeof inputRef === "function") {
				inputRef(ref);
			} else {
				inputRef.current = ref;
			}
		});
	};
}

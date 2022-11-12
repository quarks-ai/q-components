var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import React, { useState, useEffect, useRef, forwardRef, Children, isValidElement, cloneElement, useLayoutEffect, useMemo, useCallback } from "react";
import setup from "quarks_css";
import ReactDOM, { flushSync } from "react-dom";
import { FocusScope } from "@radix-ui/react-focus-scope";
import * as PopperPrimitive from "@radix-ui/react-popper";
import { createPopperScope } from "@radix-ui/react-popper";
import { observeElementInViewport } from "observe-element-in-viewport";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { useDidUpdate, useMergedRef } from "@mantine/hooks";
function createColors(key, hue, saturation, lightness, dark = false) {
  return [...new Array(10)].map((_, i) => i * 10).reduce((a, b) => __spreadProps(__spreadValues({}, a), {
    [`${key}${b === 0 ? "" : b}`]: `hsl(${hue},${saturation}%,${b === 0 ? lightness : dark ? Math.round(b * (lightness - 100) / 100 + (100 - lightness)) : Math.round(b * (100 - lightness) / 100 + lightness)}%)`
  }), {});
}
const LIGHTNESS = 60;
const THEME_DEFAULT = {
  colors: __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({
    white: "hsl(0,0%,100%)",
    black: "hsl(0,0%,0%)",
    bg1: "hsl(0,0%,100%)",
    bg2: "hsl(228, 70%, 98.5%)",
    bg3: "hsl(228, 90%, 98%)",
    text1: "hsl(0,0%,0%)",
    text2: "hsl(0,0%,30%)",
    text3: "hsl(0,0%,100%)",
    text4: "hsl(0,0%,70%)",
    transparent: "hsla(0,0%,100%, 0)"
  }, createColors("gray", 0, 0, 60)), createColors("grayDark", 0, 0, 40, true)), createColors("grayLight", 0, 0, 80)), createColors("error", 3, 85, LIGHTNESS)), createColors("color1", 248, 89, LIGHTNESS)), createColors("color1Dark", 248, 89, LIGHTNESS, true)), createColors("color2", 50, 100, LIGHTNESS)), createColors("color2Dark", 50, 100, LIGHTNESS, true)), createColors("color3", 150, 55, LIGHTNESS)), createColors("color3Dark", 150, 55, LIGHTNESS, true)), createColors("color4", 200, 79, LIGHTNESS)), createColors("color4Dark", 200, 79, LIGHTNESS, true)),
  space: {
    none: "0px",
    xs: "3px",
    s: "6px",
    m: "8px",
    l: "16px",
    xl: "24px",
    xxl: "48px"
  },
  fontSizes: {
    caption: "12px",
    button: "14px",
    default: "16px",
    body1: "14px",
    body2: "16px",
    subtitle1: "14px",
    subtitle2: "16px",
    h1: "96px",
    h2: "60px",
    h3: "48px",
    h4: "34px",
    h5: "24px",
    h6: "20px",
    s: "14px",
    m: "16px",
    l: "20px",
    xl: "30px"
  },
  fontWeights: {
    thin: "100",
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
    black: "900"
  },
  lineHeights: {
    default: "auto",
    caption: "1.66em",
    button: "1.5em",
    body1: "1.5em",
    body2: "1.43em",
    subtitle1: "1.75em",
    subtitle2: "1.57em",
    h1: "1.16em",
    h2: "1.2em",
    h3: "1.16em",
    h4: "1.12em",
    h5: "1.33em",
    h6: "1.6em"
  },
  zIndices: {
    1: 1,
    2: 10,
    3: 100,
    4: 1e3,
    max: 1e9
  },
  radii: {
    1: "3px",
    2: "5px",
    3: "7px",
    4: "10px",
    round: "50%",
    pill: "100vw"
  },
  shadows: {
    1: "0px 0px 40px 10px hsl(0,0%,20%, 0.1), 0px 0px 20px 5px hsl(0,0%,20%, 0.1), 0px 0px 10px 0px hsl(0,0%,20%, 0.1)",
    s: "0px 0px 2px hsl(260deg 100% 70% / 0.7)",
    m: `0px 0px 2px hsl(0deg 0% 50% / 0.333),
			0px 0px 4px hsl(0deg 0% 50% / 0.333),
			0px 0px 6px hsl(260deg 100% 70% / 0.333)
		`,
    l: `0px 0px 4px hsl(0deg 0% 50% / 0.1),
			0px 0px 8px hsl(0deg 0% 50% / 0.1),
			0px 10px 16px hsl(260deg 100% 70% / 0.1),
			0px 10px 32px hsl(0deg 0% 50% / 0.1),
			0px 10px 48px hsl(0deg 0% 45% / 0.1)
		`,
    xl: `0px 0px 2px hsl(248deg 89% 45% / 0.1),
			 0px 0px 4px hsl(0deg 0% 50% / 0.1),
			 0px 0px 8px hsl(0deg 0% 50% / 0.1),
			 0px 0px 16px hsl(0deg 0% 50% / 0.1),
			 0px 0px 32px hsl(248deg 89% 45% / 0.1),
			 0px 0px 48px hsl(0deg 0% 50% / 0.1),
			 0px 0px 64px hsl(0deg 0% 50% / 0.1),
			 0px 0px 78px hsl(248deg 89% 45% / 0.1)
		`,
    none: "hsl(0,0%,40%) 0px 0px 0px 0px"
  },
  borderWidths: {
    1: "1px",
    2: "2px",
    3: "3px",
    4: "4px"
  },
  sizes: {
    0: "0px",
    1: "6px",
    2: "8px",
    3: "16px",
    4: "32px",
    5: "64px",
    6: "96px",
    7: "128px",
    8: "196px",
    9: "256px"
  },
  fonts: {
    untitled: "Untitled Sans, -apple-system, system-ui, sans-serif",
    mono: "S\xF6hne Mono, menlo, monospace"
  },
  borders: {},
  transitions: {},
  borderStyles: {},
  letterSpacings: {}
};
const THEME_DARK = {
  colors: __spreadValues(__spreadValues({}, createColors("black", 40, 30, 0)), createColors("error", 57, 96, 60))
};
const {
  css,
  styled,
  keyframes,
  globalCss,
  getCssText,
  applyTheme,
  createTheme
} = setup({
  prefix: "q",
  theme: THEME_DEFAULT
});
const darkTheme = createTheme(THEME_DARK);
const defaultTheme = createTheme(THEME_DEFAULT);
function useToggle({
  on: propOn,
  onChange,
  defaultOn = false,
  readOnly = false
} = {}) {
  const [on, setOn] = useState(propOn != null && onChange ? propOn : defaultOn);
  useEffect(() => {
    if (propOn !== null && !onChange) {
      console.warn("on value was provided without an onChange handler");
    }
  }, [propOn, onChange]);
  const toggle = () => {
    !readOnly ? onChange && propOn !== null ? onChange(!on) : setOn(!on) : null;
  };
  const set = (val) => {
    !readOnly ? onChange && propOn !== null ? onChange(val) : setOn(val) : null;
  };
  return {
    on,
    set,
    toggle
  };
}
function mergeRefs(...inputRefs) {
  return (ref) => {
    inputRefs.forEach((inputRef) => {
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
function useScrollLock(lock, options = {
  disableBodyPadding: false
}) {
  const [scrollLocked, setScrollLocked] = useState(lock || false);
  const scrollTop = useRef(0);
  const { disableBodyPadding } = options;
  const stylesheet = useRef(null);
  const lockScroll = () => {
    scrollTop.current = window.scrollY;
    const styles = getLockStyles({ disableBodyPadding });
    const sheet = makeStyleTag();
    injectStyles(sheet, styles);
    insertStyleTag(sheet);
    stylesheet.current = sheet;
  };
  const unlockScroll = () => {
    if (!(stylesheet == null ? void 0 : stylesheet.current))
      return;
    stylesheet.current.parentNode.removeChild(stylesheet.current);
    stylesheet.current = null;
  };
  useEffect(() => {
    if (scrollLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [scrollLocked]);
  useEffect(() => {
    if (lock !== void 0) {
      setScrollLocked(lock);
    }
  }, [lock]);
  useEffect(() => {
    if (lock === void 0 && typeof window !== "undefined") {
      window.document.body.style.overflow === "hidden" && setScrollLocked(true);
    }
  }, [setScrollLocked]);
  return [scrollLocked, setScrollLocked];
}
function getScrollWidth() {
  if (typeof window === "undefined" || typeof document === "undefined")
    return 0;
  const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return paddingRight + scrollbarWidth;
}
const getLockStyles = ({ disableBodyPadding }) => {
  const scrollWidth = disableBodyPadding ? null : getScrollWidth();
  const styles = `body {
          --removed-scroll-width: ${scrollWidth}px;
          touch-action: none;
          overflow: hidden !important;
          position: relative !important;
          ${scrollWidth ? "padding-right: var(--removed-scroll-width) !important;" : ""}
          `;
  return styles;
};
function injectStyles(tag, css2) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css2;
  } else {
    tag.appendChild(document.createTextNode(css2));
  }
}
function insertStyleTag(tag) {
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
function makeStyleTag() {
  const tag = document.createElement("style");
  tag.type = "text/css";
  tag.setAttribute("mantine-scroll-lock", "");
  return tag;
}
function useCreateContext(name, defaultValue) {
  const Context = React.createContext((defaultValue == null ? void 0 : defaultValue()) || defaultValue);
  Context.displayName = name;
  function Provider(_a) {
    var _b = _a, { children, get } = _b, props = __objRest(_b, ["children", "get"]);
    const value = (get == null ? void 0 : get(props)) || __spreadValues({ get }, props);
    return /* @__PURE__ */ React.createElement(Context.Provider, {
      value
    }, children);
  }
  Provider.displayName = name + "_Provider";
  function useContext() {
    var _a;
    const context = React.useContext(Context);
    return (_a = context != null ? context : defaultValue) != null ? _a : console.error("Context value not provided");
  }
  return [Provider, useContext];
}
const createContext = useCreateContext;
const DEFAULT_EVENTS = ["mousedown", "touchstart"];
function useClickOutside(ref, cb, ignore = [], events) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !ignore.some((r) => {
        var _a;
        return ((_a = r == null ? void 0 : r.current) == null ? void 0 : _a.contains(e.target)) || false;
      })) {
        cb == null ? void 0 : cb();
      }
    };
    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));
    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, cb]);
  return;
}
const Slot = forwardRef((props, forwardedRef) => {
  const _a = props, { children } = _a, slotProps = __objRest(_a, ["children"]);
  const childArray = Children.toArray(children);
  if (childArray.some(isSlottable)) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, childArray.map((child) => {
      return isSlottable(child) ? /* @__PURE__ */ React.createElement(SlotClone, __spreadProps(__spreadValues({}, slotProps), {
        ref: forwardedRef
      }), child.props.children) : child;
    }));
  }
  return /* @__PURE__ */ React.createElement(SlotClone, __spreadProps(__spreadValues({}, slotProps), {
    ref: forwardedRef
  }), children);
});
Slot.displayName = "Slot";
const SlotClone = forwardRef((props, forwardedRef) => {
  const _a = props, { children } = _a, slotProps = __objRest(_a, ["children"]);
  if (isValidElement(children)) {
    return cloneElement(children, __spreadProps(__spreadValues({}, mergeProps(slotProps, children.props)), {
      ref: mergeRefs(forwardedRef, children.ref)
    }));
  }
  return Children.count(children) > 1 ? Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
const Slottable = ({ children }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
function isSlottable(child) {
  return isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = __spreadValues({}, childProps);
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      overrideProps[propName] = (...args) => {
        childPropValue == null ? void 0 : childPropValue(...args);
        slotPropValue == null ? void 0 : slotPropValue(...args);
      };
    } else if (propName === "style") {
      overrideProps[propName] = __spreadValues(__spreadValues({}, slotPropValue), childPropValue);
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return __spreadValues(__spreadValues({}, slotProps), overrideProps);
}
const Portal = forwardRef(function(_a, ref) {
  var _b = _a, { containerRef } = _b, props = __objRest(_b, ["containerRef"]);
  var _a2, _b2;
  const hostElement = (_b2 = containerRef == null ? void 0 : containerRef.current) != null ? _b2 : (_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body;
  const [, forceUpdate] = useState({});
  useLayoutEffect(() => {
    forceUpdate({});
  }, []);
  if (hostElement) {
    return ReactDOM.createPortal(/* @__PURE__ */ React.createElement(StyledPortal, __spreadValues({
      ref
    }, props)), hostElement);
  }
  return null;
});
Portal.displayName = "Q-Portal";
const StyledPortal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: $max;
  pointer-event: none;
`;
const VisuallyHidden = forwardRef(function(_c, ref) {
  var _d = _c, { preventEvents = true } = _d, props = __objRest(_d, ["preventEvents"]);
  return /* @__PURE__ */ React.createElement(Container, __spreadValues({
    ref,
    preventEvents,
    ignore: ["preventEvents"]
  }, props));
});
VisuallyHidden.displayName = "Q-VisuallyHidden";
const Container = styled.span`
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 0;

	border: $none;
	padding: $none;
	margin: $none;

	overflow: hidden;
	background-red;

	display: flex;
	align-items: center;
	justify-content: center;

	$props.preventEvents {
		pointer-events: none;
	}
`;
const [AlertProvider, useAlertContext] = useCreateContext("Alert");
const Alert = forwardRef(function({
  open,
  onChange,
  disabled,
  children,
  defaultOpen = false,
  readOnly = false
}, ref) {
  return /* @__PURE__ */ React.createElement(AlertProvider, {
    get: useToggle,
    on: open,
    readOnly: readOnly || disabled,
    onChange,
    defaultOn: defaultOpen
  }, children);
});
Alert.displayName = "Q-Alert";
const AlertTrigger = forwardRef((_e, ref) => {
  var _f = _e, { disabled, onClick } = _f, props = __objRest(_f, ["disabled", "onClick"]);
  const { on, toggle } = useAlertContext();
  return /* @__PURE__ */ React.createElement(Slot, __spreadProps(__spreadValues({
    ref,
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0,
    disabled
  }, props), {
    onClick: (e) => {
      toggle();
      onClick == null ? void 0 : onClick(e);
    }
  }));
});
AlertTrigger.displayName = "Q-AlertTrigger";
const AlertContent = forwardRef((_g, ref) => {
  var props = __objRest(_g, []);
  const overlayRef = useRef(null);
  const { on, toggle } = useAlertContext();
  useClickOutside(overlayRef, on ? toggle : null);
  useScrollLock(on);
  return /* @__PURE__ */ React.createElement(Portal, null, on && /* @__PURE__ */ React.createElement(FocusScope, {
    asChild: true,
    trapped: on,
    loop: true
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    preventEvents: !on,
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0
  }, /* @__PURE__ */ React.createElement(Slot, __spreadValues({
    ref: mergeRefs(overlayRef, ref),
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0
  }, props)))));
});
AlertContent.displayName = "Q-AlertContent";
const Wrapper = styled(VisuallyHidden)`
  background: #00000020;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &[data-closed] {
    width: 0;
    height: 0;
    opacity: 0;

    visibility: hidden;
    pointer-events: none;
  }
`;
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Root: Alert,
  Trigger: AlertTrigger,
  Content: AlertContent
});
const InputBase = forwardRef(function(_h, ref) {
  var _i = _h, {
    size,
    name,
    type,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    tabIndex,
    fullWidth,
    autoFocus,
    autoComplete,
    defaultValue,
    endAdornment,
    error = false,
    hidden = false,
    startAdornment,
    color = "black",
    placeholder = "input"
  } = _i, props = __objRest(_i, [
    "size",
    "name",
    "type",
    "value",
    "variant",
    "disabled",
    "onChange",
    "readOnly",
    "required",
    "tabIndex",
    "fullWidth",
    "autoFocus",
    "autoComplete",
    "defaultValue",
    "endAdornment",
    "error",
    "hidden",
    "startAdornment",
    "color",
    "placeholder"
  ]);
  const ignoreProps = ["hidden", "color", "fullWidth"];
  return /* @__PURE__ */ React.createElement(StyledInput, __spreadValues({
    ref,
    size,
    name,
    type,
    value,
    hidden,
    variant,
    onChange,
    disabled,
    required,
    readOnly,
    "aria-hidden": hidden,
    "aria-invalid": error,
    ignore: ignoreProps,
    autoFocus,
    className: "appearance",
    tabIndex: tabIndex || -1,
    color: "colors." + color,
    placeholder,
    defaultValue,
    autoComplete,
    disableanimationsifdisabled: true
  }, props));
});
InputBase.displayName = "Q-Input";
const StyledInput = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  outline: none;
  border: none;

  $props.hidden {
    pointer-events: none;
    visibility: hidden !important;

    opacity: 0;
    border: none !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;
const Button = forwardRef(function(_j, ref) {
  var _k = _j, {
    href,
    children,
    endIcon,
    startIcon,
    disabled = false,
    color = "black"
  } = _k, props = __objRest(_k, [
    "href",
    "children",
    "endIcon",
    "startIcon",
    "disabled",
    "color"
  ]);
  return /* @__PURE__ */ React.createElement(StyledButton, __spreadValues({
    ref,
    disabled,
    color: "colors." + color,
    as: href ? "a" : "button",
    disableanimationsifdisabled: true,
    ignore: ["fullWidth", "iconOnly", "color"]
  }, props), startIcon && /* @__PURE__ */ React.createElement(IconContainer$3, {
    iconOnly: props.iconOnly,
    ignore: ["iconOnly"]
  }, startIcon), children, endIcon && /* @__PURE__ */ React.createElement(IconContainer$3, {
    variant: "end",
    iconOnly: props.iconOnly,
    ignore: ["iconOnly"]
  }, endIcon));
});
Button.displayName = "Q-Button";
const StyledButton = styled.button`
	--color: $p.color || "$colors.black";
	--focus-color: $p.color ? $p.color + "70" : "$colors.black70";
	--click-color: $p.color ? $p.color + "20" : "$colors.black20";

	border: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	padding: $s $l;
	border-radius: $2;

	min-width: $5;
	height: 33px;
	position: relative;
	align-items: center;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;

	color: $white;
	background-color: var(--color);

	line-height: $button;
	font-size: $button;
	font-weight: $medium;
	text-decoration: none;

	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&[hovered] {
		transform: translateY(-3px);
		transition: transform 0.2s ease;
	}

	&[clicked] {
		background-color: var(--click-color);
	}

	&[focused] {
		box-shadow: var(--focus-color) 0 0 0 2px;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	&[focused-off] {
		box-shadow: $t.colors.transparent 0 0 0 0px;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	$props.size === "s" {
		padding: $xs $s;
		height: 27px;
	}

	$props.size === "l" {
		padding: $m $xl;
		height: 40px;
	}

	$props.iconOnly {
		min-width: auto;
		width: 33px;
		border-radius: $4;
		padding: $none;

		$props.size === "s" {
			width: 27px;
		}

		$props.size === "l" {
			width: 40px;
		}
	}

	$props.fullWidth {
		width: 100%;
	}

	$props.disabled {
		background-color: $gray50;
		color: $gray;
		cursor: not-allowed;
	}

	$props.variant === "outlined" {
		--click-color: "$colors.gray90";

		background-color: $transparent;
		color: var(--color);
		border: 1px solid;
		border-color: var(--color);

		$props.disabled {
			background-color: $transparent;
			color: $gray;
			border: 1px solid $gray;
		}
	}

	$props.variant === "text" {
		--click-color: "$colors.gray90";

		background-color: $transparent;
		color: var(--color);

		$props.disabled {
			background-color: $transparent;
			color: $gray;
		}
	}
`;
const IconContainer$3 = styled.span`
  display: inherit;
  margin-right: $m;

  $props.variant === "end" {
    margin-right: $none;
    margin-left: $m;
  }

  $props.iconOnly {
    margin: $none;
  }
`;
const ChecboxInput = forwardRef(function(_l, ref) {
  var _m = _l, {
    size = "s",
    name,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    autoFocus,
    defaultValue,
    indeterminate = false,
    error = false,
    color = "black"
  } = _m, props = __objRest(_m, [
    "size",
    "name",
    "value",
    "variant",
    "disabled",
    "onChange",
    "readOnly",
    "required",
    "autoFocus",
    "defaultValue",
    "indeterminate",
    "error",
    "color"
  ]);
  const { on: checked, toggle } = useToggle({
    on: value,
    onChange,
    defaultOn: defaultValue,
    readOnly
  });
  return /* @__PURE__ */ React.createElement(SyledButton$2, __spreadValues({
    iconOnly: true,
    ref,
    size,
    type: "button",
    role: "checkbox",
    onClick: (e) => {
      e.stopPropagation();
      toggle();
    },
    color,
    variant,
    disabled,
    disableanimationsifdisabled: true
  }, props), /* @__PURE__ */ React.createElement(InputBase, {
    hidden: true,
    name,
    "aria-hidden": true,
    type: "checbox",
    disabled,
    required,
    readOnly,
    "aria-invalid": error,
    autoFocus,
    defaultValue: checked,
    defaultChecked: checked
  }), /* @__PURE__ */ React.createElement(IconContainer$2, {
    viewBox: "0 0 24 24",
    size
  }, /* @__PURE__ */ React.createElement(IconPath, {
    color: "colors." + color,
    checked,
    variant,
    d: "M4.5 10L10.5 16L24.5 1",
    ignore: ["checked"]
  }), indeterminate && /* @__PURE__ */ React.createElement(IconRect, {
    x: 4,
    y: 11,
    rx: "2",
    ry: "2"
  })));
});
ChecboxInput.displayName = "Q-Checbox";
const SyledButton$2 = styled(Button)`
  padding: $none;

  &[hovered] {
    transform: none;
    box-shadow: 0 0 0 2px var(--focus-color);
    transition: box-shadow 0.2s ease;
  }

  $props.size === "xs" {
    border-radius: $2;
    height: 20px;
    width: 20px;
  }
`;
const IconContainer$2 = styled.svg`
  width: 24px;
  height: 24px;

  $props.size === "s" {
    width: 20px;
    height: 20px;
  }

  $props.size === "xs" {
    width: 18px;
    height: 18px;
  }
`;
const IconPath = styled.path`
  --color: $p.color || "$colors.black";

  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke: $white;
  stroke-dasharray: 16.5px 33px;
  stroke-dashoffset: 17.5px;
  transition: stroke-dashoffset 0.2s ease;

  $props.checked {
    stroke-dashoffset: 46.5px;
  }

  $props.variant === "outlined"||$props.variant === "text" {
    stroke: var(--color);
  }
`;
const IconRect = styled.rect`
  --color: $p.color || "$colors.black";

  fill: $white;
  width: 16px;
  height: 3px;

  $props.variant === "outlined"||$props.variant === "text" {
    fill: var(--color);
  }
`;
const [CollapsibleProvider, useCollapsibleContext] = useCreateContext("Collapsible");
const Collapsible = forwardRef(function(_n, ref) {
  var _o = _n, {
    open,
    onChange,
    disabled,
    defaultOpen,
    readOnly = false
  } = _o, props = __objRest(_o, [
    "open",
    "onChange",
    "disabled",
    "defaultOpen",
    "readOnly"
  ]);
  return /* @__PURE__ */ React.createElement(CollapsibleProvider, {
    get: useToggle,
    on: open,
    readOnly: readOnly || disabled,
    onChange,
    defaultOn: defaultOpen
  }, /* @__PURE__ */ React.createElement("div", __spreadValues({
    ref,
    "data-disabled": disabled ? "" : void 0
  }, props)));
});
Collapsible.displayName = "Q-Collapsible";
const CollapsibleTrigger = forwardRef((_p, ref) => {
  var _q = _p, { disabled, onClick } = _q, props = __objRest(_q, ["disabled", "onClick"]);
  const { on, toggle } = useCollapsibleContext();
  return /* @__PURE__ */ React.createElement("button", __spreadProps(__spreadValues({
    ref,
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0,
    disabled
  }, props), {
    onClick: (e) => {
      toggle();
      onClick == null ? void 0 : onClick(e);
    }
  }));
});
CollapsibleTrigger.displayName = "Q-CollapsibleTrigger";
const CollapsibleContent = forwardRef((_r, ref) => {
  var props = __objRest(_r, []);
  const { on, _ } = useCollapsibleContext();
  const contentRef = useRef(null);
  const heightRef = useRef(0);
  const height = heightRef.current;
  const widthRef = useRef(0);
  const width = widthRef.current;
  useEffect(() => {
    const el = contentRef == null ? void 0 : contentRef.current;
    if (el) {
      heightRef.current = contentRef.current.scrollHeight;
      widthRef.current = contentRef.current.scrollWidth;
    }
  }, []);
  return /* @__PURE__ */ React.createElement(StyledCollapsibleContent, __spreadValues({
    ref: mergeRefs(ref, contentRef),
    width,
    height,
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0
  }, props));
});
CollapsibleContent.displayName = "Q-CollapsibleContent";
const StyledCollapsibleContent = styled.div`
  --width: $p.width + "px" || "0px";
  --height: $p.height + "px" || "0px";

  overflow: hidden;
  will-change: height;
  transition: height 0.2s ease;

  &[data-open] {
    height: var(--height);
  }

  &[data-closed] {
    height: 0px;
  }
`;
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Root: Collapsible,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
});
const Empty = forwardRef(function(_s, ref) {
  var _t = _s, { style, width = "100%", height = "100%" } = _t, props = __objRest(_t, ["style", "width", "height"]);
  return /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({}, props), {
    style: __spreadProps(__spreadValues({}, style), {
      width,
      height
    }),
    ref
  }));
});
Empty.displayName = "Q-Empty";
const Form = forwardRef(function(props, ref) {
  return /* @__PURE__ */ React.createElement(StyledForm, __spreadValues({
    ref
  }, props));
});
Form.displayName = "Q-Form";
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}
function useImageLoadingStatus(src) {
  const [loadingStatus, setLoadingStatus] = useState("idle");
  useEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return;
    }
    let isMounted = true;
    const image = new window.Image();
    const updateStatus = (status) => () => {
      if (!isMounted)
        return;
      setLoadingStatus(status);
    };
    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    image.src = src;
    return () => {
      isMounted = false;
    };
  }, [src]);
  return loadingStatus;
}
const [AvatarProvider, useAvatarContext] = useCreateContext("Avatar");
const ImageContext = forwardRef((props, forwardedRef) => {
  const [loadingStatus, setLoadingStatus] = useState("idle");
  return /* @__PURE__ */ React.createElement(AvatarProvider, {
    loadingStatus,
    setLoadingStatus
  }, /* @__PURE__ */ React.createElement("span", __spreadValues({
    ref: forwardedRef
  }, props)));
});
ImageContext.displayName = "ImageContext";
const Image = forwardRef((_u, forwardedRef) => {
  var _v = _u, { src, onLoadingStatusChange = () => {
  } } = _v, props = __objRest(_v, ["src", "onLoadingStatusChange"]);
  const imageLoadingStatus = useImageLoadingStatus(src);
  const { setLoadingStatus } = useAvatarContext();
  const handleLoadingStatusChange = useCallbackRef((status) => {
    onLoadingStatusChange(status);
  });
  useLayoutEffect(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
      setLoadingStatus(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  return imageLoadingStatus === "loaded" ? /* @__PURE__ */ React.createElement("img", __spreadProps(__spreadValues({}, props), {
    ref: forwardedRef,
    src
  })) : null;
});
Image.displayName = "Image";
const Fallback = forwardRef((_w, forwardedRef) => {
  var _x = _w, { delayMs } = _x, props = __objRest(_x, ["delayMs"]);
  const { loadingStatus } = useAvatarContext();
  return loadingStatus !== "loaded" ? /* @__PURE__ */ React.createElement("span", __spreadProps(__spreadValues({}, props), {
    ref: forwardedRef
  })) : null;
});
Fallback.displayName = "Fallback";
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  ImageContext,
  Image,
  Fallback
});
const Input = forwardRef(function(_y, ref) {
  var _z = _y, {
    size,
    name,
    type,
    value,
    style,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    fullWidth,
    autoFocus,
    className,
    autoComplete,
    defaultValue,
    endAdornment,
    error = false,
    startAdornment,
    color = "black",
    placeholder = "input"
  } = _z, props = __objRest(_z, [
    "size",
    "name",
    "type",
    "value",
    "style",
    "variant",
    "disabled",
    "onChange",
    "readOnly",
    "required",
    "fullWidth",
    "autoFocus",
    "className",
    "autoComplete",
    "defaultValue",
    "endAdornment",
    "error",
    "startAdornment",
    "color",
    "placeholder"
  ]);
  const ignoreProps = ["color", "fullWidth"];
  return /* @__PURE__ */ React.createElement(StyledInputContainer, {
    ref,
    size,
    type: "button",
    role: "input",
    variant,
    disabled,
    "aria-invalid": error,
    ignore: ignoreProps,
    onClick: (e) => {
      e.stopPropagation();
    },
    className,
    fullWidth,
    color: "colors." + color,
    disableanimationsifdisabled: true,
    style
  }, startAdornment, /* @__PURE__ */ React.createElement(StyledBaseInput, __spreadValues({
    size,
    name,
    type,
    value,
    variant,
    onChange,
    disabled,
    required,
    readOnly,
    "aria-invalid": error,
    ignore: ignoreProps,
    autoFocus,
    className: "appearance",
    color: "colors." + color,
    placeholder,
    defaultValue,
    autoComplete,
    disableanimationsifdisabled: true,
    style
  }, props)), endAdornment);
});
Input.displayName = "Q-Input";
const StyledInputContainer = styled.button`
	--color: $p.color || "$colors.black";
	--focus-color: $p.color ? $p.color + "70" : "$colors.black70";

	border: none;
	outline: none;

	height: 33px;
	min-width: $5;
	border-radius: $2;
	background-color: var(--color);

	cursor: text;
	overflow: hidden;
	position: relative;
	align-items: center;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	
	transition: box-shadow 0.2s ease;

	&[hovered] {
		box-shadow: 0 0 0 2px var(--focus-color);
		transition: box-shadow 0.2s ease;
	}

	&:focus-within {
		box-shadow: 0 0 0 2px var(--focus-color);
		transition: box-shadow 0.2s ease;
	}

	$props.size === "s" {
		height: 27px;
	}

	$props.size === "l" {
		height: 40px;
	}

	$props.disabled {
		background-color: $gray30;
		color: $black30;
		cursor: not-allowed;
	}

	$props.fullWidth {
		width: 100%;
	}

	$props.variant === "outlined" {
		background-color: $transparent;
		color: var(--color);
		border: 1px solid;
		border-color: var(--color);

		$props.disabled {
			background-color: $transparent;
			color: $gray;
			border: 1px solid $gray;

		}
	}
`;
const StyledBaseInput = styled(InputBase)`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;

  padding: $m $l;

  color: $white;
  font-size: $button;
  font-weight: $regular;
  line-height: $button;
  text-decoration: none;
  background: $transparent;

  &::placeholder {
    font-weight: $regular;
    color: $gray50;
  }

  $props.size === "s" {
    padding: $xs $s;
  }

  $props.size === "l" {
    padding: $m $xl;
  }

  $props.disabled {
    cursor: not-allowed;
    color: $gray;

    &::placeholder {
      color: $gray;
    }
  }

  $props.variant === "outlined" {
    color: $black;

    &::placeholder {
      color: $gray;
    }
  }
`;
const Label = forwardRef(function(_A, ref) {
  var _B = _A, { id, htmlFor, onClick } = _B, props = __objRest(_B, ["id", "htmlFor", "onClick"]);
  const target = useRef(null);
  useEffect(() => {
    target.current = document.getElementById(htmlFor);
  }, []);
  function handleClick(e) {
    onClick == null ? void 0 : onClick(e);
    if (!target.current || e.defaultPrevented)
      return;
    if (e.isTrusted === true) {
      target.current.click();
      target.current.focus();
    }
  }
  return /* @__PURE__ */ React.createElement(SyledLabel, __spreadValues({
    id,
    ref,
    role: "label",
    onClick: handleClick
  }, props));
});
Label.displayName = "Q-Label";
const SyledLabel = styled.span`
  user-select: none;

  margin-block-end: 0.4em;
  margin-block-start: 0.4em;

  font-size: $button;
  font-weight: $medium;
  line-height: $button;
`;
function useIsInViewport(ref) {
  const [isInViewport, setIsInViewport] = useState(false);
  useEffect(() => {
    if (ref && ref.current) {
      return observeElementInViewport(ref.current, function() {
        setIsInViewport(true);
      }, function() {
        setIsInViewport(false);
      }, {
        viewport: null
      });
    } else {
      return void 0;
    }
  }, [ref]);
  return isInViewport;
}
const [PopperProvider, usePopperContext] = useCreateContext("Alert");
const usePopperScope = createPopperScope();
let openTimeoutID;
const Popper = function({
  open,
  onChange,
  disabled,
  children,
  readOnly = false,
  openDelay = 0,
  closeDelay = 0,
  openOn = "onMouseEnter",
  closeOn = "onMouseLeave"
}) {
  const popperScope = usePopperScope();
  const trigger = useRef(null);
  const [shouldOpen, setShouldOpen] = useState(false);
  const [isTriggerIn, setIsTriggerIn] = useState(false);
  const { on, set } = useToggle({
    open,
    readOnly: readOnly || disabled,
    onChange,
    defaultOpen: false
  });
  useEffect(() => {
    if (shouldOpen && !on) {
      if (openDelay > 0) {
        openTimeoutID = setTimeout(() => {
          set(true);
        }, openDelay);
      } else {
        set(true);
      }
    }
    if (!shouldOpen && on) {
      clearTimeout(openTimeoutID);
      if (closeDelay > 0) {
        setTimeout(() => {
          set(false);
        }, closeDelay);
      } else {
        set(false);
      }
    }
  }, [on, shouldOpen, openDelay, closeDelay]);
  return /* @__PURE__ */ React.createElement(PopperPrimitive.Root, __spreadValues({}, popperScope), /* @__PURE__ */ React.createElement(PopperProvider, {
    on,
    openOn,
    trigger,
    closeOn,
    set: setShouldOpen,
    isTriggerIn,
    setIsTriggerIn
  }, children));
};
Popper.displayName = "Q-Popper";
const PopperTrigger = forwardRef((_C, ref) => {
  var _D = _C, {
    disabled,
    openOn: openOnOverride,
    closeOn: closeOnOverride
  } = _D, props = __objRest(_D, [
    "disabled",
    "openOn",
    "closeOn"
  ]);
  const anchorRef = useRef(null);
  const popperScope = usePopperScope();
  const { set, on, openOn, closeOn, trigger, isTriggerIn, setIsTriggerIn } = usePopperContext();
  const isIn = useIsInViewport(anchorRef);
  useEffect(() => {
    if (isIn !== isTriggerIn) {
      setIsTriggerIn(isIn);
    }
  }, [isIn, isTriggerIn]);
  const memoizedOpen = useMemo(() => openOnOverride ? openOnOverride : openOn, [openOnOverride, openOn]);
  const memoizedClose = useMemo(() => closeOnOverride ? closeOnOverride : closeOn, [closeOnOverride, closeOn]);
  function handleAction(actionName, e) {
    var _a;
    actionName.includes("onContextMenu") && e.preventDefault();
    memoizedOpen.includes(actionName) && !on && set(true);
    memoizedClose.includes(actionName) && on && set(false);
    (_a = props[actionName]) == null ? void 0 : _a.call(props, e);
  }
  useEffect(() => {
    trigger.current = (ref == null ? void 0 : ref.current) || (anchorRef == null ? void 0 : anchorRef.current);
  });
  return /* @__PURE__ */ React.createElement(PopperPrimitive.Anchor, __spreadValues(__spreadProps(__spreadValues({}, popperScope), {
    ref: mergeRefs(ref, anchorRef),
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0,
    onClick: (e) => handleAction("onClick", e),
    onMouseEnter: (e) => handleAction("onMouseEnter", e),
    onMouseLeave: (e) => handleAction("onMouseLeave", e),
    onContextMenu: (e) => handleAction("onContextMenu", e),
    onFocus: (e) => handleAction("onFocus", e),
    onBlur: (e) => handleAction("onBlur", e),
    onKeyDown: (e) => {
      var _a;
      if (memoizedOpen.includes(e.key) || memoizedClose.includes(e.key)) {
        handleAction(e.key, e);
      }
      (_a = props == null ? void 0 : props.onKeyDown) == null ? void 0 : _a.call(props, e);
    }
  }), props));
});
PopperTrigger.displayName = "Q-AlertTrigger";
const PopperContent = forwardRef((_E, ref) => {
  var _F = _E, {
    sideOffset,
    alignOffset,
    side = "bottom",
    align = "center",
    collisionTolerance,
    avoidCollisions = true
  } = _F, props = __objRest(_F, [
    "sideOffset",
    "alignOffset",
    "side",
    "align",
    "collisionTolerance",
    "avoidCollisions"
  ]);
  const containerRef = useRef(null);
  const popperScope = usePopperScope();
  const { on, set, closeOn, trigger, isTriggerIn } = usePopperContext();
  useClickOutside(containerRef, () => {
    closeOn.includes("onOutside") && on ? set(false) : null;
  }, closeOn.includes("onOutside") && on ? [trigger] : [], closeOn.includes("onOutside") && on ? ["click"] : []);
  useScrollLock(on);
  return isTriggerIn && /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement(PopperPrimitive.Content, __spreadValues(__spreadValues({
    asChild: true,
    ref: mergeRefs(ref, containerRef),
    "data-open": on ? "" : void 0,
    "data-closed": !on ? "" : void 0,
    side,
    align,
    sideOffset,
    alignOffset,
    avoidCollisions,
    collisionTolerance
  }, props), popperScope)));
});
PopperContent.displayName = "Q-PopperContent";
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Root: Popper,
  Trigger: PopperTrigger,
  Content: PopperContent
});
const RadioInput = forwardRef(function(_G, ref) {
  var _H = _G, {
    size = "s",
    name,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    autoFocus,
    defaultValue,
    error = false,
    color = "black"
  } = _H, props = __objRest(_H, [
    "size",
    "name",
    "value",
    "variant",
    "disabled",
    "onChange",
    "readOnly",
    "required",
    "autoFocus",
    "defaultValue",
    "error",
    "color"
  ]);
  const { on: checked, toggle } = useToggle({
    on: value,
    onChange,
    defaultOn: defaultValue,
    readOnly
  });
  return /* @__PURE__ */ React.createElement(SyledButton$1, __spreadValues({
    iconOnly: true,
    ref,
    size,
    type: "button",
    role: "radio",
    onClick: (e) => {
      e.stopPropagation();
      toggle();
    },
    color,
    variant,
    disabled,
    disableanimationsifdisabled: true
  }, props), /* @__PURE__ */ React.createElement(InputBase, {
    hidden: true,
    name,
    "aria-hidden": true,
    type: "radio",
    disabled,
    required,
    readOnly,
    "aria-invalid": error,
    autoFocus,
    defaultValue: checked,
    defaultChecked: checked
  }), /* @__PURE__ */ React.createElement(IconContainer$1, {
    viewBox: "0 0 24 24",
    size,
    checked,
    ignore: ["checked"]
  }, /* @__PURE__ */ React.createElement(IconCircle$1, {
    color: "colors." + color,
    checked,
    variant,
    cx: "12",
    cy: "12",
    r: "7",
    ignore: ["checked"]
  })));
});
RadioInput.displayName = "Q-Switch";
const SyledButton$1 = styled(Button)`
  padding: $none;
  border-radius: $round;

  &[hovered] {
    transform: none;
    box-shadow: 0 0 0 2px var(--focus-color);
    transition: box-shadow 0.2s ease;
  }

  $props.size === "xs" {
    height: 20px;
    width: 20px;
  }
`;
const IconContainer$1 = styled.svg`
  width: 29px;
  height: 29px;
  border: none;

  $props.size === "xs" {
    width: 20px;
    height: 20px;
  }

  $props.size === "s" {
    width: 27px;
    height: 27px;
  }
`;
const IconCircle$1 = styled.circle`
  --color: $p.color || "$colors.black";

  transform: scale(0);
  transform-origin: center center;
  transition: transform 0.2s ease;

  $props.checked {
    transform: scale(1);
  }

  stroke-width: 3px;
  fill: $white;
  stroke: $white;

  $props.variant === "outlined"||$props.variant === "text" {
    stroke: var(--color);
    fill: var(--color);
  }
`;
const ScrollArea = forwardRef(function(_I, ref) {
  var _J = _I, { type = "scroll", scrollHideDelay } = _J, props = __objRest(_J, ["type", "scrollHideDelay"]);
  return /* @__PURE__ */ React.createElement(StyledScrollArea, {
    ref,
    type,
    scrollHideDelay
  }, /* @__PURE__ */ React.createElement(ScrollAreaPrimitive.Viewport, __spreadValues({}, props)), /* @__PURE__ */ React.createElement(StyledScrollbar, {
    orientation: "vertical"
  }, /* @__PURE__ */ React.createElement(StyledThumb, null)), /* @__PURE__ */ React.createElement(StyledScrollbar, {
    orientation: "horizontal"
  }, /* @__PURE__ */ React.createElement(StyledThumb, null)), /* @__PURE__ */ React.createElement(StyledCorner, null));
});
ScrollArea.displayName = "Q-ScrollArea";
const StyledScrollArea = styled(ScrollAreaPrimitive.Root)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const StyledThumb = styled(ScrollAreaPrimitive.Thumb)`
  flex: 1;
  background-color: $gray30;
  border-radius: $pill;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44;
    min-height: 44;
  }
`;
const StyledCorner = styled(ScrollAreaPrimitive.Corner)`
  background: $bg1;
`;
const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: $1;
  background: $bg1;
  transition: background 160ms ease-out;

  &:hover {
    background: $bg3;
  }

  &:hover ${StyledThumb} {
    background-color: $gray;
  }

  &[data-orientation="vertical"] {
    width: 10px;
    border-left: 1px solid $gray50;
  }

  &[data-orientation="horizontal"] {
    flexdirection: column;
    height: 10px;
  }
`;
const ORIENTATIONS = ["horizontal", "vertical"];
const Separator = forwardRef(function(_K, ref) {
  var _L = _K, { orientation, color = "gray50" } = _L, props = __objRest(_L, ["orientation", "color"]);
  var _a;
  return /* @__PURE__ */ React.createElement(StyledSeparator, __spreadValues({
    orientation: (_a = ORIENTATIONS == null ? void 0 : ORIENTATIONS[orientation]) != null ? _a : ORIENTATIONS[0],
    color: "colors." + color,
    ref
  }, props));
});
Separator.displayName = "Q-Separator";
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
`;
const SwitchInput = forwardRef(function(_M, ref) {
  var _N = _M, {
    size = "s",
    name,
    value,
    variant,
    disabled,
    onChange,
    readOnly,
    required,
    autoFocus,
    defaultValue,
    error = false,
    color = "black"
  } = _N, props = __objRest(_N, [
    "size",
    "name",
    "value",
    "variant",
    "disabled",
    "onChange",
    "readOnly",
    "required",
    "autoFocus",
    "defaultValue",
    "error",
    "color"
  ]);
  const { on: checked, toggle } = useToggle({
    on: value,
    onChange,
    defaultOn: defaultValue,
    readOnly
  });
  return /* @__PURE__ */ React.createElement(SyledButton, __spreadValues({
    iconOnly: true,
    ref,
    size,
    type: "button",
    role: "switch",
    onClick: (e) => {
      e.stopPropagation();
      toggle();
    },
    color,
    variant,
    disabled,
    disableanimationsifdisabled: true
  }, props), /* @__PURE__ */ React.createElement(InputBase, {
    hidden: true,
    name,
    "aria-hidden": true,
    type: "checbox",
    disabled,
    required,
    readOnly,
    "aria-invalid": error,
    autoFocus,
    defaultValue: checked,
    defaultChecked: checked
  }), /* @__PURE__ */ React.createElement(IconContainer, {
    viewBox: "0 0 24 24",
    size,
    checked,
    ignore: ["checked"]
  }, /* @__PURE__ */ React.createElement(IconCircle, {
    color: "colors." + color,
    checked,
    variant,
    cx: "12",
    cy: "12",
    r: "8",
    ignore: ["checked"]
  })));
});
SwitchInput.displayName = "Q-Switch";
const SyledButton = styled(Button)`
  padding: $none;
  border-radius: $pill;
  width: 49px;
  justify-content: flex-start;

  &[hovered] {
    transform: none;
    box-shadow: 0 0 0 2px var(--focus-color);
    transition: box-shadow 0.2s ease;
  }

  $props.size === "s" {
    width: 38px;
    height: 24px;
  }

  $props.size === "l" {
    width: 60px;
  }

  $props.size === "xs" {
    height: 20px;
    width: 30px;
  }
`;
const IconContainer = styled.svg`
  width: 29px;
  height: 29px;
  border: none;
  transition: transform 0.2s ease;

  $props.checked {
    transform: translateX(18px);
  }

  $props.size === "xs" {
    width: 20px;
    height: 20px;

    $props.checked {
      transform: translateX(10px);
    }
  }

  $props.size === "s" {
    width: 24px;
    height: 24px;

    $props.checked {
      transform: translateX(12px);
    }
  }

  $props.size === "l" {
    width: 39px;
    height: 39px;

    $props.checked {
      transform: translateX(20px);
    }
  }
`;
const IconCircle = styled.circle`
  --color: $p.color || "$colors.black";

  transform: scale(0.7);
  transform-origin: center center;
  transition: transform 0.2s ease;

  $props.checked {
    transform: scale(1);
  }

  stroke-width: 3px;
  fill: $white;
  stroke: $white;

  $props.variant === "outlined"||$props.variant === "text" {
    stroke: var(--color);
    fill: var(--color);
  }
`;
const Typography = forwardRef(function(_O, ref) {
  var _P = _O, { variant = "p", color = "black" } = _P, props = __objRest(_P, ["variant", "color"]);
  return /* @__PURE__ */ React.createElement(StyledTypography, __spreadValues({
    ref,
    as: variant.startsWith("h") && !props.as ? variant : props.as || "p",
    color: "colors." + color,
    variant
  }, props));
});
Typography.displayName = "Q-Typography";
const StyledTypography = styled.p`
  --color: $p.color || "$colors.black";

  font-weight: $regular;
  font-size: $default;
  line-height: $default;
  margin-block-start: 0.4em;
  margin-block-end: 0.4em;

  color: var(--color);

  $props.variant === "h1" {
    font-size: $h1;
    line-height: $h1;
    font-weight: $light;
  }

  $props.variant === "h2" {
    font-size: $h2;
    line-height: $h2;
    font-weight: $light;
  }

  $props.variant === "h3" {
    font-size: $h3;
    line-height: $h3;
    font-weight: $regular;
  }

  $props.variant === "h4" {
    font-size: $h4;
    line-height: $h4;
    font-weight: $regular;
  }

  $props.variant === "h5" {
    font-size: $h5;
    line-height: $h5;
    font-weight: $regular;
  }

  $props.variant === "h6" {
    font-size: $h6;
    line-height: $h6;
    font-weight: $medium;
  }

  $props.variant === "subtitle1" {
    font-size: $subtitle1;
    font-weight: $regular;
    line-height: $subtitle1;
  }

  $props.variant === "subtitle2" {
    font-size: $subtitle2;
    font-weight: $medium;
    line-height: $subtitle2;
  }

  $props.variant === "body1" {
    font-size: $body1;
    line-height: $body1;
    font-weight: $regular;
  }

  $props.variant === "body2" {
    font-size: $body2;
    line-height: $body2;
    font-weight: $regular;
  }

  $props.variant === "button" {
    font-size: $button;
    font-weight: $medium;
    line-height: $button;

    background: $transparent;
    border: none;
  }

  $props.variant === "caption" {
    font-size: $caption;
    font-weight: $regular;
    line-height: $regular;
  }
`;
function getAutoHeightDuration(height) {
  if (!height || typeof height === "string") {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function getElementHeight(el) {
  return (el == null ? void 0 : el.current) ? el.current.scrollHeight : "auto";
}
const raf = typeof window !== "undefined" ? window.requestAnimationFrame : setInterval;
function useCollapse({
  transitionDuration,
  transitionTimingFunction = "ease",
  onTransitionEnd = () => {
  },
  opened
}) {
  const el = useRef(null);
  const collapsedHeight = "0px";
  const collapsedStyles = {
    display: "none",
    height: "0px",
    overflow: "hidden"
  };
  const [styles, setStylesRaw] = useState(opened ? {} : collapsedStyles);
  const setStyles = (newStyles) => {
    flushSync(() => setStylesRaw(newStyles));
  };
  const mergeStyles = (newStyles) => {
    setStyles((oldStyles) => __spreadValues(__spreadValues({}, oldStyles), newStyles));
  };
  function getTransitionStyles(height) {
    const _duration = transitionDuration || getAutoHeightDuration(height);
    return {
      transition: `height ${_duration}ms ${transitionTimingFunction}`
    };
  }
  useDidUpdate(() => {
    if (opened) {
      raf(() => {
        mergeStyles({
          willChange: "height",
          display: "block",
          overflow: "hidden"
        });
        raf(() => {
          const height = getElementHeight(el);
          mergeStyles(__spreadProps(__spreadValues({}, getTransitionStyles(height)), { height }));
        });
      });
    } else {
      raf(() => {
        const height = getElementHeight(el);
        mergeStyles(__spreadProps(__spreadValues({}, getTransitionStyles(height)), {
          willChange: "height",
          height
        }));
        raf(() => mergeStyles({ height: collapsedHeight, overflow: "hidden" }));
      });
    }
  }, [opened]);
  const handleTransitionEnd = (e) => {
    if (e.target !== el.current || e.propertyName !== "height") {
      return;
    }
    if (opened) {
      const height = getElementHeight(el);
      if (height === styles.height) {
        setStyles({});
      } else {
        mergeStyles({ height });
      }
      onTransitionEnd();
    } else if (styles.height === collapsedHeight) {
      setStyles(collapsedStyles);
      onTransitionEnd();
    }
  };
  function getCollapseProps(_a = {}) {
    var _b = _a, {
      style = {},
      refKey = "ref"
    } = _b, rest = __objRest(_b, [
      "style",
      "refKey"
    ]);
    const theirRef = rest[refKey];
    return __spreadProps(__spreadValues({
      "aria-hidden": !opened
    }, rest), {
      ref: useMergedRef(el, theirRef),
      onTransitionEnd: handleTransitionEnd,
      style: __spreadValues(__spreadValues({ boxSizing: "border-box" }, style), styles)
    });
  }
  return getCollapseProps;
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => ref.current = ref(node) || node);
}
function useComposedRefs(...refs) {
  return useCallback(composeRefs(...refs), refs);
}
export { index$3 as Alert, Button, ChecboxInput as Checkbox, index$2 as Collapsible, Empty, Form, index$1 as Image, Input, InputBase, Label, index as Popper, Portal, RadioInput as Radio, ScrollArea, Separator, Slot, SwitchInput as Switch, THEME_DARK, THEME_DEFAULT, Typography, VisuallyHidden, applyTheme, composeRefs, createColors, createContext, createTheme, css, darkTheme, defaultTheme, getCssText, globalCss, keyframes, mergeRefs, styled, useCallbackRef, useClickOutside, useCollapse, useComposedRefs, useCreateContext, useImageLoadingStatus, useIsInViewport, useScrollLock, useToggle };

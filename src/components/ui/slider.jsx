function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
const Slider = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SliderPrimitive.Root, _extends({
  ref: ref,
  className: cn("relative flex w-full touch-none select-none items-center", className)
}, props), /*#__PURE__*/React.createElement(SliderPrimitive.Track, {
  className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
}, /*#__PURE__*/React.createElement(SliderPrimitive.Range, {
  className: "absolute h-full bg-primary"
})), /*#__PURE__*/React.createElement(SliderPrimitive.Thumb, {
  className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
})));
Slider.displayName = SliderPrimitive.Root.displayName;
export { Slider };
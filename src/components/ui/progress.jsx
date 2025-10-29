function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
const Progress = /*#__PURE__*/React.forwardRef(({
  className,
  value,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ProgressPrimitive.Root, _extends({
  ref: ref,
  className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)
}, props), /*#__PURE__*/React.createElement(ProgressPrimitive.Indicator, {
  className: "h-full w-full flex-1 bg-primary transition-all",
  style: {
    transform: `translateX(-${100 - (value || 0)}%)`
  }
})));
Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
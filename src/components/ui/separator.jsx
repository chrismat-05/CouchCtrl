function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
const Separator = /*#__PURE__*/React.forwardRef(({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SeparatorPrimitive.Root, _extends({
  ref: ref,
  decorative: decorative,
  orientation: orientation,
  className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)
}, props)));
Separator.displayName = SeparatorPrimitive.Root.displayName;
export { Separator };
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
const ScrollArea = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Root, _extends({
  ref: ref,
  className: cn("relative overflow-hidden", className)
}, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Viewport, {
  className: "h-full w-full rounded-[inherit]"
}, children), /*#__PURE__*/React.createElement(ScrollBar, null), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Corner, null)));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = /*#__PURE__*/React.forwardRef(({
  className,
  orientation = "vertical",
  ...props
}, ref) => /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaScrollbar, _extends({
  ref: ref,
  orientation: orientation,
  className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className)
}, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, {
  className: "relative flex-1 rounded-full bg-border"
})));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
export { ScrollArea, ScrollBar };
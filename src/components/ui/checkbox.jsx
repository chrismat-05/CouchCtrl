function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
const Checkbox = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(CheckboxPrimitive.Root, _extends({
  ref: ref,
  className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)
}, props), /*#__PURE__*/React.createElement(CheckboxPrimitive.Indicator, {
  className: cn("flex items-center justify-center text-current")
}, /*#__PURE__*/React.createElement(Check, {
  className: "h-4 w-4"
}))));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
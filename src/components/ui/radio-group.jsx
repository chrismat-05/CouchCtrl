function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
const RadioGroup = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(RadioGroupPrimitive.Root, _extends({
    className: cn("grid gap-2", className)
  }, props, {
    ref: ref
  }));
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(RadioGroupPrimitive.Item, _extends({
    ref: ref,
    className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React.createElement(RadioGroupPrimitive.Indicator, {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Circle, {
    className: "h-2.5 w-2.5 fill-current text-current"
  })));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
export { RadioGroup, RadioGroupItem };
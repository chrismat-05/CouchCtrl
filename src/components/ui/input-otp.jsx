function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
const InputOTP = /*#__PURE__*/React.forwardRef(({
  className,
  containerClassName,
  ...props
}, ref) => /*#__PURE__*/React.createElement(OTPInput, _extends({
  ref: ref,
  containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
  className: cn("disabled:cursor-not-allowed", className)
}, props)));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("div", _extends({
  ref: ref,
  className: cn("flex items-center", className)
}, props)));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = /*#__PURE__*/React.forwardRef(({
  index,
  className,
  ...props
}, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const {
    char,
    hasFakeCaret,
    isActive
  } = inputOTPContext.slots[index];
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: cn("relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-2 ring-ring ring-offset-background", className)
  }, props), char, hasFakeCaret && /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-caret-blink h-4 w-px bg-foreground duration-1000"
  })));
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = /*#__PURE__*/React.forwardRef(({
  ...props
}, ref) => /*#__PURE__*/React.createElement("div", _extends({
  ref: ref,
  role: "separator"
}, props), /*#__PURE__*/React.createElement(Dot, null)));
InputOTPSeparator.displayName = "InputOTPSeparator";
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
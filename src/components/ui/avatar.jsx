function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
const Avatar = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AvatarPrimitive.Root, _extends({
  ref: ref,
  className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
}, props)));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AvatarPrimitive.Image, _extends({
  ref: ref,
  className: cn("aspect-square h-full w-full", className)
}, props)));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AvatarPrimitive.Fallback, _extends({
  ref: ref,
  className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
}, props)));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
export { Avatar, AvatarImage, AvatarFallback };
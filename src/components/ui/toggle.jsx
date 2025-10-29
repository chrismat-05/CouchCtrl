function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const toggleVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground", {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-10 px-3",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Toggle = /*#__PURE__*/React.forwardRef(({
  className,
  variant,
  size,
  ...props
}, ref) => /*#__PURE__*/React.createElement(TogglePrimitive.Root, _extends({
  ref: ref,
  className: cn(toggleVariants({
    variant,
    size,
    className
  }))
}, props)));
Toggle.displayName = TogglePrimitive.Root.displayName;
export { Toggle, toggleVariants };
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SheetPrimitive.Overlay, _extends({
  className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
}, props, {
  ref: ref
})));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});
const SheetContent = /*#__PURE__*/React.forwardRef(({
  side = "right",
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SheetPortal, null, /*#__PURE__*/React.createElement(SheetOverlay, null), /*#__PURE__*/React.createElement(SheetPrimitive.Content, _extends({
  ref: ref,
  className: cn(sheetVariants({
    side
  }), className)
}, props), children, /*#__PURE__*/React.createElement(SheetPrimitive.Close, {
  className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
}, /*#__PURE__*/React.createElement(X, {
  className: "h-4 w-4"
}), /*#__PURE__*/React.createElement("span", {
  className: "sr-only"
}, "Close")))));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("flex flex-col space-y-2 text-center sm:text-left", className)
}, props));
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
}, props));
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SheetPrimitive.Title, _extends({
  ref: ref,
  className: cn("text-lg font-semibold text-foreground", className)
}, props)));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(SheetPrimitive.Description, _extends({
  ref: ref,
  className: cn("text-sm text-muted-foreground", className)
}, props)));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
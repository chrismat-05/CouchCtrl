function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DialogPrimitive.Overlay, _extends({
  ref: ref,
  className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
}, props)));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DialogPortal, null, /*#__PURE__*/React.createElement(DialogOverlay, null), /*#__PURE__*/React.createElement(DialogPrimitive.Content, _extends({
  ref: ref,
  className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className)
}, props), children, /*#__PURE__*/React.createElement(DialogPrimitive.Close, {
  className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
}, /*#__PURE__*/React.createElement(X, {
  className: "h-4 w-4"
}), /*#__PURE__*/React.createElement("span", {
  className: "sr-only"
}, "Close")))));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className)
}, props));
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
}, props));
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DialogPrimitive.Title, _extends({
  ref: ref,
  className: cn("text-lg font-semibold leading-none tracking-tight", className)
}, props)));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DialogPrimitive.Description, _extends({
  ref: ref,
  className: cn("text-sm text-muted-foreground", className)
}, props)));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /*#__PURE__*/React.createElement(DrawerPrimitive.Root, _extends({
  shouldScaleBackground: shouldScaleBackground
}, props));
Drawer.displayName = "Drawer";
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
const DrawerOverlay = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DrawerPrimitive.Overlay, _extends({
  ref: ref,
  className: cn("fixed inset-0 z-50 bg-black/80", className)
}, props)));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const DrawerContent = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DrawerPortal, null, /*#__PURE__*/React.createElement(DrawerOverlay, null), /*#__PURE__*/React.createElement(DrawerPrimitive.Content, _extends({
  ref: ref,
  className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className)
}, props), /*#__PURE__*/React.createElement("div", {
  className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
}), children)));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("grid gap-1.5 p-4 text-center sm:text-left", className)
}, props));
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = ({
  className,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: cn("mt-auto flex flex-col gap-2 p-4", className)
}, props));
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DrawerPrimitive.Title, _extends({
  ref: ref,
  className: cn("text-lg font-semibold leading-none tracking-tight", className)
}, props)));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
const DrawerDescription = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DrawerPrimitive.Description, _extends({
  ref: ref,
  className: cn("text-sm text-muted-foreground", className)
}, props)));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
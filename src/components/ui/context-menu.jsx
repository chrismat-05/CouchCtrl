function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
const ContextMenuSubTrigger = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.SubTrigger, _extends({
  ref: ref,
  className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground", inset && "pl-8", className)
}, props), children, /*#__PURE__*/React.createElement(ChevronRight, {
  className: "ml-auto h-4 w-4"
})));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
const ContextMenuSubContent = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.SubContent, _extends({
  ref: ref,
  className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)
}, props)));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
const ContextMenuContent = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.Portal, null, /*#__PURE__*/React.createElement(ContextMenuPrimitive.Content, _extends({
  ref: ref,
  className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)
}, props))));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
const ContextMenuItem = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.Item, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", inset && "pl-8", className)
}, props)));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
const ContextMenuCheckboxItem = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  checked,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.CheckboxItem, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className),
  checked: checked
}, props), /*#__PURE__*/React.createElement("span", {
  className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
}, /*#__PURE__*/React.createElement(ContextMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(Check, {
  className: "h-4 w-4"
}))), children));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
const ContextMenuRadioItem = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.RadioItem, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className)
}, props), /*#__PURE__*/React.createElement("span", {
  className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
}, /*#__PURE__*/React.createElement(ContextMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(Circle, {
  className: "h-2 w-2 fill-current"
}))), children));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
const ContextMenuLabel = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.Label, _extends({
  ref: ref,
  className: cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)
}, props)));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
const ContextMenuSeparator = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(ContextMenuPrimitive.Separator, _extends({
  ref: ref,
  className: cn("-mx-1 my-1 h-px bg-border", className)
}, props)));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
const ContextMenuShortcut = ({
  className,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className)
  }, props));
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup };
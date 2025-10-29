function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSubTrigger = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.SubTrigger, _extends({
  ref: ref,
  className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent", inset && "pl-8", className)
}, props), children, /*#__PURE__*/React.createElement(ChevronRight, {
  className: "ml-auto h-4 w-4"
})));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.SubContent, _extends({
  ref: ref,
  className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)
}, props)));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = /*#__PURE__*/React.forwardRef(({
  className,
  sideOffset = 4,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Portal, null, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Content, _extends({
  ref: ref,
  sideOffset: sideOffset,
  className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)
}, props))));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Item, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", inset && "pl-8", className)
}, props)));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  checked,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.CheckboxItem, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className),
  checked: checked
}, props), /*#__PURE__*/React.createElement("span", {
  className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
}, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(Check, {
  className: "h-4 w-4"
}))), children));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.RadioItem, _extends({
  ref: ref,
  className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className)
}, props), /*#__PURE__*/React.createElement("span", {
  className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
}, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(Circle, {
  className: "h-2 w-2 fill-current"
}))), children));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = /*#__PURE__*/React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Label, _extends({
  ref: ref,
  className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
}, props)));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Separator, _extends({
  ref: ref,
  className: cn("-mx-1 my-1 h-px bg-muted", className)
}, props)));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cn("ml-auto text-xs tracking-widest opacity-60", className)
  }, props));
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup };
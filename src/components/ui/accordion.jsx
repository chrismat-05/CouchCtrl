function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AccordionPrimitive.Item, _extends({
  ref: ref,
  className: cn("border-b", className)
}, props)));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AccordionPrimitive.Header, {
  className: "flex"
}, /*#__PURE__*/React.createElement(AccordionPrimitive.Trigger, _extends({
  ref: ref,
  className: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
}, props), children, /*#__PURE__*/React.createElement(ChevronDown, {
  className: "h-4 w-4 shrink-0 transition-transform duration-200"
}))));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/React.createElement(AccordionPrimitive.Content, _extends({
  ref: ref,
  className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
}, props), /*#__PURE__*/React.createElement("div", {
  className: cn("pb-4 pt-0", className)
}, children)));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
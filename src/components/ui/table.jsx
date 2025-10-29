function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { cn } from "@/lib/utils";
const Table = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("div", {
  className: "relative w-full overflow-auto"
}, /*#__PURE__*/React.createElement("table", _extends({
  ref: ref,
  className: cn("w-full caption-bottom text-sm", className)
}, props))));
Table.displayName = "Table";
const TableHeader = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("thead", _extends({
  ref: ref,
  className: cn("[&_tr]:border-b", className)
}, props)));
TableHeader.displayName = "TableHeader";
const TableBody = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("tbody", _extends({
  ref: ref,
  className: cn("[&_tr:last-child]:border-0", className)
}, props)));
TableBody.displayName = "TableBody";
const TableFooter = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("tfoot", _extends({
  ref: ref,
  className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)
}, props)));
TableFooter.displayName = "TableFooter";
const TableRow = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("tr", _extends({
  ref: ref,
  className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)
}, props)));
TableRow.displayName = "TableRow";
const TableHead = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("th", _extends({
  ref: ref,
  className: cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)
}, props)));
TableHead.displayName = "TableHead";
const TableCell = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("td", _extends({
  ref: ref,
  className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)
}, props)));
TableCell.displayName = "TableCell";
const TableCaption = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/React.createElement("caption", _extends({
  ref: ref,
  className: cn("mt-4 text-sm text-muted-foreground", className)
}, props)));
TableCaption.displayName = "TableCaption";
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
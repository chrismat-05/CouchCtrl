import React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
export function Toaster() {
  const {
    toasts
  } = useToast();
  return /*#__PURE__*/React.createElement(ToastProvider, null, toasts.map(function ({
    id,
    title,
    description,
    action,
    ...props
  }) {
    return /*#__PURE__*/React.createElement(Toast, _extends({
      key: id
    }, props), /*#__PURE__*/React.createElement("div", {
      className: "grid gap-1"
    }, title && /*#__PURE__*/React.createElement(ToastTitle, null, title), description && /*#__PURE__*/React.createElement(ToastDescription, null, description)), action, /*#__PURE__*/React.createElement(ToastClose, null));
  }), /*#__PURE__*/React.createElement(ToastViewport, null));
}
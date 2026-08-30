/* @ds-bundle: {"format":4,"namespace":"YeoulBankDesignSystem_073d1f","components":[{"name":"AmountText","sourcePath":"components/core/AmountText.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Sheet","sourcePath":"components/feedback/Sheet.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"CheckRow","sourcePath":"components/forms/CheckRow.jsx"},{"name":"Keypad","sourcePath":"components/forms/Keypad.jsx"},{"name":"PinDots","sourcePath":"components/forms/PinDots.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"AppBar","sourcePath":"components/navigation/AppBar.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"ListRow","sourcePath":"components/navigation/ListRow.jsx"},{"name":"MenuGrid","sourcePath":"components/navigation/MenuGrid.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/core/AmountText.jsx":"7e9b6185c73a","components/core/Badge.jsx":"efa653e6a2f1","components/core/Button.jsx":"84d5fd21f5c6","components/core/Card.jsx":"b9d4e4bba3c8","components/core/Chip.jsx":"f2306cb038e7","components/core/Divider.jsx":"7ee9df56e515","components/core/Icon.jsx":"bde631afcb44","components/core/IconButton.jsx":"644d34a784bd","components/feedback/Banner.jsx":"40ceddf1b0d2","components/feedback/EmptyState.jsx":"ffc950d02524","components/feedback/Sheet.jsx":"9b21214385c8","components/feedback/Toast.jsx":"8178d6792687","components/forms/CheckRow.jsx":"8893e052c643","components/forms/Keypad.jsx":"539a60e92a25","components/forms/PinDots.jsx":"47c9958ca4d8","components/forms/TextField.jsx":"4d487127516c","components/forms/Toggle.jsx":"d39b1d936a4f","components/navigation/AppBar.jsx":"2736d430322c","components/navigation/BottomNav.jsx":"fd788bd63ae5","components/navigation/ListRow.jsx":"107a9dfd2cc7","components/navigation/MenuGrid.jsx":"c84de2ba1e76","components/navigation/SectionHeader.jsx":"cbf2335497f2","components/navigation/TabBar.jsx":"ac1528c08881","ui_kits/mobile-app/all-menu-screen.js":"f87684505007","ui_kits/mobile-app/app.js":"3b317e0a1185","ui_kits/mobile-app/home-screen.js":"ce7c3ab869c8","ui_kits/mobile-app/login-screen.js":"0d2f2f118d92","ui_kits/mobile-app/phone-frame.js":"c9a8ffeb3b38"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.YeoulBankDesignSystem_073d1f = window.YeoulBankDesignSystem_073d1f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AmountText.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AMT_SIZES = {
  sm: 'var(--fs-amount-sm)',
  md: 'var(--fs-amount)',
  hero: 'var(--fs-amount-hero)'
};
function AmountText({
  value,
  unit = '원',
  size = 'md',
  direction,
  signed = false,
  masked = false,
  style,
  ...rest
}) {
  const DIR = {
    up: 'var(--money-up)',
    down: 'var(--money-down)',
    flat: 'var(--money-flat)'
  };
  const n = typeof value === 'number' ? Math.abs(value).toLocaleString('ko-KR') : value;
  const sign = signed && typeof value === 'number' ? value > 0 ? '+' : value < 0 ? '-' : '' : '';
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "naru-num",
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 'var(--sp-2)',
      fontSize: AMT_SIZES[size],
      fontWeight: 'var(--fw-bold)',
      lineHeight: 'var(--lh-tight)',
      color: direction ? DIR[direction] : 'var(--text-strong)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, masked ? '•••••' : sign + n), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.72em',
      fontWeight: 'var(--fw-semibold)'
    }
  }, unit));
}
Object.assign(__ds_scope, { AmountText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AmountText.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BADGE_TONES = {
  neutral: {
    background: 'var(--ink-100)',
    color: 'var(--ink-600)'
  },
  brand: {
    background: 'var(--surface-brand-soft)',
    color: 'var(--teal-600)'
  },
  accent: {
    background: 'var(--amber-50)',
    color: 'var(--amber-600)'
  },
  success: {
    background: 'var(--success-bg)',
    color: 'var(--success)'
  },
  warning: {
    background: 'var(--warning-bg)',
    color: 'var(--warning)'
  },
  danger: {
    background: 'var(--danger-bg)',
    color: 'var(--danger)'
  },
  info: {
    background: 'var(--info-bg)',
    color: 'var(--info)'
  },
  solid: {
    background: 'var(--action-primary)',
    color: 'var(--text-on-brand)'
  }
};
function Badge({
  tone = 'neutral',
  size = 'md',
  children,
  style,
  ...rest
}) {
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      height: sm ? 20 : 24,
      padding: sm ? '0 6px' : '0 8px',
      borderRadius: 'var(--r-xs)',
      fontSize: sm ? 'var(--fs-micro)' : 'var(--fs-caption)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-body)',
      whiteSpace: 'nowrap',
      ...BADGE_TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BTN_SIZES = {
  sm: {
    height: 34,
    padding: '0 12px',
    fontSize: 'var(--fs-caption)',
    radius: 'var(--r-sm)'
  },
  md: {
    height: 44,
    padding: '0 16px',
    fontSize: 'var(--fs-body-sm)',
    radius: 'var(--r-button)'
  },
  lg: {
    height: 52,
    padding: '0 20px',
    fontSize: 'var(--fs-body-lg)',
    radius: 'var(--r-button)'
  },
  xl: {
    height: 56,
    padding: '0 24px',
    fontSize: 'var(--fs-body-lg)',
    radius: 'var(--r-lg)'
  }
};
const BTN_VARIANTS = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-on-brand)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--action-secondary)',
    color: 'var(--text-strong)',
    border: '1px solid transparent'
  },
  outline: {
    background: 'var(--surface-card)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-default)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-brand)',
    border: '1px solid transparent'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    color: 'var(--text-on-inverse)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--danger)',
    color: '#fff',
    border: '1px solid transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  onClick,
  children,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary;
  const off = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: off,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sp-3)',
      width: block ? '100%' : 'auto',
      minWidth: size === 'sm' ? 0 : 'var(--tap-min)',
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-body)',
      borderRadius: s.radius,
      cursor: off ? 'default' : 'pointer',
      whiteSpace: 'nowrap',
      transition: 'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),opacity var(--dur-fast)',
      transform: pressed && !off ? 'scale(var(--press-scale))' : 'scale(1)',
      ...v,
      ...(off ? {
        background: variant === 'ghost' || variant === 'outline' ? v.background : 'var(--action-disabled)',
        color: 'var(--action-on-disabled)',
        borderColor: variant === 'outline' ? 'var(--border-hairline)' : 'transparent'
      } : null),
      ...(pressed && !off && variant === 'primary' ? {
        background: 'var(--action-primary-press)'
      } : null),
      ...(pressed && !off && (variant === 'secondary' || variant === 'outline') ? {
        background: 'var(--action-secondary-press)'
      } : null),
      ...style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement(Spinner, null) : leadingIcon, /*#__PURE__*/React.createElement("span", null, children), trailingIcon);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      opacity: .7,
      animation: 'naru-spin 700ms linear infinite'
    }
  });
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  padding = 'var(--card-pad)',
  tone = 'card',
  interactive = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const TONES = {
    card: {
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-card)'
    },
    flat: {
      background: 'var(--surface-card)',
      boxShadow: 'none',
      border: '1px solid var(--border-hairline)'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      boxShadow: 'none'
    },
    brand: {
      background: 'var(--surface-brand-soft)',
      boxShadow: 'none'
    },
    accent: {
      background: 'var(--surface-accent-soft)',
      boxShadow: 'none'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      boxShadow: 'none',
      color: 'var(--text-on-inverse)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    role: interactive ? 'button' : undefined,
    onPointerDown: () => interactive && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      borderRadius: 'var(--r-card)',
      padding,
      transition: 'transform var(--dur-fast) var(--ease-standard)',
      transform: pressed ? 'scale(.985)' : 'scale(1)',
      cursor: interactive ? 'pointer' : 'default',
      ...TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  selected = false,
  leadingIcon,
  onClick,
  children,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": selected,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      height: 40,
      padding: '0 16px',
      borderRadius: 'var(--r-chip)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: 'var(--fs-body-sm)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-body)',
      transition: 'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast),color var(--dur-fast)',
      transform: pressed ? 'scale(var(--press-scale))' : 'scale(1)',
      background: selected ? 'var(--surface-inverse)' : 'var(--surface-card)',
      color: selected ? 'var(--text-on-inverse)' : 'var(--text-body)',
      border: selected ? '1px solid var(--surface-inverse)' : '1px solid var(--border-default)',
      ...style
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Divider({
  inset = 0,
  tone = 'hairline',
  thick = false,
  style,
  ...rest
}) {
  const C = {
    hairline: 'var(--border-hairline)',
    default: 'var(--border-default)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      height: thick ? 8 : 1,
      marginLeft: inset,
      background: thick ? 'var(--surface-app)' : C[tone],
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeish = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    "aria-hidden": true,
    className: 'naru-icon icon-' + name,
    style: {
      fontSize: size,
      width: size,
      height: size,
      color,
      fontWeight: strokeish ? 600 : 400,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  label,
  size = 40,
  shape = 'circle',
  tone = 'plain',
  badge = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const TONES = {
    plain: {
      background: 'transparent',
      color: 'var(--text-strong)'
    },
    soft: {
      background: 'var(--ink-100)',
      color: 'var(--text-strong)'
    },
    brand: {
      background: 'var(--surface-brand-soft)',
      color: 'var(--text-brand)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      padding: 0,
      border: 'none',
      cursor: 'pointer',
      borderRadius: shape === 'circle' ? 'var(--r-pill)' : 'var(--r-icon-tile)',
      transition: 'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast)',
      transform: pressed ? 'scale(var(--press-scale))' : 'scale(1)',
      ...TONES[tone],
      ...(pressed && tone === 'plain' ? {
        background: 'var(--overlay-press)'
      } : null),
      ...style
    }
  }, rest), children, badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: size * 0.18,
      right: size * 0.2,
      width: 6,
      height: 6,
      borderRadius: 'var(--r-pill)',
      background: 'var(--danger)'
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Banner({
  tone = 'brand',
  eyebrow,
  title,
  description,
  media,
  action,
  onClick,
  style,
  ...rest
}) {
  const TONES = {
    brand: {
      background: 'var(--surface-brand-soft)',
      color: 'var(--text-strong)'
    },
    accent: {
      background: 'var(--surface-accent-soft)',
      color: 'var(--text-strong)'
    },
    neutral: {
      background: 'var(--ink-100)',
      color: 'var(--text-strong)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)'
    },
    solid: {
      background: 'var(--action-primary)',
      color: 'var(--text-on-brand)'
    }
  };
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    role: onClick ? 'button' : undefined,
    onPointerDown: () => onClick && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-8)',
      padding: 'var(--sp-10) var(--sp-12)',
      borderRadius: 'var(--r-card)',
      cursor: onClick ? 'pointer' : 'default',
      transform: pressed ? 'scale(.99)' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-standard)',
      ...TONES[tone],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'inherit',
      opacity: .62
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-title)',
      lineHeight: 'var(--lh-snug)',
      textWrap: 'pretty'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      opacity: .7
    }
  }, description)), media && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center'
    }
  }, media), action);
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  media,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--sp-6)',
      padding: 'var(--sp-24) var(--gutter)',
      textAlign: 'center',
      ...style
    }
  }, rest), media, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-normal)',
      textWrap: 'pretty'
    }
  }, description), action && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'var(--sp-4)'
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Sheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Sheet({
  open = true,
  title,
  onClose,
  dismissLabel = '닫기',
  secondaryLabel,
  onSecondary,
  footer,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-scrim)',
      animation: 'naru-fade var(--dur-base) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'relative',
      background: 'var(--surface-sheet)',
      borderRadius: 'var(--r-sheet) var(--r-sheet) 0 0',
      boxShadow: 'var(--shadow-sheet)',
      padding: 'var(--sp-10) var(--gutter) var(--sp-8)',
      maxHeight: '86%',
      overflow: 'auto',
      animation: 'naru-sheet-in var(--dur-sheet) var(--ease-decel)',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--sp-8)',
      fontSize: 'var(--fs-title-2)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-title)',
      color: 'var(--text-strong)'
    }
  }, title), children, footer, (onClose || onSecondary) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 'var(--sp-10)',
      marginTop: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSecondary,
    style: {
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      visibility: secondaryLabel ? 'visible' : 'hidden',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, secondaryLabel || '·'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    style: {
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      fontSize: 'var(--fs-body-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-body)'
    }
  }, dismissLabel))));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  open = true,
  message,
  tone = 'inverse',
  icon,
  style,
  ...rest
}) {
  if (!open) return null;
  const TONES = {
    inverse: {
      background: 'rgba(14,20,20,.92)',
      color: '#fff'
    },
    success: {
      background: 'var(--success)',
      color: '#fff'
    },
    danger: {
      background: 'var(--danger)',
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      position: 'absolute',
      left: 'var(--gutter)',
      right: 'var(--gutter)',
      bottom: 'calc(var(--bottomnav-h) + 16px)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-6)',
      padding: 'var(--sp-7) var(--sp-10)',
      borderRadius: 'var(--r-md)',
      zIndex: 60,
      fontSize: 'var(--fs-body-sm)',
      fontWeight: 'var(--fw-medium)',
      animation: 'naru-toast-in var(--dur-base) var(--ease-decel)',
      ...TONES[tone],
      ...style
    }
  }, rest), icon, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/CheckRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CheckRow({
  checked = false,
  onChange,
  children,
  emphasis = false,
  trailing,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: () => onChange && onChange(!checked),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-6)',
      minHeight: 'var(--tap-min)',
      cursor: 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      borderRadius: 'var(--r-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--action-primary)' : 'transparent',
      border: checked ? '1px solid var(--action-primary)' : '1px solid var(--border-strong)',
      transition: 'background var(--dur-fast),border-color var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2l2.4 2.4L9.5 4",
    stroke: checked ? '#fff' : 'var(--ink-300)',
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-body)',
      fontWeight: emphasis ? 'var(--fw-semibold)' : 'var(--fw-regular)'
    }
  }, children), trailing);
}
Object.assign(__ds_scope, { CheckRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CheckRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Keypad.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Keypad({
  onKey,
  shuffle = false,
  variant = 'number',
  style,
  ...rest
}) {
  const digits = React.useMemo(() => {
    const d = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!shuffle) return d;
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }, [shuffle]);
  const keys = [...digits, variant === 'secure' ? '재배열' : '', '0', '⌫'];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      background: 'var(--ink-100)',
      gap: 1,
      ...style
    }
  }, rest), keys.map((k, i) => /*#__PURE__*/React.createElement(KeypadKey, {
    key: i,
    value: k,
    onKey: onKey
  })));
}
function KeypadKey({
  value,
  onKey
}) {
  const [pressed, setPressed] = React.useState(false);
  const empty = value === '';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: empty,
    onClick: () => onKey && onKey(value),
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      height: 58,
      border: 'none',
      cursor: empty ? 'default' : 'pointer',
      background: empty ? 'var(--ink-50)' : pressed ? 'var(--ink-100)' : 'var(--surface-card)',
      fontFamily: 'var(--font-sans)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: value.length > 1 ? 'var(--fs-body-sm)' : 'var(--fs-title-2)',
      fontWeight: value.length > 1 ? 'var(--fw-semibold)' : 'var(--fw-medium)',
      color: value.length > 1 ? 'var(--text-muted)' : 'var(--text-strong)',
      transition: 'background var(--dur-instant)'
    }
  }, value);
}
Object.assign(__ds_scope, { Keypad });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Keypad.jsx", error: String((e && e.message) || e) }); }

// components/forms/PinDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PinDots({
  length = 6,
  filled = 0,
  error = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--sp-10)',
      justifyContent: 'center',
      animation: error ? 'naru-shake 320ms var(--ease-standard)' : 'none',
      ...style
    }
  }, rest), Array.from({
    length
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 14,
      height: 14,
      borderRadius: 'var(--r-pill)',
      background: i < filled ? error ? 'var(--danger)' : 'var(--action-primary)' : 'var(--ink-200)',
      transform: i < filled ? 'scale(1)' : 'scale(.86)',
      transition: 'background var(--dur-fast),transform var(--dur-fast) var(--ease-spring)'
    }
  })));
}
Object.assign(__ds_scope, { PinDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PinDots.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  error,
  suffix,
  prefix,
  type = 'text',
  inputMode,
  disabled = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const border = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-4)',
      height: 52,
      padding: '0 16px',
      background: disabled ? 'var(--ink-50)' : 'var(--surface-card)',
      border: '1px solid ' + border,
      borderRadius: 'var(--r-field)',
      boxShadow: focus ? '0 0 0 3px rgba(11,132,120,.14)' : 'none',
      transition: 'border-color var(--dur-fast),box-shadow var(--dur-fast)'
    }
  }, prefix, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    inputMode: inputMode,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-body)',
      color: 'var(--text-strong)'
    }
  }, rest)), suffix), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toggle({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const W = size === 'sm' ? 44 : 52,
    H = size === 'sm' ? 26 : 30,
    K = H - 6;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-label": label,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-5)',
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: W,
      height: H,
      borderRadius: 'var(--r-pill)',
      flex: 'none',
      background: checked ? 'var(--action-primary)' : 'var(--ink-300)',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? W - K - 3 : 3,
      width: K,
      height: K,
      borderRadius: 'var(--r-pill)',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(14,20,20,.28)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AppBar({
  title,
  leading,
  actions,
  align = 'center',
  transparent = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-4)',
      height: 'var(--appbar-h)',
      padding: '0 8px 0 4px',
      flex: 'none',
      background: transparent ? 'transparent' : 'var(--surface-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: 44,
      justifyContent: 'center',
      flex: 'none'
    }
  }, leading), /*#__PURE__*/React.createElement("h1", {
    style: {
      flex: 1,
      margin: 0,
      textAlign: align,
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-title)',
      color: 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-1)',
      flex: 'none',
      minWidth: 44,
      justifyContent: 'flex-end'
    }
  }, actions));
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BottomNav({
  items = [],
  value,
  onChange,
  floating = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'stretch',
      height: 'var(--bottomnav-h)',
      flex: 'none',
      background: 'var(--surface-card)',
      borderRadius: floating ? 'var(--r-2xl) var(--r-2xl) 0 0' : 0,
      boxShadow: floating ? 'var(--shadow-nav)' : 'none',
      ...style
    }
  }, rest), items.map(it => {
    const on = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--sp-2)',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        color: on ? 'var(--text-strong)' : 'var(--text-subtle)',
        transition: 'color var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 24,
        opacity: on ? 1 : .75,
        strokeWidth: on ? 2.2 : 1.8
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-micro)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)',
        letterSpacing: 'var(--ls-body)'
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ListRow({
  icon,
  title,
  subtitle,
  trailing,
  chevron = false,
  onClick,
  dense = false,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onPointerDown: () => onClick && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-6)',
      minHeight: dense ? 48 : 'var(--row-h)',
      padding: dense ? 'var(--sp-4) 0' : 'var(--sp-6) 0',
      cursor: onClick ? 'pointer' : 'default',
      background: pressed ? 'var(--overlay-press)' : 'transparent',
      transition: 'background var(--dur-instant)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      flex: 'none'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-body)',
      color: 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, subtitle)), trailing, chevron && /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    style: {
      flex: 'none',
      color: 'var(--ink-300)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MenuGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GRID_SHAPES = {
  squircle: '30%',
  circle: 'var(--r-pill)',
  rounded: '22%'
};
function MenuGrid({
  items = [],
  columns = 4,
  size = 44,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + columns + ',1fr)',
      rowGap: 'var(--sp-14)',
      columnGap: 'var(--sp-4)',
      ...style
    }
  }, rest), items.map(it => /*#__PURE__*/React.createElement(MenuGridItem, {
    key: it.id,
    item: it,
    size: size,
    onSelect: onSelect
  })));
}
function MenuGridItem({
  item,
  size,
  onSelect
}) {
  const [pressed, setPressed] = React.useState(false);
  const a = item.accent;
  const b = Math.round(size * 0.46);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onSelect && onSelect(item.id),
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--sp-6)',
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      minWidth: 0,
      transform: pressed ? 'scale(var(--press-scale))' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: 'none',
      borderRadius: GRID_SHAPES[item.shape] || GRID_SHAPES.squircle,
      background: item.bg || 'var(--ink-200)',
      color: item.color || '#fff'
    }
  }, item.icon, a && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -b * 0.3,
      bottom: -b * 0.3,
      width: b,
      height: b,
      borderRadius: 'var(--r-pill)',
      background: a.bg || 'var(--action-primary)',
      color: a.color || '#fff',
      boxShadow: '0 0 0 2.5px var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, a.icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      fontSize: 'var(--fs-caption)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-body)',
      color: 'var(--text-body)',
      textAlign: 'center',
      lineHeight: 'var(--lh-snug)',
      wordBreak: 'normal',
      overflowWrap: 'anywhere'
    }
  }, item.label));
}
Object.assign(__ds_scope, { MenuGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MenuGrid.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeader({
  title,
  action,
  onAction,
  size = 'md',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--sp-6)',
      padding: '0 0 var(--sp-8)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h2", {
    onClick: onAction,
    style: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      cursor: onAction ? 'pointer' : 'default',
      fontSize: size === 'lg' ? 'var(--fs-title-2)' : 'var(--fs-title-3)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-title)',
      color: 'var(--text-strong)'
    }
  }, title, onAction && /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), action && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-muted)',
      cursor: 'pointer'
    }
  }, action));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TabBar({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: variant === 'underline' ? 'var(--sp-12)' : 'var(--sp-4)',
      borderBottom: variant === 'underline' ? '1px solid var(--border-hairline)' : 'none',
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(t.id),
      style: {
        position: 'relative',
        border: 'none',
        background: variant === 'segmented' ? on ? 'var(--surface-inverse)' : 'var(--ink-100)' : 'transparent',
        color: variant === 'segmented' ? on ? 'var(--text-on-inverse)' : 'var(--text-muted)' : on ? 'var(--text-strong)' : 'var(--text-subtle)',
        padding: variant === 'segmented' ? '0 16px' : '0 0 12px',
        height: variant === 'segmented' ? 36 : 'auto',
        borderRadius: variant === 'segmented' ? 'var(--r-pill)' : 0,
        cursor: 'pointer',
        fontSize: 'var(--fs-body-lg)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)',
        letterSpacing: 'var(--ls-title)',
        transition: 'color var(--dur-fast),background var(--dur-fast)'
      }
    }, t.label, variant === 'underline' && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: on ? 'var(--text-strong)' : 'transparent',
        transition: 'background var(--dur-fast)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/all-menu-screen.js
try { (() => {
const DS = () => window.YeoulBankDesignSystem_073d1f || {};
const AppBar = props => React.createElement(DS().AppBar, props, props && props.children);
const IconButton = props => React.createElement(DS().IconButton, props, props && props.children);
const Icon = props => React.createElement(DS().Icon, props, props && props.children);
const TextField = props => React.createElement(DS().TextField, props, props && props.children);
const TabBar = props => React.createElement(DS().TabBar, props, props && props.children);
const SectionHeader = props => React.createElement(DS().SectionHeader, props, props && props.children);
const MenuGrid = props => React.createElement(DS().MenuGrid, props, props && props.children);
const ListRow = props => React.createElement(DS().ListRow, props, props && props.children);
const Card = props => React.createElement(DS().Card, props, props && props.children);
const Divider = props => React.createElement(DS().Divider, props, props && props.children);
const Button = props => React.createElement(DS().Button, props, props && props.children);
const Badge = props => React.createElement(DS().Badge, props, props && props.children);
const Toast = props => React.createElement(DS().Toast, props, props && props.children);
const MENU_TABS = [{
  id: 'bank',
  label: '뱅킹'
}, {
  id: 'product',
  label: '금융상품'
}, {
  id: 'life',
  label: '생활·혜택'
}];
const MENU_DATA = {
  bank: [{
    title: '조회',
    items: [{
      id: 'b1',
      label: '전체계좌조회',
      icon: 'list',
      shape: 'squircle',
      bg: 'var(--obj-blue)'
    }, {
      id: 'b2',
      label: '거래내역조회',
      icon: 'receipt-text',
      shape: 'squircle',
      bg: 'var(--obj-blue-deep)'
    }, {
      id: 'b3',
      label: '해지계좌조회',
      icon: 'archive',
      shape: 'squircle',
      bg: 'var(--obj-violet)'
    }, {
      id: 'b4',
      label: '예금이자조회',
      icon: 'percent',
      shape: 'circle',
      bg: 'var(--obj-amber)'
    }]
  }, {
    title: '이체',
    items: [{
      id: 'b5',
      label: '계좌이체',
      icon: 'arrow-left-right',
      shape: 'squircle',
      bg: 'var(--obj-blue)'
    }, {
      id: 'b6',
      label: '자동이체',
      icon: 'repeat',
      shape: 'circle',
      bg: 'var(--obj-teal)'
    }, {
      id: 'b7',
      label: '대량이체',
      icon: 'layers',
      shape: 'squircle',
      bg: 'var(--obj-violet)'
    }, {
      id: 'b8',
      label: '이체한도변경',
      icon: 'arrow-down-up',
      shape: 'circle',
      bg: 'var(--obj-amber)'
    }]
  }, {
    title: '공과금·세금',
    items: [{
      id: 'b9',
      label: '공과금납부',
      icon: 'receipt',
      shape: 'squircle',
      bg: 'var(--obj-blue-deep)',
      accent: {
        name: 'arrow-right',
        bg: 'var(--ink-800)',
        size: 11
      }
    }, {
      id: 'b10',
      label: '지방세',
      icon: 'landmark',
      shape: 'squircle',
      bg: 'var(--obj-gold)'
    }, {
      id: 'b11',
      label: '대학등록금',
      icon: 'graduation-cap',
      shape: 'squircle',
      bg: 'var(--obj-violet)'
    }, {
      id: 'b12',
      label: '납부내역',
      icon: 'file-clock',
      shape: 'squircle',
      bg: 'var(--obj-blue)'
    }]
  }],
  product: [{
    title: '예금·적금',
    items: [{
      id: 'p1',
      label: '입출금',
      icon: 'arrow-left-right',
      shape: 'squircle',
      bg: 'var(--obj-blue)'
    }, {
      id: 'p2',
      label: '예금',
      icon: 'landmark',
      shape: 'circle',
      bg: 'var(--obj-amber)'
    }, {
      id: 'p3',
      label: '적금',
      icon: 'credit-card',
      shape: 'squircle',
      bg: 'var(--obj-green)',
      accent: {
        name: 'percent',
        bg: 'var(--obj-blue-deep)',
        size: 11
      }
    }, {
      id: 'p4',
      label: '주택청약',
      icon: 'house',
      shape: 'squircle',
      bg: 'var(--obj-violet)'
    }]
  }, {
    title: '투자·대출',
    items: [{
      id: 'p5',
      label: '펀드',
      icon: 'chart-pie',
      shape: 'circle',
      bg: 'var(--obj-violet)'
    }, {
      id: 'p6',
      label: '대출',
      icon: 'wallet',
      shape: 'squircle',
      bg: 'var(--obj-pink)'
    }, {
      id: 'p7',
      label: '외환',
      icon: 'dollar-sign',
      shape: 'circle',
      bg: 'var(--obj-amber)',
      accent: {
        name: 'refresh-cw',
        bg: 'var(--obj-blue-deep)',
        size: 11
      }
    }, {
      id: 'p8',
      label: '퇴직연금',
      icon: 'hand-coins',
      shape: 'circle',
      bg: 'var(--obj-amber)'
    }, {
      id: 'p9',
      label: '신탁',
      icon: 'chart-column',
      shape: 'squircle',
      bg: 'var(--obj-blue)',
      accent: {
        name: 'arrow-up-right',
        bg: 'var(--obj-red)',
        size: 11
      }
    }, {
      id: 'p10',
      label: 'ISA',
      icon: 'shield',
      shape: 'squircle',
      bg: 'var(--obj-violet)'
    }, {
      id: 'p11',
      label: '보험',
      icon: 'heart',
      shape: 'squircle',
      bg: 'var(--obj-red)'
    }, {
      id: 'p12',
      label: '골드/실버바',
      icon: 'gem',
      shape: 'squircle',
      bg: 'var(--obj-gold)'
    }]
  }],
  life: [{
    title: '포인트',
    items: [{
      id: 'l1',
      label: '포인트쌓기',
      icon: 'circle-dollar-sign',
      shape: 'circle',
      bg: 'var(--obj-amber)'
    }, {
      id: 'l2',
      label: '나루룰렛',
      icon: 'disc-3',
      shape: 'circle',
      bg: 'var(--obj-green)'
    }, {
      id: 'l3',
      label: '출석체크',
      icon: 'calendar-check',
      shape: 'squircle',
      bg: 'var(--obj-blue)'
    }, {
      id: 'l4',
      label: '포인트 선물',
      icon: 'gift',
      shape: 'squircle',
      bg: 'var(--obj-pink)'
    }]
  }, {
    title: '생활혜택',
    items: [{
      id: 'l5',
      label: '공동구매',
      icon: 'shopping-basket',
      shape: 'squircle',
      bg: 'var(--obj-red)'
    }, {
      id: 'l6',
      label: '할인쿠폰',
      icon: 'ticket',
      shape: 'squircle',
      bg: 'var(--obj-gold)',
      accent: {
        name: 'percent',
        bg: 'var(--obj-pink)',
        size: 11
      }
    }, {
      id: 'l7',
      label: '페이스페이',
      icon: 'scan-face',
      shape: 'squircle',
      bg: 'var(--obj-blue-deep)'
    }, {
      id: 'l8',
      label: '급여ON',
      icon: 'mail-open',
      shape: 'squircle',
      bg: 'var(--obj-green)',
      accent: {
        name: 'circle-dollar-sign',
        bg: 'var(--obj-amber)',
        size: 12
      }
    }]
  }]
};
const SETTINGS = [{
  id: 's1',
  title: '내 정보 관리',
  sub: '휴대폰번호 · 주소 · 이메일',
  icon: 'user-round'
}, {
  id: 's2',
  title: '인증·보안',
  sub: '간편비밀번호 · 생체인증 · 인증서',
  icon: 'shield-check'
}, {
  id: 's3',
  title: '알림 설정',
  sub: '입출금 알림 · 마케팅 수신',
  icon: 'bell'
}, {
  id: 's4',
  title: '고객센터',
  sub: '1588-0000 · 평일 09:00-18:00',
  icon: 'headset'
}];
function AllMenuScreen({
  onBack,
  big
}) {
  const [tab, setTab] = React.useState('bank');
  const [q, setQ] = React.useState('');
  const [toast, setToast] = React.useState('');
  const groups = MENU_DATA[tab];
  return /*#__PURE__*/React.createElement("div", {
    className: big ? 'naru-bigtext' : undefined,
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    title: "\uC804\uCCB4\uBA54\uB274",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "\uB4A4\uB85C",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 24
    })),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      label: "\uD648",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "house",
      size: 21
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: "\uC124\uC815"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 21
    })))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--gutter) 12px'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    value: q,
    onChange: setQ,
    placeholder: "\uBA54\uB274 \uAC80\uC0C9",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 19,
      color: "var(--ink-400)"
    }),
    style: {
      gap: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(TabBar, {
    value: tab,
    onChange: setTab,
    tabs: MENU_TABS
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: '20px var(--gutter) 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-gap)'
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: g.title
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(MenuGrid, {
    onSelect: id => setToast(g.items.find(i => i.id === id).label + ' 화면으로 이동해요'),
    items: g.items.map(i => ({
      id: i.id,
      label: i.label,
      shape: i.shape,
      bg: i.bg,
      color: i.color,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: i.icon,
        size: 22
      }),
      accent: i.accent ? {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: i.accent.name,
          size: i.accent.size
        }),
        bg: i.accent.bg
      } : undefined
    }))
  })))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uC124\uC815",
    style: {
      paddingTop: 16
    }
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 20px"
  }, SETTINGS.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.id
  }, i > 0 && /*#__PURE__*/React.createElement(Divider, {
    inset: 52
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 22,
      color: "var(--ink-500)"
    }),
    title: s.title,
    subtitle: s.sub,
    chevron: true,
    onClick: () => setToast(s.title + ' 화면으로 이동해요')
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "md",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "log-out",
      size: 18
    }),
    onClick: onBack
  }, "\uB85C\uADF8\uC544\uC6C3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-subtle)'
    }
  }, "\uB098\uB8E8\uBC45\uD06C v6.2.1 \xB7 \uC900\uBC95\uAC10\uC2DC\uC778 \uC2EC\uC758\uD544 2026-0000"))), /*#__PURE__*/React.createElement(Toast, {
    open: !!toast,
    message: toast,
    style: {
      bottom: 24
    }
  }), toast && /*#__PURE__*/React.createElement(MenuToastClear, {
    onDone: () => setToast('')
  }));
}
function MenuToastClear({
  onDone
}) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, []);
  return null;
}
Object.assign(window, {
  AllMenuScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/all-menu-screen.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/app.js
try { (() => {
const DS = () => window.YeoulBankDesignSystem_073d1f || {};
const BottomNav = props => React.createElement(DS().BottomNav, props, props && props.children);
const Icon = props => React.createElement(DS().Icon, props, props && props.children);
const TABS = () => [{
  id: 'home',
  label: '홈',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "house",
    size: 22
  })
}, {
  id: 'products',
  label: '금융상품',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase",
    size: 22
  })
}, {
  id: 'assets',
  label: '내 자산',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "wallet",
    size: 22
  })
}, {
  id: 'points',
  label: '포인트쌓기',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "circle-dollar-sign",
    size: 22
  })
}, {
  id: 'benefits',
  label: '생활혜택',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "gift",
    size: 22
  })
}];
function App() {
  const [screen, setScreen] = React.useState('login');
  const [tab, setTab] = React.useState('home');
  const [big, setBig] = React.useState(false);
  return /*#__PURE__*/React.createElement(PhoneFrame, {
    bg: screen === 'login' ? 'var(--surface-card)' : 'var(--surface-app)'
  }, screen === 'login' && /*#__PURE__*/React.createElement(LoginScreen, {
    onSuccess: () => setScreen('home')
  }), screen === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HomeScreen, {
    big: big,
    setBig: setBig,
    onOpenMenu: () => setScreen('menu')
  }), /*#__PURE__*/React.createElement(BottomNav, {
    items: TABS(),
    value: tab,
    onChange: setTab
  })), screen === 'menu' && /*#__PURE__*/React.createElement(AllMenuScreen, {
    big: big,
    onBack: () => setScreen('home')
  }));
}
if (window.__NARU_KIT) {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/app.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/home-screen.js
try { (() => {
const DS = () => window.YeoulBankDesignSystem_073d1f || {};
const Card = props => React.createElement(DS().Card, props, props && props.children);
const Button = props => React.createElement(DS().Button, props, props && props.children);
const IconButton = props => React.createElement(DS().IconButton, props, props && props.children);
const Badge = props => React.createElement(DS().Badge, props, props && props.children);
const Banner = props => React.createElement(DS().Banner, props, props && props.children);
const AmountText = props => React.createElement(DS().AmountText, props, props && props.children);
const SectionHeader = props => React.createElement(DS().SectionHeader, props, props && props.children);
const MenuGrid = props => React.createElement(DS().MenuGrid, props, props && props.children);
const Toggle = props => React.createElement(DS().Toggle, props, props && props.children);
const Icon = props => React.createElement(DS().Icon, props, props && props.children);
const Sheet = props => React.createElement(DS().Sheet, props, props && props.children);
const Toast = props => React.createElement(DS().Toast, props, props && props.children);
const G = (name, size = 22) => /*#__PURE__*/React.createElement(Icon, {
  name: name,
  size: size
});
const A = (name, bg, size = 11) => ({
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size
  }),
  bg
});
const Won = ({
  size = 22
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: '-.04em'
  }
}, "\u20A9");
const SHORTCUTS = () => [{
  id: '계좌등록',
  label: '계좌등록',
  shape: 'squircle',
  bg: 'var(--obj-violet)',
  icon: G('file-text'),
  accent: A('plus', 'var(--obj-green)', 12)
}, {
  id: '전체계좌',
  label: '전체계좌',
  shape: 'squircle',
  bg: 'var(--obj-blue)',
  icon: G('list')
}, {
  id: '공과금납부',
  label: '공과금납부',
  shape: 'squircle',
  bg: 'var(--obj-blue-deep)',
  icon: G('receipt'),
  accent: A('arrow-right', 'var(--ink-800)', 11)
}, {
  id: '이체한도변경',
  label: '이체한도변경',
  shape: 'circle',
  bg: 'var(--obj-amber)',
  icon: /*#__PURE__*/React.createElement(Won, null),
  accent: A('arrow-down-up', 'var(--obj-blue-deep)', 11)
}, {
  id: '사장님플러스',
  label: '사장님+',
  shape: 'squircle',
  bg: 'var(--obj-teal)',
  icon: G('store'),
  accent: A('plus', 'var(--obj-amber)', 12)
}, {
  id: '룰렛',
  label: '나루룰렛',
  shape: 'circle',
  bg: 'var(--obj-green)',
  icon: G('disc-3')
}, {
  id: '쿠폰몰',
  label: '쿠폰몰',
  shape: 'squircle',
  bg: 'var(--obj-pink)',
  icon: G('ticket'),
  accent: A('percent', 'var(--obj-gold)', 11)
}, {
  id: '메뉴설정',
  label: '메뉴설정',
  shape: 'squircle',
  bg: 'var(--ink-200)',
  color: 'var(--ink-500)',
  icon: G('plus')
}];
function HomeScreen({
  onOpenMenu,
  big,
  setBig
}) {
  const [hidden, setHidden] = React.useState(false);
  const [promo, setPromo] = React.useState(true);
  const [toast, setToast] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    className: big ? 'naru-bigtext' : undefined,
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '4px 12px 8px 20px',
      flex: 'none',
      background: 'var(--surface-app)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--fs-title-3)',
      fontWeight: 800,
      letterSpacing: 'var(--ls-title)',
      color: 'var(--text-strong)'
    }
  }, "\uAE40\uB098\uB8E8\uB2D8"), /*#__PURE__*/React.createElement(Toggle, {
    size: "sm",
    label: "\uD070\uAE00",
    checked: big,
    onChange: setBig
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC9C0\uAC11"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wallet",
    size: 22
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC54C\uB9BC",
    badge: true
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 22
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC804\uCCB4\uBA54\uB274",
    onClick: onOpenMenu
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: '0 var(--gutter) 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-gap)'
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "brand",
    eyebrow: "\uC911\uC694\uD55C \uC77C\uC744 \uAE30\uB2E4\uB9AC\uACE0 \uC788\uB2E4\uBA74?",
    title: "\uC6B4\uC138 \uD655\uC778\uD558\uACE0 \uD3EC\uC778\uD2B8\uB3C4 \uBC1B\uC790\u2606",
    media: /*#__PURE__*/React.createElement(Icon, {
      name: "clover",
      size: 40,
      color: "var(--teal-400)"
    }),
    onClick: () => setToast('오늘의 운세로 이동해요')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title-3)',
      fontWeight: 800,
      color: 'var(--text-strong)',
      letterSpacing: 'var(--ls-title)'
    }
  }, "\uB098\uB8E8\uC740\uD589"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title-3)',
      fontWeight: 700,
      color: 'var(--text-subtle)'
    }
  }, "\uB2E4\uB978\uAE08\uC735")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-pill)',
      background: 'var(--teal-500)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 800,
      letterSpacing: '-.03em'
    }
  }, "\uB098\uB8E8"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "\uB098\uB8E8 \uC8FC\uAC70\uB798\uC6B0\uB300\uD1B5\uC7A5"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "\uB098\uB8E8\uC740\uD589 302-2212-1373-21 ", /*#__PURE__*/React.createElement("u", {
    style: {
      cursor: 'pointer'
    },
    onClick: () => setToast('계좌번호를 복사했어요')
  }, "\uBCF5\uC0AC"))), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uB354\uBCF4\uAE30",
    size: 32
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ellipsis-vertical",
    size: 18,
    color: "var(--ink-400)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '22px 0 20px',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(AmountText, {
    value: 1175776,
    masked: hidden
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setHidden(h => !h),
    style: {
      height: 30,
      padding: '0 12px',
      borderRadius: 'var(--r-pill)',
      flex: 'none',
      border: '1px solid var(--border-default)',
      background: 'transparent',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, hidden ? '보기' : '숨김')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 8
    }
  }, ['ATM출금', '거래내역', '이체'].map(l => /*#__PURE__*/React.createElement(Button, {
    key: l,
    variant: "outline",
    size: "md",
    onClick: () => setToast(l + ' 화면으로 이동해요')
  }, l)))), /*#__PURE__*/React.createElement(Banner, {
    tone: "neutral",
    title: "\uB69C\uB808\uC96C\uB974 x \uC694\uAE30\uC694",
    description: "8/24-8/31 \uD3EC\uC7A5 50%",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "inverse"
    }, "\uBC14\uB85C\uAC00\uAE30"),
    media: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: 'var(--rose-600)',
        letterSpacing: '-.03em'
      }
    }, "50%")
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uC790\uC8FC \uC4F0\uB294 \uBA54\uB274",
    style: {
      paddingTop: 16
    }
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(MenuGrid, {
    onSelect: id => setToast(id + ' 화면으로 이동해요'),
    items: SHORTCUTS()
  })), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uB0B4 \uBAA8\uC784",
    onAction: () => setToast('모임 목록으로 이동해요'),
    style: {
      paddingTop: 16
    }
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--r-icon-tile)',
      background: 'var(--amber-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 20,
    color: "var(--amber-600)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "\uB098\uB8E8 \uAD11\uC6B4\uB300 \uB3D9\uBB38\uD68C"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "16\uBA85")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(AmountText, {
    value: 265000,
    size: "sm"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "\uBAA8\uC784 \uD648")))), /*#__PURE__*/React.createElement(Sheet, {
    open: promo,
    onClose: () => setPromo(false),
    secondaryLabel: "1\uC77C\uB3D9\uC548 \uC548\uBCF4\uAE30",
    onSecondary: () => setPromo(false)
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "\uC624\uB298\uC758 \uD61C\uD0DD"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-title-1)',
      fontWeight: 800,
      letterSpacing: 'var(--ls-title)',
      lineHeight: 1.3,
      color: 'var(--text-strong)'
    }
  }, "\uC694\uC998 \uD56B\uD55C \uC774\uBCA4\uD2B8", /*#__PURE__*/React.createElement("br", null), "\uBCF4\uAE30\uB9CC \uD574\uB3C4 \uD3EC\uC778\uD2B8\uB97C!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-body-sm)',
      fontWeight: 700,
      color: 'var(--text-body)'
    }
  }, "1\uBD84\uC774\uBA74 \uB05D, \uB9E4\uC77C \uC0C8\uB85C\uC6B4 \uD61C\uD0DD")), /*#__PURE__*/React.createElement(Icon, {
    name: "gift",
    size: 64,
    color: "var(--amber-400)"
  }))), /*#__PURE__*/React.createElement(Toast, {
    open: !!toast,
    message: toast
  }), toast && /*#__PURE__*/React.createElement(HomeToastClear, {
    onDone: () => setToast('')
  }));
}
function HomeToastClear({
  onDone
}) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, []);
  return null;
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/home-screen.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/login-screen.js
try { (() => {
const DS = () => window.YeoulBankDesignSystem_073d1f || {};
const Button = props => React.createElement(DS().Button, props, props && props.children);
const IconButton = props => React.createElement(DS().IconButton, props, props && props.children);
const Icon = props => React.createElement(DS().Icon, props, props && props.children);
const Keypad = props => React.createElement(DS().Keypad, props, props && props.children);
const PinDots = props => React.createElement(DS().PinDots, props, props && props.children);
const TabBar = props => React.createElement(DS().TabBar, props, props && props.children);
const Toast = props => React.createElement(DS().Toast, props, props && props.children);
function LoginScreen({
  onSuccess
}) {
  const [mode, setMode] = React.useState('pin');
  const [pin, setPin] = React.useState('');
  const [error, setError] = React.useState(false);
  const [toast, setToast] = React.useState('');
  React.useEffect(() => {
    if (pin.length === 6) {
      const ok = pin === '111111' || true;
      const t = setTimeout(() => {
        if (ok) {
          onSuccess && onSuccess();
        } else {
          setError(true);
          setPin('');
        }
      }, 220);
      return () => clearTimeout(t);
    }
  }, [pin]);
  const key = k => {
    setError(false);
    if (k === '⌫') setPin(p => p.slice(0, -1));else if (k === '재배열') setToast('키패드를 다시 배열했어요');else setPin(p => (p + k).slice(0, 6));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px 0'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "\uB2EB\uAE30"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uACE0\uAC1D\uC13C\uD130"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "headset",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: '-.045em',
      color: 'var(--teal-600)'
    }
  }, "\uB098\uB8E8\uBC45\uD06C")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(TabBar, {
    variant: "segmented",
    value: mode,
    onChange: setMode,
    tabs: [{
      id: 'pin',
      label: '간편비밀번호'
    }, {
      id: 'cert',
      label: '인증서'
    }]
  })), mode === 'pin' ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 26,
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title-3)',
      fontWeight: 700,
      letterSpacing: 'var(--ls-title)',
      color: error ? 'var(--danger)' : 'var(--text-strong)',
      textAlign: 'center'
    }
  }, error ? '비밀번호가 맞지 않아요' : '간편비밀번호 6자리를 입력해주세요'), /*#__PURE__*/React.createElement(PinDots, {
    length: 6,
    filled: pin.length,
    error: error
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setToast('생체인증을 사용할 수 없어요'),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-brand-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fingerprint",
    size: 28,
    color: "var(--teal-600)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, "\uC0DD\uCCB4\uC778\uC99D"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '0 28px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 44,
    color: "var(--ink-300)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title-3)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "\uB098\uB8E8\uC778\uC99D\uC11C\uB85C \uB85C\uADF8\uC778"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-normal)'
    }
  }, "\uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB41C \uC778\uC99D\uC11C\uB85C \uBC14\uB85C \uB85C\uADF8\uC778\uD560 \uC218 \uC788\uC5B4\uC694"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "xl",
    block: true,
    onClick: onSuccess,
    style: {
      marginTop: 8
    }
  }, "\uC778\uC99D\uC11C\uB85C \uB85C\uADF8\uC778")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      padding: '0 20px 16px'
    }
  }, ['비밀번호 재설정', '다른 방법으로 로그인'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    type: "button",
    onClick: () => setToast(l + ' 화면으로 이동해요'),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '8px 0',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, l))), mode === 'pin' && /*#__PURE__*/React.createElement(Keypad, {
    shuffle: true,
    variant: "secure",
    onKey: key
  }), /*#__PURE__*/React.createElement(Toast, {
    open: !!toast,
    message: toast,
    style: {
      bottom: mode === 'pin' ? 260 : 24
    }
  }), toast && /*#__PURE__*/React.createElement(TimedClear, {
    onDone: () => setToast('')
  }));
}
function TimedClear({
  onDone
}) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, []);
  return null;
}
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/login-screen.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/phone-frame.js
try { (() => {
const DS = () => window.YeoulBankDesignSystem_073d1f || {};
const Icon = props => React.createElement(DS().Icon, props, props && props.children);
function StatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : 'var(--ink-900)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 34,
      padding: '0 20px',
      flex: 'none',
      fontSize: 12,
      fontWeight: 700,
      color: c,
      letterSpacing: '-.01em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "1:09"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 13,
    color: c
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "wifi",
    size: 13,
    color: c
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "battery-full",
    size: 15,
    color: c
  })));
}
function PhoneFrame({
  children,
  dark = false,
  bg = 'var(--surface-app)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      height: 780,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: bg,
      borderRadius: 36,
      overflow: 'hidden',
      boxShadow: '0 24px 70px rgba(14,20,20,.24)',
      border: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, children));
}
Object.assign(window, {
  PhoneFrame,
  StatusBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/phone-frame.js", error: String((e && e.message) || e) }); }

__ds_ns.AmountText = __ds_scope.AmountText;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.CheckRow = __ds_scope.CheckRow;

__ds_ns.Keypad = __ds_scope.Keypad;

__ds_ns.PinDots = __ds_scope.PinDots;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.AppBar = __ds_scope.AppBar;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.MenuGrid = __ds_scope.MenuGrid;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.TabBar = __ds_scope.TabBar;

})();

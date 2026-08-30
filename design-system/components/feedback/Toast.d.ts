import type { ReactNode, CSSProperties } from 'react';

/** Transient confirmation docked above the bottom nav. Auto-dismiss after ~2s; never blocks input. */
export interface ToastProps {
  open?: boolean;
  message?: ReactNode;
  tone?: 'inverse' | 'success' | 'danger';
  icon?: ReactNode;
  style?: CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element | null;

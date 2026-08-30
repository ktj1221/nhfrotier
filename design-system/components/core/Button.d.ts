import type { ReactNode, CSSProperties } from 'react';

/**
 * Primary action control. Full-width `xl` primary is the house bottom-CTA.
 */
export interface ButtonProps {
  /** Visual weight. `primary` teal fill, `inverse` near-black fill for promos. */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'danger';
  /** sm 34px · md 44px · lg 52px · xl 56px (bottom CTA) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Stretch to container width. */
  block?: boolean;
  disabled?: boolean;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;

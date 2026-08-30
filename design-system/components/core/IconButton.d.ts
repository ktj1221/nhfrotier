import type { ReactNode, CSSProperties } from 'react';

/** Square-ish tap target wrapping a single glyph — app bar actions, card overflow, nav utilities. */
export interface IconButtonProps {
  /** Accessible name. Required — the glyph carries no text. */
  label: string;
  /** Box size in px. 40 default; never below 40 on touch surfaces. */
  size?: number;
  shape?: 'circle' | 'squircle';
  tone?: 'plain' | 'soft' | 'brand' | 'inverse';
  /** Red unread dot in the top-right. */
  badge?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;

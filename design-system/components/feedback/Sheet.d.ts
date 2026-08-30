import type { ReactNode, CSSProperties } from 'react';

/** Bottom sheet over a dimmed scrim — promos, pickers, confirmations. Positions against the nearest positioned ancestor. */
export interface SheetProps {
  open?: boolean;
  title?: ReactNode;
  /** Fired by the scrim and the right-hand dismiss link. */
  onClose?: () => void;
  /** Right-hand dismiss text. Default 닫기. */
  dismissLabel?: string;
  /** Left-hand secondary link — conventionally "1일동안 안보기" on promo sheets. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** Sticky action area, usually a full-width `Button size="xl"`. */
  footer?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function Sheet(props: SheetProps): JSX.Element | null;

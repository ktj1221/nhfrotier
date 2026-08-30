import type { ReactNode, CSSProperties } from 'react';

/**
 * The primary content container: 20px radius, 20px padding, soft cool shadow, no border.
 */
export interface CardProps {
  /** CSS length. Defaults to `var(--card-pad)` = 20px. Pass 0 for edge-to-edge lists. */
  padding?: string | number;
  tone?: 'card' | 'flat' | 'sunken' | 'brand' | 'accent' | 'inverse';
  /** Adds press feedback and button semantics. */
  interactive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;

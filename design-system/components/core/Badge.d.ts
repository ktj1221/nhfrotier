import type { ReactNode, CSSProperties } from 'react';

/** Small non-interactive status label — D-12, 출금예정, 신규, 최대 8%. */
export interface BadgeProps {
  tone?: 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
  size?: 'sm' | 'md';
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;

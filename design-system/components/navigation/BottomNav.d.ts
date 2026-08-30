import type { ReactNode, CSSProperties } from 'react';

export interface BottomNavItem { id: string; label: string; icon?: ReactNode }

/**
 * Five-slot bottom tab bar with rounded top corners, floating over scrolled content.
 * @startingPoint section="Navigation" subtitle="Five-tab bottom navigation" viewport="360x80"
 */
export interface BottomNavProps {
  /** Exactly five items in the house IA: 홈 · 금융상품 · 내 자산 · 포인트쌓기 · 생활혜택. */
  items?: BottomNavItem[];
  value?: string;
  onChange?: (id: string) => void;
  /** Rounded top corners + upward shadow. Off for docked/opaque contexts. */
  floating?: boolean;
  style?: CSSProperties;
}
export declare function BottomNav(props: BottomNavProps): JSX.Element;

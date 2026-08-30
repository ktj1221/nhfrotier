import type { ReactNode, CSSProperties } from 'react';

export interface MenuGridAccent {
  /** Small white glyph, ~11–12px. */
  icon?: ReactNode;
  /** Badge fill — a saturated hue that contrasts with the parent object. */
  bg?: string;
  /** Glyph colour inside the badge. White by default. */
  color?: string;
}

export interface MenuGridItem {
  id: string;
  label: string;
  /** White glyph (~22px) or a currency character, sitting on the coloured object. */
  icon?: ReactNode;
  /** The object's fill — a saturated object colour from `tokens/colors.css`. */
  bg?: string;
  /** Glyph colour on the object. White by default. */
  color?: string;
  /** Object silhouette. `squircle` cards/documents · `circle` coins/money · `rounded` softer boxes. */
  shape?: 'squircle' | 'circle' | 'rounded';
  /** Overlapping corner badge in a second hue that qualifies the item (% 금리, ↻ 환전, + 가입). */
  accent?: MenuGridAccent;
}

export interface MenuGridProps {
  items?: MenuGridItem[];
  /** 4 on phone; 3 for larger category tiles. */
  columns?: number;
  /** Object edge in px. 44 default. */
  size?: number;
  onSelect?: (id: string) => void;
  style?: CSSProperties;
}
export declare function MenuGrid(props: MenuGridProps): JSX.Element;

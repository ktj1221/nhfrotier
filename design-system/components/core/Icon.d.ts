import type { CSSProperties } from 'react';

/**
 * Lucide web-font glyph. Requires `styles.css` (which imports the Lucide font CSS).
 * Intentional addition: no icon set was supplied with the brief, so this wraps a CDN substitute.
 */
export interface IconProps {
  /** Lucide kebab-case name, e.g. 'house', 'chevron-right', 'circle-dollar-sign'. */
  name: string;
  /** Box size in px. 24 default; 20 inside rows, 26 in menu tiles. */
  size?: number;
  color?: string;
  /** Slightly heavier optical weight for active nav states. */
  strokeish?: boolean;
  style?: CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;

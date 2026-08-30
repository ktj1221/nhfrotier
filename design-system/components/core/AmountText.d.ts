import type { CSSProperties } from 'react';

/** Currency/point figure with tabular figures, ko-KR grouping and a de-emphasised unit suffix. */
export interface AmountTextProps {
  /** Number (formatted with ko-KR grouping) or a pre-formatted string. */
  value: number | string;
  /** Suffix rendered at 72% size. `원` default; use `P`, `%`, or '' for none. */
  unit?: string;
  size?: 'sm' | 'md' | 'hero';
  /** Korean finance convention: up = red, down = blue. Omit for neutral ink. */
  direction?: 'up' | 'down' | 'flat';
  /** Prefix + / − based on sign. */
  signed?: boolean;
  /** Render ••••• for the 숨김 (hide balance) state. */
  masked?: boolean;
  style?: CSSProperties;
}
export declare function AmountText(props: AmountTextProps): JSX.Element;

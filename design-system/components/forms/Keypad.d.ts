import type { CSSProperties } from 'react';

/**
 * Docked 3×4 numeric keypad for PIN and amount entry.
 */
export interface KeypadProps {
  /** Fires with the digit, '⌫', or '재배열'. */
  onKey?: (key: string) => void;
  /** Randomise digit positions — the Korean secure-keypad requirement. */
  shuffle?: boolean;
  /** `secure` adds the 재배열 (reshuffle) key in the bottom-left slot. */
  variant?: 'number' | 'secure';
  style?: CSSProperties;
}
export declare function Keypad(props: KeypadProps): JSX.Element;

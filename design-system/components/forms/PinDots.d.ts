import type { CSSProperties } from 'react';

/** Progress indicator for PIN entry — filled teal dots, red + shake on failure. */
export interface PinDotsProps {
  /** Total digits. 6 for the app PIN. */
  length?: number;
  /** How many are entered. */
  filled?: number;
  error?: boolean;
  style?: CSSProperties;
}
export declare function PinDots(props: PinDotsProps): JSX.Element;

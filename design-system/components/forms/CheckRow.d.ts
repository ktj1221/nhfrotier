import type { ReactNode, CSSProperties } from 'react';

/** Circular checkbox row — the Korean consent-list pattern (약관 동의). */
export interface CheckRowProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Bold the label — used for the "모두 동의" master row. */
  emphasis?: boolean;
  /** Right-side affordance, usually a 보기 chevron opening the terms. */
  trailing?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function CheckRow(props: CheckRowProps): JSX.Element;

import type { ReactNode, CSSProperties } from 'react';

/** Pill-shaped filter/tag control in a horizontally scrolling rail. Selected = near-black fill. */
export interface ChipProps {
  selected?: boolean;
  leadingIcon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}
export declare function Chip(props: ChipProps): JSX.Element;

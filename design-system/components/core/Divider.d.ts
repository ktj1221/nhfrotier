import type { CSSProperties } from 'react';

/** 1px hairline between list rows, or an 8px grey block separating page sections. */
export interface DividerProps {
  /** Left inset in px — align with row text, not the icon. */
  inset?: number;
  tone?: 'hairline' | 'default';
  /** 8px app-grey section break instead of a hairline. */
  thick?: boolean;
  style?: CSSProperties;
}
export declare function Divider(props: DividerProps): JSX.Element;

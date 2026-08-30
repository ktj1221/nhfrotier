import type { ReactNode, CSSProperties } from 'react';

/** 56px screen header: back affordance left, centred bold title, 1–2 icon actions right. */
export interface AppBarProps {
  title?: ReactNode;
  /** Usually a back `IconButton`. Reserves 44px even when empty so the title stays optically centred. */
  leading?: ReactNode;
  /** Right cluster — home, search, cart. */
  actions?: ReactNode;
  align?: 'center' | 'left';
  /** Sit directly on the page background instead of white. */
  transparent?: boolean;
  style?: CSSProperties;
}
export declare function AppBar(props: AppBarProps): JSX.Element;

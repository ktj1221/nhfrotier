import type { CSSProperties } from 'react';

export interface TabBarTab { id: string; label: string }

/** In-page tabs: `underline` for content switching, `segmented` pills for compact filters. */
export interface TabBarProps {
  tabs?: TabBarTab[];
  value?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'segmented';
  style?: CSSProperties;
}
export declare function TabBar(props: TabBarProps): JSX.Element;

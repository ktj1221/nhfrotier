import type { ReactNode, CSSProperties } from 'react';

/** Icon + title + optional subtitle + trailing slot. The workhorse row for menus and mission lists. */
export interface ListRowProps {
  icon?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right-side content — a `Badge`, `Button size="sm"`, or amount. */
  trailing?: ReactNode;
  /** Grey chevron at the far right. Omit when `trailing` is a button. */
  chevron?: boolean;
  /** 48px instead of 56px — for the tight 전체메뉴 lists. */
  dense?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}
export declare function ListRow(props: ListRowProps): JSX.Element;

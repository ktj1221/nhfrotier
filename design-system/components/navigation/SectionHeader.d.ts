import type { ReactNode, CSSProperties } from 'react';

/** Bold section title on the page background, with an optional chevron that drills in. */
export interface SectionHeaderProps {
  title?: ReactNode;
  /** Small grey text on the right (전체보기, 편집). */
  action?: ReactNode;
  /** When set, the title itself becomes tappable and grows a chevron. */
  onAction?: () => void;
  size?: 'md' | 'lg';
  style?: CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;

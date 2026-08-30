import type { ReactNode, CSSProperties } from 'react';

/** Centred placeholder for empty lists and zero-result searches. */
export interface EmptyStateProps {
  /** Illustration or muted glyph. */
  media?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Recovery action, usually a `Button variant="outline"`. */
  action?: ReactNode;
  style?: CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;

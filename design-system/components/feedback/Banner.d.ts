import type { ReactNode, CSSProperties } from 'react';

/** Full-width tinted promo strip: grey eyebrow question, bold hook, artwork on the right. */
export interface BannerProps {
  tone?: 'brand' | 'accent' | 'neutral' | 'inverse' | 'solid';
  /** Small muted setup line — usually a question ("중요한 일을 기다리고 있다면?"). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Right-hand artwork slot — an `<img>` of a 3D illustration. */
  media?: ReactNode;
  /** Right-hand button (바로가기). */
  action?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}
export declare function Banner(props: BannerProps): JSX.Element;

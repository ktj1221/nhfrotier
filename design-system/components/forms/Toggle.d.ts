import type { CSSProperties } from 'react';

/** Pill switch for instant binary settings — 큰글 mode, 자동로그인, push toggles. */
export interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Text rendered to the LEFT of the switch (the 큰글 pattern). */
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: CSSProperties;
}
export declare function Toggle(props: ToggleProps): JSX.Element;

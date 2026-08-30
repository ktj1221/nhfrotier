import type { ReactNode, CSSProperties } from 'react';

/** Single-line text input: 52px tall, 12px radius, teal focus ring. */
export interface TextFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Grey hint under the field. Suppressed while `error` is set. */
  helper?: string;
  /** Red message under the field; also turns the border red. */
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
  /** e.g. 'numeric' for account numbers. */
  inputMode?: string;
  disabled?: boolean;
  style?: CSSProperties;
}
export declare function TextField(props: TextFieldProps): JSX.Element;

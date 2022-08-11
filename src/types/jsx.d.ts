/// <reference types="scriptable-ios" />

declare namespace JSX {
  type JSXColor = Color | string | number;
  type Align = "left" | "right" | "center";
  type ContentAlign = "top" | "bottom" | "center";
  type DateStyle = "time" | "date" | "relative" | "offset" | "timer";

  interface Alienable {
    align?: Align;
  }

  interface ContentAlienable {
    align?: ContentAlign;
  }

  interface PaddingProps {
    'p-all'?: number;

    'p-x'?: number;
    'p-y'?: number;

    'p-top'?: number;
    'p-bottom'?: number;
    'p-right'?: number;
    'p-left'?: number;
  }

  interface WidgetAndStackBase extends PaddingProps {
    spacing?: number;
    backgroundColor?: JSXColor;
    backgroundImage?: Image;
    backgroundGradient?: LinearGradient;
    url?: string;
  }

  interface StackProps extends WidgetAndStackBase, ContentAlienable {
    layout?: "vertical" | "horizontal";
    size?: Size;
    cornerRadius?: number;
    borderWidth?: number;
    borderColor?: JSXColor;
  }

  interface WidgetProps extends WidgetAndStackBase {
    refreshAfterDate?: Date;
  }

  interface SpacerProps {
    length?: number;
  }

  interface TextProps extends Alienable {
    font?: Font;
    color?: JSXColor;
    opacity?: number;
    lineLimit?: number;
    minimumScaleFactor?: number;
    shadowColor?: JSXColor;
    shadowOffset?: Point;
    shadowRadius?: number;
    url?: string;
  }

  type ImageContentMode = "fitting" | "filling";

  interface ImageCommonProps extends Alienable {
    size?: Size;
    cornerRadius?: number;
    resizable?: boolean;
    opacity?: number;
    borderColor?: JSXColor;
    borderWidth?: number;
    containerRelativeShape?: boolean;
    tintColor?: JSXColor;
    url?: string;
    contentMode?: ImageContentMode;
  }

  type ImageProps =
    & ImageCommonProps
    & ({ data: Data } | { fileURL: string } | { image: Image });

  interface DateProps extends TextProps {
    date: Date | string | number;
    style?: DateStyle;
  }

  interface IntrinsicElements {
    widget: WidgetProps;
    stack: StackProps;
    image: ImageProps;
    spacer: SpacerProps;
    text: TextProps;
    date: DateProps;
  }
}

type WidgetFamily = 'small' | 'medium' | 'large' | 'extraLarge';

import { style as customStyle } from './merge-style-custom.css';
import { style as defaultStyle, mergeStyle } from './merge-style-default.css';

const mergedStyle = mergeStyle(customStyle);

__export__ = {
  customStyle,
  defaultStyle,
  mergedStyle
};

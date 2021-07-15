import { style as customStyle } from './custom-style.css';
import { style as defaultStyle, mergeStyle } from './default-style.css';

const mergedStyle = mergeStyle(customStyle);

__export__ = {
  customStyle,
  defaultStyle,
  mergedStyle
};

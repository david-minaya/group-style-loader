import { getOptions, stringifyRequest } from 'loader-utils';
import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    separator: {
      type: 'string'
    }
  },
  additionalProperties: false
};

function pitch(request) {

  const options = getOptions(this);
  
  validate(schema, options, { name: 'group-style' });

  const { separator = '_' } = options;

  if (!/[a-zA-Z0-9-_]+/.test(separator)) {
    throw Error('Invalid separator. The separator only can contain letters, numbers, hyphens and underscore')
  }

  return `
    const module = require(${stringifyRequest(this, "!!" + request)});

    ${groupStyle.toString()}
    ${merge.toString()}

    export const style = groupStyle(module.default, '${separator}');
    export const mergeStyle = merge(style);
  `;
};

function groupStyle(style, separator) {

  const regexp = new RegExp(`([\\w-]+?)${separator}([\\w-]+)`);
  const groupStyle = {};

  for (const key in style) {

    if (regexp.test(key)) {

      const [, groupKey, propKey] = key.split(regexp);

      groupStyle[groupKey] = {
        ...groupStyle[groupKey],
        [propKey]: style[key]
      };

    } else {

      groupStyle[key] = style[key];
    }
  }

  return groupStyle;
}

function merge(defaultStyle) {

  return (style) => {

    const mergeStyle = { ...defaultStyle }
  
    for (const key in style) {
      if (mergeStyle.hasOwnProperty(key)) {
        mergeStyle[key] = defaultStyle[key] +' '+ style[key];
      }
    }
  
    return mergeStyle;
  }
}

module.exports.pitch = pitch;

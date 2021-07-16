# Group style loader

[![npm][npm-badge]][npm-url]

[npm-badge]: https://img.shields.io/npm/v/group-style-loader?color=%23C53635
[npm-url]: https://npmjs.com/package/group-style-loader

Group the styles exported by CSS Modules.

This loader is similar to [style-loader](https://www.npmjs.com/package/style-loader), with the difference that this loader uses a **separator** to create a style object with a nested structure. This is useful when you need to pass the style object through different components

<table>
  <tr>
    <th>CSS</th>
    <th>style-loader</th>
    <th>group-style-loader</th>
  </tr>
  <tr>
    <td>

```css
.title {
  color: red;
  background-color: aliceblue;
}

.card_title {
  font-size: 20px;
  font-weight: bold;
  margin: 8px;
}

.card_description {
  font-size: 16px;
}
```

  </td>
  <td>

```js
{
  title: "H1gmd-YoFw3",
  card_title: "TY8bsmUprZg",
  card_description: "_1F1As1EzYDx2"
}









```

  </td>
    <td>

```js
{
  title: "H1gmd-YoFw3",
  card: {
    title: "TY8bZgXKrzF",
    description: "_1F1Asx2j3vYV"
  }
}







```

  </td>
  </tr>
</table>


## Getting Started

1. **Install the loader from npm.**

    ```console
    npm install --save-dev group-style-loader
    ```

    This loader must be used in conjunction with a CSS loader like [style-loader](https://www.npmjs.com/package/style-loader) or [mini-css-extract-plugin](https://www.npmjs.com/package/style-loader).

2. **Setup the loader in the webpack config file.**

    **webpack.config.js**

    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['group-style-loader', 'style-loader', 'css-loader']
          }
        ]
      }
    };
    ```
    
## Options

Name | Type | Default | Description
:-----|:------|:---------:|:------------
**separator** | `string` | `_` | Separator used to create a style object with a nested structure.

### separator

Separator used to create a style object with a nested structure.

The separator only can contain letters, numbers, hyphens, and underscore. You can use whatever separator that matches with this pattern `/[a-zA-Z0-9-_]+/`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'group-style-loader',
            options: {
              separator: '_GROUP_'
            }
          }, 
          'style-loader', 
          'css-loader'
        ]
      }
    ]
  }
};
```

**style.css**

```css
.title {
  color: red;
  background-color: aliceblue;
}

.card_GROUP_title {
  font-size: 20px;
  font-weight: bold;
  margin: 8px;
}

.card_GROUP_description {
  font-size: 16px;
}
```

**module.js**

```js
{
  title: "H1gmd-YoFw3",
  card: {
    title: "TY8bZgXKrzF",
    description: "_1F1Asx2j3vYV"
  }
}
```

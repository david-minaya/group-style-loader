# Group style loader

[![npm][npm-badge]][npm-url]

[npm-badge]: https://img.shields.io/npm/v/group-style-loader
[npm-url]: https://npmjs.com/package/group-style-loader

Group the styles exported by CSS Modules.

This loader is similar to [style-loader](https://www.npmjs.com/package/style-loader), with the difference that this loader uses a **separator** to create a style object that can contain other style objects. This is useful when you need to pass the style through different components.

With this loader, you can work with CSS module just like you do with normal CSS, but without losing encapsulation.

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;style.css</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;style-loader</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;group-style-loader</th>
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

.card_summary {
  font-size: 16px;
}

```

</td>
<td>

```js
import style from './style.css'

console.log(style);

/*

{
  title: "title-H1g",
  card_title: "card_title-TY8",
  card_summary: "card_summary-1F1"
}



*/
```

</td>
<td>

```js
import { style } from './style.css'

console.log(style);

/*

{
  title: "title-H1g",
  card: {
    title: "card_title-TY8",
    summary: "card_summary-1F1"
  }
}

*/
```

</td>
</tr>
</table>


## Getting Started

1. **Install the loader from npm**

    ```console
    npm install --save-dev group-style-loader
    ```

    This loader must be used in conjunction with a CSS loader like [style-loader](https://www.npmjs.com/package/style-loader) or [mini-css-extract-plugin](https://www.npmjs.com/package/style-loader).

2. **Setup the loader**

    <table>
    <tr>
    <th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;webpack.config.js</th>
    <th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;app.css</th>
    <th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;app.jsx</th>
    </tr>
    <tr>
    <td>

    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              'group-style-loader', 
              'style-loader', 
              {
                loader: "css-loader",
                options: {
                  modules: true
                }
              }
            ]
          }
        ]
      }
    };
    ```

    </td>
    <td>

    ```css
    .title {
      color: red;
      background-color: gray;
    }

    .card_title {
      font-size: 20px;
      font-weight: bold;
      margin: 8px;
    }

    .card_summary {
      font-size: 16px;
    }





    ```

    </td>
    <td>

    ```js
    import React from 'react';
    import { Card } from './card';
    import { style } from './app.css';

    export function App() {
      return (
        <div>
          <h1 className={style.title}>
            Group style loader
          </h1>         
          <Card style={style.card}/>
        </div>
      );
    }
      
      
      
      

    ```

    </td>
    </tr>
    </table>
    
## Options

Name              | Type     | Default   | Description
:-----------------|:---------|:---------:|:------------
**separator**     | `string` | `_`       | The separator used to group the CSS classes into a nested style object.

### separator

With this option, you can change the default separator used to group the CSS classes. The default separator is `_`. The separator only can contain letters, numbers, hyphens, and underscore. You can use whatever separator that matches with this pattern `/[a-zA-Z0-9-_]+/`.

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;webpack.config.js</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;style.css</th>
</tr>
<tr>
<td>

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
          }
          // ...
        ]
      }
    ]
  }
};
```

</td>
<td>

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

.card_GROUP_summary {
  font-size: 16px;
}




```

</td>
</tr>
</table>

## Basic usage

When you import a CSS file using the `group-style-loader`, you going to get a `style` object that contains the names of all the CSS classes, and also a function, called `mergeStyle`, with which you can merge the current style object with other style objects.

```js
import { style, mergeStyle } from './app.css';
```

A `style` object is an object that contains the names of the CSS classes and also contains other `style` objects. This is useful when you are working with components libraries like **React**, because this way, you can pass the styles to other components in one simple way. 

Using the `style` object in conjunction with the `mergeStyle` function you can override easily the style of the child components, like in the next example.

**App component**

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;app.css</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;app.jsx</th>
</tr>
<tr>
<td>

```css
.title {
  font-size: 32px;
  font-weight: bold;                
  margin: 44px;
}

.list {
  display: flex;
}

.card_title {
  color: blue;
}

.card_summary {
  color: green;
}
```

</td>
<td>

```jsx
import React from 'react';
import { Card } from './card';
import { style } from './app.css';

export function App() {
  return (
    <div>
      <h1 className={style.title}>Group style</h1>         
      <div className={style.list}>
        <Card/>
        <Card customStyle={style.card}/>
      </div>
    </div>
  );
}


```

</td>
</tr>
</table>

**Card component**

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;card.css</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;card.jsx</th>
</tr>
<tr>
<td>

```css
.container {
  width: 300px;
  height: 400px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 2px 6px lightgray;
  margin: 40px;
  padding: 16px;
}

.title {
  font-weight: bold;
  font-size: 24px;
}

.summary {
  margin-top: 24px;
  font-size: 20px;
}

.summary:hover {
  background-color: aliceblue;
}
```

</td>
<td>

```jsx
import React from 'react';
import { mergeStyle } from './card.css';

export function Card({ customStyle }) {

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <div className={style.title}>Title</div>
      <div className={style.summary}>
        Lorem ipsum dolor sit amet, consectetur            
        adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna.
      </div>
    </div>
  )
}





```

</td>
</tr>
</table>

> In this example we have two `Card` components, we are using the first with its default style, and the second with a custom style. In the second we are passing the custom style through the `customStyle` property and merging it with the default style of the component using the `mergeStyle` function. This is an easy way of overriding the style of the components.

## Merge the style

Using the `mergeStyle` function you can merge the current style object with another style object. In this way, for example, you can override the style of a component, like in the Card component of the above example.

The working of the `mergeStyle` function is simple, this function merges the properties with the same name of the style objects, concatenating the values of the current style object with the values of another style object.

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;default.css</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;index.js</th>
</tr>
<tr>
<td>

```css
.title {
  color: red
}

.summary {
  background-color: black;
}

.button {
  width: 200px
}

```

</td>
<td rowspan="3">

```js
import defaultStyle from './default.css';
import customStyle from './custom.css';

const mergedStyle = defaultStyle.mergeStyle(customStyle.style);

console.log('defaultStyle: ', defaultStyle.style);
console.log('customStyle: ', customStyle.style);
console.log('mergedStyle: ', mergedStyle);

/*

defaultStyle                            mergedStyle
                                      
{                                       {                                
  title: 'default-title',                 title: 'default-title custom-title',
  summary: 'default-summary',             summary: 'default-summary custom-summary',
  button: 'default-button'                button: 'default-button custom-button'
}                                       }                                

customStyle

{
  title: 'custom-title',
  summary: 'custom-summary',
  button: 'custom-button'
}

*/

```

</td>
</tr>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;custom.css</th>
</tr>
<tr>
<td>
  
```css
.title {
  color: red
}

.summary {
  background-color: black;
}

.button {
  width: 200px
}

```

</td>
</tr>
</table>

## Order of the styles

Pay attention to the order of import of the styles. In the previous examples, the style of the App component is imported after the import of the Card component. This is important to can overriding the style of children components. If you import the style of the parent component before of to import the children's components, it is possible that the style of the child components doesn't be overridden.

<table>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;❌ &nbsp;Wrong</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;✔️ &nbsp;Well</th>
</tr>
<tr>
<td>

```js
import React from 'react';
import { style } from './app.css';
import { Card } from './card';
import { Clock } from './clock';

export function App() {
  return (
    <div>
      <h1 className={style.title}>
        Group style loader
      </h1>         
      <div className={style.list}>
        <Card customStyle={style.card}/>
        <Clock customStyle={style.clock}/>
      </div>
    </div>
  );
}
```

</td>
<td>

```js
import React from 'react';
import { Card } from './card';
import { Clock } from './clock';
import { style } from './app.css';

export function App() {
  return (
    <div>
      <h1 className={style.title}>
        Group style loader
      </h1>         
      <div className={style.list}>
        <Card customStyle={style.card}/>
        <Clock customStyle={style.clock}/>
      </div>
    </div>
  );
}
```

</td>
</tr>
<tr>
<td>Is possible that the style of the children components doesn't be overridden.</td>
<td>The style of the children components going to be overridden successfully.</td>
</tr>
</table>

## Use with CSSTransition

This loader is useful when you are working with CSSTransition together with CSS module. With this loader, you can pass the animation classes on a single line.

<table>
<tr>
<th align='left' colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;style.css</th>
</tr>
<tr>
<td colspan="2">


```css
.animation_enter {
  opacity: 0;
}

.animation_enterActive {
  opacity: 1;
  transition: opacity 200ms;
}

.animation_exit {
  opacity: 1;
}

.animation_exitActive {
  opacity: 0;
  transition: opacity 200ms;
}
```

</td>
</tr>
<tr>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;CSSTransition</th>
<th align='left'>&nbsp;&nbsp;&nbsp;&nbsp;CSSTransition with group-style-loader</th>
</tr>
<tr>
<td>

```js 
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { style } from './style.css';

export function App() {

  const [enable, setEnable] = useState(false);
  
  return (
    <div>
      <CSSTransition 
        in={enable} 
        timeout={200} 
        classNames={{
          enter: style.animation_enter,
          enterActive: style.animation_enterActive,
          exit: style.animation_exit,
          exitActive: style.animation_exitActive
        }}>
        <div>Element with animation</div>
      </CSSTransition>
      <button 
        type="button" 
        onClick={() => setEnable(true)}>
        Click to Enter
      </button>
    </div>
  );
}
```

</td>
<td>

```js 
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { style } from './style.css';

export function App() {

  const [enable, setEnable] = useState(false);
  
  return (
    <div>
      <CSSTransition 
        in={enable} 
        timeout={200} 
        classNames={style.animation}>
        <div>Element with animation</div>
      </CSSTransition>
      <button 
        type="button" 
        onClick={() => setEnable(true)}>
        Click to Enter
      </button>
    </div>
  );
}





```

</td>
</tr>
</table>
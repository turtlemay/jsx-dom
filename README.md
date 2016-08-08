This JSX factory allows you to use React-like design patterns in a non-React environment.

Example using a web component:

```javascript
import * as React from '@turtlemay/jsx-dom';

export default class MyComponent extends HTMLElement {
  createdCallback() {
    this.appendChild(MyComponent._render());
  }

  static _render() {
    return (
      <div class="my-component-child">
        <p>foo</p>
      </div>
    );
  }
}
```

## Installation
```
npm install @turtlemay/jsx-dom
```

## Usage

Simply import the module into your JSX files using the `React` namespace:

```javascript
import * as React from '@turtlemay/jsx-dom';
```

And write some JSX:

```javascript
const attribs = { foo: 'foo', bar: 'bar' };
const div = <div {...attribs} baz="baz" qux="qux" />;
```

JSX elements become native DOM elements:

```javascript
console.assert(<div /> instanceof HTMLDivElement);
```

With TypeScript you can use a namespace other than `React` by setting your `tsconfig.json`:

```json
{
  "jsx": "react",
  "reactNamespace": "JSXFactory"
}
```

```javascript
import * as JSXFactory from '@turtlemay/jsx-dom';

const div = <div />;
```

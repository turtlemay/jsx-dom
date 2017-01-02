## @turtlemay/jsx-dom

This JSX factory allows you to use React-like design patterns with web components and other native DOM elements.

[![npm (scoped)](https://img.shields.io/npm/v/@turtlemay/jsx-dom.svg)]()
[![David](https://img.shields.io/david/dev/turtlemay/jsx-dom.svg)]()

## Example

```javascript
import * as React from '@turtlemay/jsx-dom';

// Define a custom element type.
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.appendChild(<p>hello {MyCustomElement.name}</p>);
  }
}

// Register our custom element.
customElements.define(`x-${MyCustomElement.name.toLowerCase()}`, MyCustomElement);

// Use the custom element type like a React component.
document.body.appendChild(
  <MyCustomElement
    // Use ref attribute to save your element reference.
    ref={v => this._myElemRef = v}

    // Event functions become native event listeners.
    onClick={e => {}}

    // Style objects are also supported.
    style={{ border: "1px solid red" }}

    // Other props become native attributes.
    my-string-attrib="foo"
    my-number-attrib={0}
    my-boolean-attrib={true} />
);
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

## Optional Configuration

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

## Tips

Use a decorator for easy component registration:

```javascript
function registerComponent(tagName) {
  return type => {
    if (!tagName) tagName = `x-${type.name}`;
    if (customElements.get(tagName)) return;
    customElements.define(tagName, type);
  };
}

@registerComponent()
class MyComponent extends HTMLElement {}
```

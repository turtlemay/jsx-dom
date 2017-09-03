## @turtlemay/jsx-dom

This minimal, zero-dependency JSX factory allows you to use React-like design patterns with web components and other native DOM elements. Most JSX patterns and special attributes are supported.

[![npm (scoped)](https://img.shields.io/npm/v/@turtlemay/jsx-dom.svg)](https://www.npmjs.com/package/@turtlemay/jsx-dom)

## Example

```javascript
import * as React from '@turtlemay/jsx-dom'

// Define a custom element type.
class MyCustomElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ''
    this.appendChild(<p>hello {MyCustomElement.name}</p>)
  }
}

// Register our custom element.
customElements.define(`x-${MyCustomElement.name.toLowerCase()}`, MyCustomElement)

// Use the custom element type like a React component.
document.body.appendChild(
  <MyCustomElement
    // Use the ref callback to save your element reference.
    ref={v => this._myElemRef = v}

    // Event callbacks become native event listeners.
    onClick={e => {}}

    // Style objects are also supported.
    style={{ border: '1px solid red' }}

    // Anything else becomes a native attribute.
    my-string-attrib="foo"
    my-number-attrib={0}
    my-boolean-attrib={true}
    // Objects become json-stringified.
    my-object-attrib={{ foo: "bar" }} />
)
```

## Installation

```
npm install @turtlemay/jsx-dom
```

## Usage

Simply import the module into your JSX files using the `React` namespace:

```javascript
import * as React from '@turtlemay/jsx-dom'
```

And write some JSX:

```javascript
const attribs = {
  foo: 'foo',
  bar: 'bar',
}
const div = <div {...attribs} baz="baz" qux="qux" />
```

JSX elements become native DOM elements:

```javascript
console.assert(
  <div /> instanceof HTMLDivElement
)
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
import * as JSXFactory from '@turtlemay/jsx-dom'

const div = <div />
```

## Tips

Use a decorator for easy component registration:

```javascript
// Decorator with optional tag name to define custom elements.
function registerComponent(tagName) {
  return type => {
    if (!tagName) tagName = 'x-' + type.name.toLowerCase()
    if (customElements.get(tagName)) return
    customElements.define(tagName, type)
  }
}

// Decorate your components.
@registerComponent()
class MyComponent extends HTMLElement {}
```

For passing non-serializable props, use an initializer:

```javascript
@registerComponent()
class MyComponent extends HTMLElement {
  init(myArg) {
    // Use your arguments to perform initialization.
    return this
  }
}

document.body.appendChild(
  MyComponent.prototype.init.call(
    <MyComponent my-serializable-prop="" />,
    { myNonSerializableProp: Symbol() }
  )
)
```

## Additional Notes

Due to the way template elements are implemented, implicit event listener props (`onClick`, etc.) inside a template will be ignored. They must be assigned explicitly in your code as normal.

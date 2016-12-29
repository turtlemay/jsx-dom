import * as React from "../..";

class MyCustomElement extends HTMLElement {
  public connectedCallback() {
    this._render();
  }

  private _render() {
    this.innerHTML = "";
    this.appendChild(<p>hello {MyCustomElement.name}</p>);
  }
}

customElements.define(`x-${MyCustomElement.name.toLowerCase()}`, MyCustomElement);

const testAttribs = {
  className: "test",

  style: {
    display: "block",
  },

  onClick: (e: Event) => {
    console.log(e.type, e.target);
  },

  "test-string": "foo",
  "test-boolean": false,
  "test-number": 0,
};

document.body.appendChild(
  <div {...testAttribs}>
    <p>hello div</p>
  </div>
);

document.body.appendChild(
  <MyCustomElement {...testAttribs} />
);

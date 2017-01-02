import * as React from "../..";

@registerComponent()
class MyCustomElement extends HTMLElement {
  private _paragraphElem: HTMLParagraphElement;

  public connectedCallback() {
    this._render();
  }

  private _render() {
    this.innerHTML = "";
    this.appendChild(
      <p ref={(v: HTMLParagraphElement) => this._paragraphElem = v}>
        hello {MyCustomElement.name}
      </p>
    );
  }
}

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

export function registerComponent(tagName?: string) {
  return <T extends HTMLElement>(type: new () => T) => {
    if (!tagName) tagName = `x-${type.name.toLowerCase()}`;
    if (customElements.get(tagName)) return;
    customElements.define(tagName, type);
  };
}

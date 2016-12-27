import * as React from "../..";

class MyCustomElement extends HTMLElement {
  private static _template = (
    <template>
      <p>hello {MyCustomElement.name}</p>
    </template>
  ) as HTMLTemplateElement;

  public connectedCallback() {
    this.appendChild(document.importNode(MyCustomElement._template.content, true));
  }
}

customElements.define(`x-${MyCustomElement.name.toLowerCase()}`, MyCustomElement);

const testAttribs = {
  className: "test",

  style: {
    display: "block",
  },

  onClick: (e: MouseEvent) => {
    console.log("onClick", e.target);
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

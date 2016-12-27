declare global {
  namespace JSX {
    type Element = HTMLElement;
    type IntrinsicElements = { [name: string]: { [name: string]: any } };
  }
}

export function createElement(
  type: (new () => HTMLElement) | string,
  props: { [name: string]: string | number | boolean | Object | EventListener },
  ...children: (HTMLElement | string)[], ): HTMLElement {

  let elem: HTMLElement;

  if (typeof type === "string") {
    elem = document.createElement(type);
  }
  else if (typeof type === "function") {
    elem = new type();
  }
  else {
    throw new TypeError();
  }

  for (let k in props) {
    let v = props[k];

    if (v === undefined || v === null) {
      continue;
    }
    else if (k === "style" && typeof v === "object") {
      Object.assign(elem.style, v);
    }
    else if (k.startsWith("on") && typeof v === "function") {
      const eventType = k.substr(2, k.length).toLowerCase();
      elem.addEventListener(eventType, v);
    }
    else if (typeof v === "string") {
      if (k === "className") k = "class";
      if (k === "htmlFor") k = "for";
      elem.setAttribute(k, v);
    }
    else if (typeof v === "number") {
      elem.setAttribute(k, v.toString());
    }
    else if (typeof v === "boolean") {
      if (v) elem.setAttribute(k, k);
      else elem.removeAttribute(k);
    }
    else {
      throw new TypeError(`Attribute type "${typeof v}" not supported. Must provide a string, number, or boolean.`);
    }
  }

  if (elem instanceof HTMLTemplateElement) {
    for (const v of children) {
      if (typeof v === "string") {
        elem.content.appendChild(document.createTextNode(v));
      } else if (v instanceof HTMLElement) {
        elem.content.appendChild(v);
      }
    }
  } else {
    for (const v of children) {
      if (typeof v === "string") {
        elem.appendChild(document.createTextNode(v));
      } else if (v instanceof HTMLElement) {
        elem.appendChild(v);
      }
    }
  }

  return elem;
}

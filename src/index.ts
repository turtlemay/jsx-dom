export function createElement(type: string, props: { [name: string]: string }, ...children: (string | HTMLElement)[]): HTMLElement {
  const elem = document.createElement(type);
  for (let k in props) {
    const v = props[k];
    if (k === 'className') k = 'class';
    elem.setAttribute(k, v);
  }
  for (const v of children) {
    if (v instanceof HTMLElement) elem.appendChild(v);
    else elem.insertAdjacentText('beforeend', v);
  }
  return elem;
}

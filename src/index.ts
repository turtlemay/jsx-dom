declare global {
  namespace JSX {
    type Element = HTMLElement
    type IntrinsicElements = { [name: string]: { [name: string]: any } }
  }
}

export type Setter = (v: HTMLElement) => void

export type Child = HTMLElement | string | number | any[]

export type Prop = string | number | boolean | Object | EventListener | Setter

export function createElement(
  type: (new () => HTMLElement) | string,
  props: { [name: string]: Prop },
  ...children: Child[] ): HTMLElement {

  let elem: HTMLElement

  if (typeof type === 'string') {
    elem = document.createElement(type)
  }
  else if (typeof type === 'function') {
    elem = new type()
  }
  else {
    throw new TypeError()
  }

  for (let k in props) {
    let v = props[k]

    if (v === undefined || v === null) {
      continue
    }
    else if (k === 'children' && isValidChild(v)) {
      handleChild(elem, v as Child)
    }
    else if (k === 'ref' && typeof v === 'function') {
      (v as Setter)(elem)
    }
    else if (k === 'style' && typeof v === 'object') {
      Object.assign(elem.style, v)
    }
    else if (k in elem) {
      Object.assign(elem, { [k]: v} )
    }
    else if (k.startsWith('on') && typeof v === 'function') {
      const propName = k.toLowerCase()
      if (propName in elem) Object.assign(elem, { [propName]: v} )
    }
    else if (typeof v === 'string') {
      if (k === 'className') k = 'class'
      if (k === 'htmlFor') k = 'for'
      elem.setAttribute(k, v)
    }
    else if (typeof v === 'number') {
      elem.setAttribute(k, v.toString())
    }
    else if (typeof v === 'boolean') {
      if (v) elem.setAttribute(k, k)
      else elem.removeAttribute(k)
    }
    else if (typeof v === 'object') {
      elem.setAttribute(k, JSON.stringify(v))
    }
    else {
      throw new TypeError(`Attribute type "${typeof v}" not supported.`)
    }
  }

  const parent = elem instanceof HTMLTemplateElement ? elem.content : elem
  children.forEach(child => handleChild(parent, child))

  return elem
}

function handleChild(
  parent: HTMLElement | DocumentFragment,
  child: Child, ): void {

  if (typeof child === 'string') {
    parent.appendChild(document.createTextNode(child))
  }
  else if (typeof child === 'number') {
    parent.appendChild(document.createTextNode(child.toString()))
  }
  else if (child instanceof HTMLElement) {
    parent.appendChild(child)
  }
  else if (child instanceof Array) {
    child.forEach(c => handleChild(parent, c))
  }
}

function isValidChild(value: any): boolean {
  if (value instanceof HTMLElement) return true
  if (value instanceof Array && isValidChild(value[0])) return true
  if (typeof value === 'string') return true
  if (typeof value === 'number') return true
  return false
}

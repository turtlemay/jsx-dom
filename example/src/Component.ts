abstract class Component extends HTMLElement {
  protected _render(elem: HTMLElement) {
    this.innerHTML = ''
    this.appendChild(elem)
  }

  public static register(tagName?: string) {
    return <T extends HTMLElement>(type: new () => T) => {
      if (!tagName) tagName = `x-${type.name.toLowerCase()}`
      if (customElements.get(tagName)) return
      customElements.define(tagName, type)
    }
  }
}

export default Component

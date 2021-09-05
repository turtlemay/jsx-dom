import * as React from '../node_modules/@turtlemay/jsx-dom/out/index.js'

import Component from './Component.js'

@Component.register()
class MyCustomElement extends Component {
  private _pElem: HTMLParagraphElement

  public connectedCallback() {
    this._render(
      <p ref={v => this._pElem = v}>
        hello {MyCustomElement.name}
      </p>
    )
    console.assert(this.className === 'test')
    console.assert(this.style.display === 'block')
    console.assert(this.getAttribute('test-string') === 'foo')
    console.assert(this.getAttribute('test-boolean') === null)
    console.assert(this.getAttribute('test-number') === '0')
  }
}

const testAttribs = {
  className: 'test',

  style: {
    display: 'block',
  },

  onClick: (e: Event) => {
    console.log(e.type, e.currentTarget)
  },

  'test-string': 'foo',
  'test-boolean': false,
  'test-number': 0,
  'test-object': { foo: 'foo', },
}

document.body.appendChild(
  <div {...testAttribs}>
    <p children="hello div" />
  </div>
)

document.body.appendChild(
  <MyCustomElement {...testAttribs} />
)

const template = (
  <template>
    <div>
      hello template
    </div>
  </template>
) as HTMLTemplateElement

document.body.appendChild(template.content)

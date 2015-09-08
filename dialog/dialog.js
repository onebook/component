'use strict'

function dialog(q, opts) {
  opts = opts || {}

  let node = document.getElementById(q)
  let content = node.children && node.children[0]
  let instance = new Dialog(node, content)

  if (opts.click2hide) {
    node.addEventListener('click', () => {
      instance.hide()
    })
  }

  return instance
}

class Dialog {
  constructor(node, content) {
    this.node = node
    this.duration = 500
    this.content = content
  }
  show() {
    this.node.classList.add('show')

    setTimeout(() => {
      this.remove('hide').add('show')
    }, 10)
  }
  hide() {
    this.remove('show').add('hide')

    setTimeout(() => {
      this.node.classList.remove('show')
    }, this.duration)
  }
  add(name) {
    this.content.classList.add(name)
    return this
  }
  remove(name) {
    this.content.classList.remove(name)
    return this
  }
}

export { dialog }

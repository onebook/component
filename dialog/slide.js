'use strict'

function dialog(q) {
  var node = document.getElementById(q)
  var content = node.children && node.children[0]
  return new Dialog(node, content)
}

class Dialog {
  constructor(node, content) {
    this.node = node
    this.duration = 500
    this.content = content
  }
  show() {
    this.node.style.display = 'block'

    var self = this
    setTimeout(() => {
      self.remove('hide').add('show')
    }, 10)
  }
  hide() {
    this.remove('show').add('hide')

    var self = this
    setTimeout(() => {
      self.node.style.display = 'none'
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

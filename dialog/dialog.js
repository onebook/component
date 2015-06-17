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
      self.removeClass('hide').addClass('show')
    }, 10)
  }
  hide() {
    this.removeClass('show').addClass('hide')

    var self = this
    setTimeout(() => {
      self.node.style.display = 'none'
    }, this.duration)
  }
  addClass(name) {
    this.content.classList.add(name)
    this.node.classList.add(name)
    return this
  }
  removeClass(name) {
    this.content.classList.remove(name)
    this.node.classList.remove(name)
    return this
  }
}

export { dialog }

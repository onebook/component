'use strict'

class Uploader {
  constructor(options) {
    if (typeof options !== 'object') {
      throw new TypeError('options is required')
    }

    this.dest = options.dest
    this.method = options.method || 'post'
  }

  /**
   * @param {String} target
   * @param {String} input
   *
   * Example:
   *   target: '.container'
   */
  dragable(target, handler) {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }

    target.ondragover = (event) => {
      event.preventDefault()
    }

    target.ondrop = (event) => {
      event.preventDefault()

      var dataTransfer = event.dataTransfer
      var files = dataTransfer.files

      handler(files, dataTransfer, event)
    }
  }

  upload(formData) {
    return fetch(this.dest, {
      method: this.method,
      body: formData
    })
  }

  read(file, type) {
    var reader = new FileReader()

    switch (type) {
      case 'binaryString':
        reader.readAsBinaryString()
        break
      case 'arrayBuffer':
        reader.readAsArrayBuffer()
        break
      case 'dataURL':
        reader.readAsDataURL()
        break
      case 'text':
        reader.readAsText(file)
        break
      default:
        reader.readAsDataURL(file)
    }

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        event.data = event.target.result
        resolve(event)
      }

      reader.onerror = reject
    })
  }

  readAll(files) {
    // TODO
  }
}

export { Uploader }

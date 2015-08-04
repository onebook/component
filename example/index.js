'use strict'

import { dialog as dialogSlide } from '../dialog/slide'
import { RotativeDot } from '../canvas/rotative-dot'
import { Uploader } from '../uploader/uploader'
import { dialog } from '../dialog/dialog'

window.dialogSlide = dialogSlide
window.dialog = dialog
window.upload = upload

function $(selector) {
  return document.querySelector(selector)
}

(() => {
  var uploader = new Uploader({
    dest: '/upload'
  })

  uploader.dragable('.drop', (files) => {
    var file = files[0]
    console.log('file %o', file)

    uploader
      .read(file, 'text')
      .then((result) => {
        console.log('result: %o', result)
      })
      .catch((error) => {
        console.error('error: %o', error)
      })
  })
}())

function upload() {
  var uploader = new Uploader({
    dest: '/upload'
  })

  var input = $('#uploader-file')
  var form = new FormData()

  console.log('input files: %o', input.files)

  form.append('file', input.files[0])

  uploader
    .read(input.files[0], 'text')
    .then((result) => {
      console.log('result: %o', result)
    })
    .catch((error) => {
      console.error('error: %o', error)
    })

  uploader
    .upload(form)
    .then((res) => {
      console.log('upload status: %d', res.status)
      return res.json()
    })
    .then((json) => {
      console.log('upload result: %o', json)
    })
    .catch((error) => {
      console.error('upload error: %o', error)
    })
}

var rotativeDot = new RotativeDot({
  container: document.querySelector('.canvases')
})
rotativeDot.run()

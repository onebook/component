'use strict'

import { Dialog, DialogSlide } from '../dialog/component'
import { dialog as dialogSlide } from '../dialog/slide'
import { RotativeDot } from '../canvas/rotative-dot'
import { Uploader } from '../uploader/uploader'
import { Component, render } from 'react'
import { dialog } from '../dialog/dialog'

require('./index.scss')

window.dialogSlide = dialogSlide
window.dialog = dialog
window.upload = upload

function $(selector) {
  return document.querySelector(selector)
}

(() => {
  let uploader = new Uploader({
    dest: '/upload'
  })

  uploader.dragable('.drop', (files) => {
    let file = files[0]
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

  class SomeDialog extends Component {
    render() {
      let texts = ['one', 'tow']
      return (
        <div>
          <Dialog id='d1' type='fade' btn='btn1' texts='hello, world!' />
          <Dialog id='d2' type='scale' btn='btn2' texts={texts} />
          <DialogSlide id='d3' type='slide' btn='btn3' texts={texts} />
        </div>
      )
    }
  }

  render(<SomeDialog />, document.querySelector('#dialog'))
})()

function upload() {
  let uploader = new Uploader({
    dest: '/upload'
  })

  let input = $('#uploader-file')
  let form = new FormData()

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

let rotativeDot = new RotativeDot({
  container: document.querySelector('.canvases')
})
rotativeDot.run()

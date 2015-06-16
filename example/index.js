'use strict'

import { RotativeDot } from '../canvas/rotative-dot'
import { Uploader } from '../uploader/uploader'
import { dialog } from '../dialog/dialog'

window.upload = upload
window.show = show
window.pop = pop

slide1()
slide2()
progress()

function show(id) {
  dialog(id).show()
}

function $(selector) {
  return document.querySelector(selector)
}

function pop(type) {
  var node = $('.com-popup')
  node.classList.remove('fade')
  node.classList.remove('scale')
  setTimeout(() => {
    node.classList.add(type)
  }, 10)
}

function progress() {
  $('.percent').style.width = '30%'
  setTimeout(function() {
    $('.percent').style.width = '70%'
    setTimeout(function() {
      $('.percent').style.width = '100%'
    }, 2000)
  }, 2000)
}

function slide1() {
  $('#slide1 .content').style.left = '0'
  $('#slide1 .content').style.opacity = ''
  setTimeout(() => {
    $('#slide1 .content').style.left = '80px'
    $('#slide1 .content').style.opacity = '1'
    setTimeout(() => {
      $('#slide1 .content').style.left = '160px'
      $('#slide1 .content').style.opacity = '0'
    }, 800)
  }, 800)
}

function slide2() {
  setTimeout(() => {
    $('#slide2').style.height = '150px'
    setTimeout(() => {
      $('#slide2').style.height = '0'
    }, 1000)
  }, 1000)
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

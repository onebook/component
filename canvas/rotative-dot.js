'use strict'

class RotativeDot {
  constructor(opts) {
    opts = opts || {}
    this.size = opts.size || 150
    this.center = this.size / 2
    this.interval = opts.interval || 10
    this.background = opts.background || 'rgba(0, 0, 0, 0.2)'
    this.style = opts.style || 'rgba(0, 0, 0, 0.5)'
    this.container = opts.container || document.querySelector('body')
  }

  drawDot(x, y, radius) {
    let ctx = this.context
    ctx.beginPath()
    ctx.fillStyle = this.style
    ctx.strokeStyle = this.style
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()
  }

  drawDots(ang) {
    let dist = this.center * 0.5
    let ctx = this.context
    let y = this.size / 5

    ctx.rotate(ang)
    this.drawDot(dist, y, 4)

    ctx.rotate(0.6)
    this.drawDot(dist, y, 5)

    ctx.rotate(0.6)
    this.drawDot(dist, y, 6)

    ctx.rotate(0.6)
    this.drawDot(dist, y, 7)

    ctx.rotate(0.6)
    this.drawDot(dist, y, 8)

    ctx.rotate(-(ang + 2.4))
  }

  drawBack() {
    let background = this.background
    let ctx = this.context
    let size = this.size

    ctx.beginPath()
    ctx.strokeStyle = background
    ctx.fillStyle = background
    ctx.rect(0, 0, size, size)
    ctx.fill()
    ctx.stroke()
    ctx.save()
  }

  run() {
    let canvas = document.createElement('canvas')
    let size = this.size

    canvas.width = canvas.height = size

    let ctx = this.context = canvas.getContext('2d')
    this.container.appendChild(canvas)

    this.drawBack()

    let interval = this.interval
    let center = this.center
    ctx.translate(center, center)

    let flag = 0

    let clear = () => {
      ctx.clearRect(-center, -center, size, size)
    }
    setInterval(() => {
      clear()

      flag = flag + 0.1
      this.drawDots(flag)
    }, interval)
  }
}

export { RotativeDot }

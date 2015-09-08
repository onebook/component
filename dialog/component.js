'use strict'

import { Component } from 'react'

class Dialog extends Component {
  handleClick() {
    let id = this.props.id
    dialog(id).hide()
  }

  render() {
    let id = this.props.id
    let btn = this.props.btn
    let type = this.props.type
    let texts = this.props.texts

    if (typeof texts === 'string') {
      texts = [texts]
    }

    return (
      <div className='com-dialog' id={id}>
        <div className={'content ' + type}>
          {
            texts.map((text) => {
              return (<div>{text}</div>)
            })
          }
          <span className='btn' onClick={this.handleClick.bind(this)}>{btn}</span>
        </div>
      </div>
    )
  }
}

class DialogSlide extends Component {
  handleClick() {
    let id = this.props.id
    dialogSlide(id).hide()
  }

  render() {
    let id = this.props.id
    let btn = this.props.btn
    let type = this.props.type
    let texts = this.props.texts

    if (typeof texts === 'string') {
      texts = [texts]
    }

    return (
      <div className='com-dialog-slide' id={id}>
        <div className={'content ' + type}>
          {
            texts.map((text) => {
              return (<div>{text}</div>)
            })
          }
          <span className='btn' onClick={this.handleClick.bind(this)}>{btn}</span>
        </div>
      </div>
    )
  }
}

export {
  DialogSlide,
  Dialog
}

'use strict'

import './index.css'

import React, { Component } from 'react'


/*
延时加载图片，图片滑动到当前窗口时候加载显示
props: 
	src: {?string},
	alt: {?string},
	transElement: {?selector}, 需要绑定transitionend触发图片加载的dom selector，为空则不监听该事件
	scroller: {?selector}，需要绑定scroll触发图片加载的dom selector，默认为document
*/
export default class LazyImg extends Component {

	constructor (props) {
		super(props)
		this.state = {}
		this.scrollEvent = () => this.scroll()
		this.transEvent = () => this.transEnd()
	}

	render () {
		let { src, alt } = this.props

		return (
			<div className='lazy-wrap' ref='lazyWrap'>
				{
					this.state.current && src
						? <img ref='lazyImg' src={src} alt={alt || ''} onLoad={() => this.scroll(true)}/> 
						: null
				}
			</div>
		)
	}

	componentDidMount () {		
		let { transElement, scroller } = this.props
		
		if (transElement) {
			this.transer = document.querySelector(transElement)
			this.transer.addEventListener('transitionend', this.transEvent, false)
		}
		this.scroller = scroller ? document.querySelector(scroller) : document
		this.wrap = this.refs.lazyWrap

		this.scroller.addEventListener('scroll', this.scrollEvent, false)
		this.scroll()
	}

	componentWillUnmount () {
		this.scroller.removeEventListener('scroll', this.scrollEvent)
		this.transer && this.transer.removeEventListener('transitionend', this.transEvent)
	}

	transEnd () {
		if (!this.props.transElement) 
			return

		this.scroll()
	}

	scroll (loaded) {

		if (!this.state.current) {
			if (this.wait) 
				return

			if (this.inCurrent(this.wrap)) {
				this.wait = true
				// setTimeout(() => {
					// if (this.inCurrent(this.wrap)) {
						this.setState({current: true})
					// }
				// }, 100)
			}
			return
		}

		if (loaded === true) {
			this.loaded = true
			this.img = this.refs.lazyImg
		}

		if (!this.loaded) return

		if (this.inCurrent(this.img)) {
        	if (this.img.width > this.img.height) {
        		this.img.style.height = '100%'
        	} else {
        		this.img.style.width = '100%'
        	}
            this.img.style.opacity = 1
            this.wrap.style.background = 'none'

            this.scroller.removeEventListener('scroll', this.scrollEvent)
            this.transer && this.transer.removeEventListener('transitionend', this.transEvent)
        }
	}

	inCurrent (element) {
		let client = element.getBoundingClientRect()
		this.clientHeight = document.documentElement.clientHeight
		this.clientWidth = document.documentElement.clientWidth
		
		return client.top < this.clientHeight && client.top > -client.height 
			&& client.left > -client.width && client.left < this.clientWidth
	}
}
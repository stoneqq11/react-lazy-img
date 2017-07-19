'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('./index.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
延时加载图片，图片滑动到当前窗口时候加载显示
props: 
	src: {?string},
	alt: {?string},
	transElement: {?selector}, 需要绑定transitionend触发图片加载的dom selector，为空则不监听该事件
	scroller: {?selector}，需要绑定scroll触发图片加载的dom selector，默认为document
*/
var LazyImg = function (_Component) {
	(0, _inherits3.default)(LazyImg, _Component);

	function LazyImg(props) {
		(0, _classCallCheck3.default)(this, LazyImg);

		var _this = (0, _possibleConstructorReturn3.default)(this, (LazyImg.__proto__ || (0, _getPrototypeOf2.default)(LazyImg)).call(this, props));

		_this.state = {};
		_this.scrollEvent = function () {
			return _this.scroll();
		};
		_this.transEvent = function () {
			return _this.transEnd();
		};
		return _this;
	}

	(0, _createClass3.default)(LazyImg, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    src = _props.src,
			    alt = _props.alt;


			return _react2.default.createElement(
				'div',
				{ className: 'lazy-wrap', ref: 'lazyWrap' },
				this.state.current && src ? _react2.default.createElement('img', { ref: 'lazyImg', src: src, alt: alt || '', onLoad: function onLoad() {
						return _this2.scroll(true);
					} }) : null
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props2 = this.props,
			    transElement = _props2.transElement,
			    scroller = _props2.scroller;


			if (transElement) {
				this.transer = document.querySelector(transElement);
				this.transer.addEventListener('transitionend', this.transEvent, false);
			}
			this.scroller = scroller ? document.querySelector(scroller) : document;
			this.wrap = this.refs.lazyWrap;

			this.scroller.addEventListener('scroll', this.scrollEvent, false);
			this.scroll();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.scroller.removeEventListener('scroll', this.scrollEvent);
			this.transer && this.transer.removeEventListener('transitionend', this.transEvent);
		}
	}, {
		key: 'transEnd',
		value: function transEnd() {
			if (!this.props.transElement) return;

			this.scroll();
		}
	}, {
		key: 'scroll',
		value: function scroll(loaded) {

			if (!this.state.current) {
				if (this.wait) return;

				if (this.inCurrent(this.wrap)) {
					this.wait = true;
					// setTimeout(() => {
					// if (this.inCurrent(this.wrap)) {
					this.setState({ current: true }
					// }
					// }, 100)
					);
				}
				return;
			}

			if (loaded === true) {
				this.loaded = true;
				this.img = this.refs.lazyImg;
			}

			if (!this.loaded) return;

			if (this.inCurrent(this.img)) {
				if (this.img.width > this.img.height) {
					this.img.style.height = '100%';
				} else {
					this.img.style.width = '100%';
				}
				this.img.style.opacity = 1;
				this.wrap.style.background = 'none';

				this.scroller.removeEventListener('scroll', this.scrollEvent);
				this.transer && this.transer.removeEventListener('transitionend', this.transEvent);
			}
		}
	}, {
		key: 'inCurrent',
		value: function inCurrent(element) {
			var client = element.getBoundingClientRect();
			this.clientHeight = document.documentElement.clientHeight;
			this.clientWidth = document.documentElement.clientWidth;

			return client.top < this.clientHeight && client.top > -client.height && client.left > -client.width && client.left < this.clientWidth;
		}
	}]);
	return LazyImg;
}(_react.Component);

exports.default = LazyImg;
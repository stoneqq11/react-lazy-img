<h2>INSTALL</h2>
	npm install react-lazy-img --save

<h2>USEAGE</h2>
	import LazyImg from 'react-lazy-img'

	<LazyImg src='imgurl' alt='lazyimg' />

<h2>PARAMS</h2>
    @param src {!url}
    @param alt {!string}
    @param transElement {?selector} 需要绑定transitionend触发图片加载的dom selector，为空则不监听该事件
    @param scroller {?selector} 需要绑定scroll触发图片加载的dom selector，默认为document

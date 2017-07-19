<h2>INSTALL</h2>
	npm install react-lazyload-image --save

<h2>USEAGE</h2>
	import LazyImg from 'react-lazyload-image'

	<LazyImg src='imgurl' alt='lazyimg' />

<h2>PARAMS</h2>
<code>
    @param src {!url}
</code>
<br/>
<code>
    @param alt {!string}
</code>
<br/>
<code>
    @param transElement {?selector} 需要绑定transitionend触发图片加载的dom selector，为空则不监听该事件
</code>
<br/>
<code>
    @param scroller {?selector} 需要绑定scroll触发图片加载的dom selector，默认为document
</code>

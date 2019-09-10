//投递者对象，有一个订阅者列表
function Deliver() {
	this.subscribers = [];
}
Deliver.prototype = {
	constructor: Deliver,
	deliver: function( message ) {

		//message fire
		this.subscribers.forEach( function( fun ) {
			fun( message );
		} );

		return this;
	}
}

//为函数原型添加一个订阅方法
function subscribe( subscriber, deliver ) {
	var hasExists = false,
		isFunction = Object.prototype.toString.call( subscriber ) === '[object Function]';

	if( isFunction && deliver instanceof Deliver ) {
		hasExists = deliver.subscribers.some( function( fun ) {
			return fun === subscriber;
		} )

		if( !hasExists ) {

			deliver.subscribers.push( subscriber );
		}
	}
}

//退订subscriber事件
function unSubscribe( subscriber, deliver ) {
	var isFunction = Object.prototype.toString.call( subscriber ) === '[object Function]';

	if( isFunction && deliver instanceof Deliver ) {
		deliver.subscribers = deliver.subscribers.filter( function( fun ) {
				return fun !== subscriber;
		} )
	}
}
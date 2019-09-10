$( function() {
	var webSocket;
	
	var setPageContentHeight = ( function() {
		var pageContentWrap = $( '.page-content-wrapper' ),
			pageContent = $( '.page-content' );
			
		return function setPageContentHeight() {
			pageContent.height( pageContentWrap.height() -26 );
		}
	} )();
	var lazySetPageContentHeight = lazyExe( 100 );

	//不加定时器会导致 reactjs还没有添加完dom，$( '.console' )获取不到节点
	setTimeout( function() {
		var consoles = $( '.console' ),
			contents = $( '.console .content' );
		$( 'input[name="ctrl"]' ).change( function() {
				consoles.toggleClass( 'x-show' );
				consoles.toggleClass( 'x-hide' );
				lazySetPageContentHeight( setPageContentHeight );
				
				$.each( contents, function( _, elem ) {
					goToBottom( elem );
				} );
		} );
	} )
	
	//设置元素滚动条到底部
	function goToBottom( elems ) {
		var $elem;

		if( $.type( elems ) === 'array' ) {
			$.each( elems, function( _, elem ) {
				goToBottom( elem );
			} )
		} else{
			$elem = $( elems );

			if( $elem[ 0 ].nodeType === 1 ) {
				$elem.scrollTop( $elem[0].scrollHeight );
			}
		}
	}
	
	var socket = ( function() {
		var errorCount = 0, //记录websocket新建次数
			socket = null,
			ret;
		
		var	consoleObj = {};
		setTimeout( function() {
			messageObj.forEach( function( val ) {
				consoleObj[ val.key ] = $( '.' + val.key + ' .content' );
			} );
		} );

		//向元素中追加一条数据
		function appendData( dom, data ) {
			$( dom ).append( data );
		}
		
		//获取websocket，同时注册错误信息处理等函数
		function getWebSocket( option ) {
			var _socket;
			
			if( 'WebSocket' in window ) {
				_socket = new WebSocket( option.url );
				_socket.onmessage = function( event ) {
					option.message.call( _socket, event.data );
				};
				_socket.onerror = option.error;
				_socket.onopen = option.open;
				_socket.onclose = option.close;
				
	            return _socket;
	        } else {
	        	myWarning( '您的浏览器太老了，不支持websockt，请更换新版本！' );
	        	return null;
	        }
		}
		
		ret = {
			openSocket: function() {
				if( socket ) {
					return socket;
				}
				
				socket = getWebSocket( {
					url: 'ws://' + location.host + X.root + '/webterminalsocket',
					message: ret.handleMessage,
					error: ret.handleError,
					close: ret.handleClose,
					open: ret.handleOpen
				} );
				return socket;
			},
			//处理websocket返回的信息
			handleMessage: function ( data ) {
				//#print{"process":"","data":"asg"} or #print_error{"process":"","data":"asg"}
				var content, key, value, tpl,
					isError = false;

				if( data.indexOf( '#print_error' ) > -1 ) {
					content =data.substr( '#print_error'.length ).replace( /^{|}$/g, '' );
					isError = true;
				} else if( data.indexOf( '#print' ) > -1 ) {
					content = data.substr( '#print'.length ).replace( /^{|}$/g, '' );
				}

				key = content.substr( content.indexOf( 'process":' ) + 'process":'.length + 1, 2 );
				value = content.substr( content.indexOf( '"data":' ) + '"data":'.length + 1 );
				value = value.substr( 0, value.length - 1 );
				
				if( isError ) {
					tpl = '<p class="error">' + value + '</p>';
				} else {
					tpl = '<p>' + value + '</p>';
				}
				appendData( consoleObj[ key ], tpl );
				appendData( consoleObj.all, tpl );
				
				setTimeout( function() {
					if( !consoleObj[ key ] ) {
						console.log( key )
					}
					goToBottom( [ consoleObj[ key ], consoleObj.all ] );
				} );
				
			},
			handleError: function () {
				socket = null;
				if( errorCount++ < 20 ) {
					setTimeout( function() {
						socket = ret.openSocket();
					}, 3000 );
				} else {
					myWarning( '无法建立websocket连接，请检查网络是否配置正确！' );
				}
			},
			handleOpen: function() {
				errorCount = 0;
			},
			handleClose: this.handleError
		};

		return ret;
	} )();
	
	socket.openSocket();
	
	/*
	//点击tab按钮，让控制台滚动条滚动到底部
	$( '.console .nav-tabs a' ).click( function() {
		goToBottom( $tab );
	} );
	*/
	
	
} );
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

//表单验证
( function() {
	var $form = $( '#emailConfig' );

	$.extend($.validator.messages, {
		required: "这是必填字段",
		equalTo: "两次输入密码不匹配",
		email: "发件箱格式不正确"
	});
	
	$form.validate( {
	    rules: {
	    	'sendAddr': {
	    		required: true,
	    		email: true
	    	},
	    	'sendPS': {
	    		required: true,
	    	},
	    	'confirmPS': {
	    		required: true,
	    		equalTo: "#sendPS",
	 		},
	 		'emailSubject': {
	 			required: true
	 		}
	 	}
	} );
	
	$( '.submit' ).click( function() {
		var $loading = $( '.loading' ),
			$this = $( this );
		
		if( $form.valid() ) {
			$loading.show();
			$this.attr( 'disabled', 'disabled' );

			$.ajax( {
				type: 'POST',
				url:'changeEmail',
				data: $form.serialize(),
				dataType: 'JSON'
			} ).done( function( json ) {
				if( json.bizNo > 0 ) {
					pop.success( '修改成功!' );
				} else {
					pop.error( '修改失败!' );
				}
			} ).fail( function() {
				pop.error( '请求发生错误!' );
			} ).always( function() {
				$loading.hide();
				$this.removeAttr( 'disabled' );
			} )
		}
	} )
} )();

/*************************添加收件人*************************/
var addReceive = ( function() {
	var $addTarget = $( '.receive' ),
		$name = $( 'input[name="receiverName"]' ),
		$addr = $( 'input[name="receiverAddr"]' ),
		validArray = [ $name, $addr ];

	//序列化收件人信息
	function serailze() {
		return 'receiverName=' + $name.val() + '&receiverAddr=' + $addr.val();
	}

	//添加一个收件人
	function addRec( name, addr ) {
		var htmlStr = '<li class="item" title="' + addr + '">' +
						'<span class="name">' + name + '</span>' +
						'<i class="fa fa-times delete"></i>' +
					  '</li>';

		$addTarget.append( htmlStr );
	}

	//添加收件人请求
	function addRecRequest( successCb ) {
		$.ajax( {
			type: 'POST',
			url: 'addReceiver',
			data: serailze(),
			dataType: 'JSON'
		} ).then( function( json ) {
			//没有处理添加失败的情况
			if( json.bizNo > 0 ) {
				addRec( $name.val(), $addr.val() );
				resetAddInput( validArray );
			}
		} )
	}

	//对姓名和地址进行验证
	function valid() {
		var ret = true;
		validArray.forEach( function( dom ) {
			if( !validOne( dom ) ) {
				ret = false;
			}
		} )
		return ret;
	}

	//对每个元素进行验证
	function validOne( $target ) {
		$target.removeClass( 'error' );
		if( !testRules( $target ) ) {
			//加入延时，再次点击时才能有效果，否则删除error后马上添加没有效果
			setTimeout( function() {
				$target.addClass( 'error' );
			}, 50 )
			return false;
		}
		return true;
	}

	//验证表单
	function testRules( $target ) {
		var rules = $target.data( 'rule' ).split( /\s+/ ),
			val = $target.val(),
			i;

		for( i = 0; i < rules.length; i++ ) {
			if( !testRule( val, rules[ i ] ) ) {
				return false;
			}
		}
		return true;
	}

	//验证规则
	function testRule( value, rule ) {
		var ret = true;
		value = value.trim();

		switch( rule ){
			case 'required':
				if( value == '' ) {
					ret = false;
				}
				break;
			case 'email':
				if( !/^.+@[^.]+\..+$/.test( value ) ) {
					ret = false;
				}
				break;
			default:
				break;
		}
		return ret;
	}

	//重置收件人姓名和地址
	function resetAddInput( array ) {
		var rVal = /input/i;

		array.forEach( function( item ) {
			if( rVal.test( item[0]['nodeName'] ) ) {
				item.val( '' );
			} else {
				item.text( '' );
			}
		} )
	}
	
	return {
		init: function() {
			$( '.add-receive' ).click( function() {
				if( valid() ) {
					addRecRequest( addRec );
					 // addRec( $name.val(), $addr.val() );
					$( '.no-receiver' ).hide();
				}
				
			} )
		}
	}

} )();
addReceive.init();
/****************************************************************/

/******************************删除收件人**********************************/
$( '.receive' ).delegate( '.delete', 'click', function() {
	var $this = $( this ),
		$item = $this.parent(),
		name = $item.find( '.name' ).text(),
		addr = $item.attr( 'title' );

	$item.remove();
	if( $( '.receive' ).find( '.item' ).length == 0 ) {
		$( '.no-receiver' ).show();
	}

	$.ajax( {
		type: 'POST',
		url: 'deleteReceiver',
		data: 'receiverName=' + name + '&receiverAddr=' + addr,
		dataType: 'JSON'
	} ).then( function( json ) {
		if( json.bizNo > 0 ) {
			$item.remove();
			if( $( '.receive' ).find( '.item' ).length == 0 ) {
				$( '.no-receiver' ).show();
			}
		}
	} )
} )








},{"../../../public/js-dev/pop":2}],2:[function(require,module,exports){
/*
 * 基于bootstrap弹出框，支持成功、警告、失败和普通弹出框
*/

/* 
 * Pop constructor
 * @param {jquery} $modal
*/
function Pop( $modal ) {
	if( !$modal || !$modal.jquery ) {
		throw new Error( 'please ensure input an effective parameter!' );
	}
	this.modal = $modal;
	this._init();
}

Pop.prototype._init = function( msg ) {
	this.modal.addClass( 'pop' );
	this.modal.find( '.modal-header' ).addClass( 'pop-header' );
	this.modal.find( '.modal-footer' ).addClass( 'pop-footer' );
	this.modal.find( '.modal-body' ).addClass( 'pop-body' )
			.html( '<i class=""></i>' +
					 '<p class="pop-text">' + msg + '</p>' );

	//窗口隐藏时自动注销确定按钮绑定的事件
	this.modal.on( 'hidden.bs.modal', function () {
 		this.modal.find( '.pop-footer .ok' ).off();
	}.bind( this ));
}

Pop.prototype.sure = function( msg ) {
	this._show( 'sure', msg );
}
Pop.prototype.normal = function( msg ) {
	this._show( 'normal', msg );
}
Pop.prototype.success = function( msg ) {
	this._show( 'success', msg );
}
Pop.prototype.warning = function( msg ) {
	this._show( 'warning', msg );
}
Pop.prototype.error = function( msg ) {
	this._show( 'error', msg );
}
Pop.prototype.hide = function( callback ) {
	this.modal.on( 'hidden.bs.modal.tmp', function () {
		this.modal.off( 'hidden.bs.modal.tmp' );
 		callback && callback();
	}.bind( this ));
	
	this.modal.modal( 'hide' );
}
//绑定事件
Pop.prototype.on = function( selecter, type, fun ) {
	this.modal.find( selecter ).on( type, fun );
}
Pop.prototype._show = function( type, msg ) {
	this.modal.find( '.pop-footer .ok' ).hide();
	this.modal.find( '.pop-footer .cancel' ).show().text( '确定' );
	switch ( type ) {
		case 'sure':
			this.modal.find( '.pop-footer .ok' ).show().text( '确定' );
			this.modal.find( '.pop-footer .cancel' ).show().text( '取消' );

			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-question-circle' );
			this.modal.find( '.modal-title' ).text( '确认' );
			break;
		case 'normal':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-info-circle' );
			this.modal.find( '.modal-title' ).text( '提示' );
			break;
		case 'success':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-check-circle' );
			this.modal.find( '.modal-title' ).text( '成功' );
			break;
		case 'warning':
			this.modal.find( '.pop-footer .ok' ).show().text( '确定' );
			this.modal.find( '.pop-footer .cancel' ).show().text( '取消' );

			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-exclamation-circle' );
			this.modal.find( '.modal-title' ).text( '警告' );
			break;
		case 'error':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-times-circle' );
			this.modal.find( '.modal-title' ).text( '错误' );
			break;
		default:
			break;
	}
	this.modal.find( '.modal-title' ).addClass( 'pop-title' );

	this._emptyAddClass();
	this.modal.addClass( 'pop-' + type );
	this._setContent( type, msg );
	this.modal.modal( 'show' );
}
Pop.prototype._emptyAddClass = function( msg ) {
	this.modal.removeClass( 'pop-success pop-warning pop-error' );
}
Pop.prototype._setContent = function( type, msg ) {
	this.modal.find( '.pop-body .pop-text' ).html( msg || '操作失败!' );
}

module.exports = Pop;

},{}]},{},[1])
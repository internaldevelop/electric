(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

if( G.bizNo > 0 ) {
	pop.sure( '创建项目成功!<br/>是否跳转到项目列表页?' );

	pop.on( '.ok', 'click', function() {
		location.href = $( '.project_list a' ).attr( 'href' );
  	} );
} else if( G.bizNo < 0 ) {
	pop.error( '创建项目失败!' );
}


$( function() {
	var config = $( '#config' ),
		validateObj;

	$.validator.addMethod( "ip", function( value, element, params ) {
		var cidrReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\/(?:3[0-1]|[1-2]?\d))?)$/,
			ipReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))$/,
			ipArr = value.trim().split( /\s+/ ),
			i;
			
		for( i = 0; i < ipArr.length; i++ ) {
			if( cidrReg.test( ipArr[ i ] ) || ipReg.test( ipArr[ i ] ) ) {
				continue;
			}
			return false;
		}

		return true;

	}, "输入格式不正确");

	validateObj = config.validate( {
	    rules: {
	    	projectName: {
	    		required: true,
	    		remote: {
                    type: "GET",
                    url: "project_exist",
                    dataType: "json",
                    data: {
                        name: function () {
                            return $( 'input[name="projectName"]' ).val();
                        }
                    }
                }
	    	},
	    	target: {
	    		required: true,
	    		ip: true
	    	}
	 	},
	 	messages: {
	 		title: {
                remote: "该项目名称已存在！"
	 		}
	 	},
	 	onkeyup: false,//这个地方要注意，修改去控制器验证的事件。
	 	ignore: '.ignore'
	} );

	var submitClick = 0;
	$( '.submit' ).click( function() {
		if( submitClick < 1 ) {
			if( config.valid() ) {
				submitClick++;
				return true;
			} else {
				return false;
			}
		} else {
			return false;
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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

//表单验证
( function() {
	var $form = $( '#pwChange' );

	$.extend($.validator.messages, {
		required: "这是必填字段",
		equalTo: "两次输入密码不匹配",
		notEqualTo: "新密码不能与原始密码相同"
	});

	jQuery.validator.addMethod( 'notEqualTo', function(value, element, param) {
		if( value !== $( param ).val() ) {
			return true;
		}
		return false;
	} )

	$form.validate( {
	    rules: {
	    	'username': 'required',
	    	'realName': 'required',
	    	'oldPs': 'required',
	    	'newPs': {
	    		required: true,
	    		notEqualTo: '#oldPs'
	    	},
	    	'confirmNewPs': {
	    		required: true,
	    		equalTo: "#newPs",
	    		notEqualTo: '#oldPs'
	 		}
	 	}
	} );

	$( '.submit' ).click( function() {
		var $loading = $( '.loading' ),
		   	$this = $( this );

		if( $("#pwChange").valid() ) {
			$loading.show();
			$this.attr( 'disabled', 'disabled' );

			var username = $('input[name="username"]').val();
			var realName = $('input[name="realName"]').val();
			var oldPs = $('input[name="oldPs"]').val();
			var newPs = $('input[name="newPs"]').val();
			var confirmNewPs = $('input[name="confirmNewPs"]').val();
			var param = {
				username:username,
				realName:realName,
				oldPs:oldPs,
				newPs:newPs,
				confirmNewPs:confirmNewPs
			};

		  $.ajax({
        type:"GET",
        url:'/config/rsa_key',
        success:function(res){
            var pwdKey = new RSAUtils.getKeyPair(res.exponent,"",res.modulus);
            var reversedOldPwd = param.oldPs.split("").reverse().join("");
						var reversedNewPwd = param.newPs.split("").reverse().join("");
						var reversedConPwd = param.confirmNewPs.split("").reverse().join("");
            param.oldPs = RSAUtils.encryptedString(pwdKey,reversedOldPwd);
					  param.newPs = RSAUtils.encryptedString(pwdKey,reversedNewPwd);
						param.confirmNewPs = RSAUtils.encryptedString(pwdKey,reversedConPwd);
						console.log(param);
						$.ajax( {
							url:'changePs',
							type: 'GET',
							dataType: 'JSON',
							data: param
						}).then( function( json ) {
							switch ( json.changeState ) {
								case 1:
									$( '#realName' ).attr( 'readonly', 'readonly' );
									pop.success( '修改成功!' );
									G.isFirst = -1;
									break;
								case -1:
									pop.error( '原始密码错误!' );
									break;
								case -2:
									pop.error( '两次输入密码不匹配' );
									break;
								case -3:
									pop.error( '新密码不能与原始密码相同!' );
									break;
								case -4:
									pop.error('密码必须是数字、字符、特殊字符(~!@#$%^&*_)组合，且大于8位');
									break;
								case -5:
									pop.error('密码不能包含用户名');
									break;
								case -6:
 										pop.error('系統异常');
 										break;
								default:
									pop.error( '修改失败!' );
									break;
							}
           })
        },
        error: function(result, status, xhr) {
        }
      });

			$loading.hide();
			$this.removeAttr( 'disabled' );

		}
	} )
} )();

//如果是首次禁止点击其他链接
( function() {
	$( '.page-sidebar-menu' ).delegate( 'a', 'click', function( e ) {
		if( G.isFirst === '1' ) {
			e.preventDefault();
			e.stopImmediatePropagation();
			pop.normal( '请先填写姓名并修改密码!' );
		}
	} )
} )();


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
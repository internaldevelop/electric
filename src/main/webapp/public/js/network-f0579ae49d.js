(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

var netConfig = ( function( $par ) {
		var $style   = $par.find( '.dhcpFlag' ),
			$ip      = $par.find( 'input[name="ip"]' ),
			$netmask = $par.find( 'input[name="netmask"]' ),
			$gateway = $par.find( 'input[name="gateway"]' ),
			$dns1    = $par.find( 'input[name="dns1"]' ),
			$dns2    = $par.find( 'input[name="dns2"]' ),
			$loading = $par.find( '.loading' ),
			$noDhcpPar = $( '.no-dhcp-wrapper' ), //dhcp时不需要填写的字段父元素
			$noDhcp  = $par.find( '.no-dhcp' ),   //dhcp时不需要填写的字段
			$submit  = $par.find( '.edit-ok' ),      //编辑状态下的"确定"按钮
			$cancel  = $par.find( '.edit-cancel' ),  //编辑状态下的"取消"按钮
			$edit    = $par.find( '.edit' ),         //表单中的"编辑"按钮
			editState  = -1, //编辑状态，-1表示非编辑状态，1表示编辑进行状态
			hasInit = false,
			mySlider,
			ret;


		//向表单中填写配置信息
		function fillConfig( config ) {
			$ip.val( config.ip );
			$netmask.val( config.netmask );
			$gateway.val( config.gateway );
			$dns1.val( config.dns1 );
			$dns2.val( config.dns2 || '' );
			mySlider.bootstrapSlider( 'setValue', config.bandwidth );

			if( +config.dhcpFlag === 1 ) {
				$style.val( '1' );
				setDhcp( 1 );
			} else {
				$style.val( '0' );
				setDhcp( 0 );
			}
		}

		//根据标志设置元素禁用状态
		function setDhcp( isDhcp ) {
			if( +isDhcp === 1 ) {
				$noDhcp.attr( 'disabled', 'disabled' );
			} else {
				$noDhcp.removeAttr( 'disabled' );
			}
		}

		//禁止编辑状态
		function disabledEdit() {
			editState = -1;

			$edit.show();
            $submit.hide();
            $cancel.hide();

			$style.attr( 'disabled', 'disabled' );
			$noDhcp.attr( 'disabled', 'disabled' );
			mySlider.bootstrapSlider( 'disable' );

			removeErrorDom();
		}

		//编辑状态
		function enabledEdit( isDhcp ) {
			editState = 1;

			$edit.hide();
            $submit.show();
            $cancel.show();
            mySlider.bootstrapSlider( 'enable' );

			$style.removeAttr( 'disabled' );

			setDhcp( isDhcp );
		}

		//移除错误信息元素
		function removeErrorDom(){
			$par.find( 'label.error' ).remove();
		}
		
		$.validator.addMethod( "mask", function( value, element, params ) {
			var ipArr      = $ip.val().split( '.' ),
				gateway    = $gateway.val(),
				gatewayArr = gateway .split( '.' ),
				netmaskArr = $netmask.val().split( '.' ),
				len        = 4,
				i          = 0;

			if( gateway  === '' ) {
				return true;
			}
			if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
				return false;
			}
			for( ; i < len; i++ ) {
				if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
					return false;
				}
			}
			return true;
		}, '网关不可达' );

		//初始化表单验证
		$par.validate( {
		    rules: {
		      	ip: {
		        	required: true,
		        	ip: true
		     	},
		     	gateway: {
		        	ip: true,
					mask: true
		     	},
		     	netmask: {
		     		required: true,
		        	ip: true,
		     	},
		     	dns1: {
		     		ip: true
		     	},
		     	dns2: {
		     		ip: true
		     	}
		 	},
		 	ignore: '.ignore'
		} );

		//设置网络
		function setNetConfig(){
			if( $par.valid() ){
				$loading.show();
				$submit.attr( 'disabled', 'disabled' );
				$cancel.attr( 'disabled', 'disabled' );

				$.ajax( {
					method  : 'POST',
					url     : 'setNetConfig',
					data    : $par.serialize(),
					dataType: 'JSON'
				} ).then( function( json ) { 
					G.netConfig = json.netConfig;

					//填充后台返回的网络配置信息
					fillConfig( G.netConfig );

					if( json.bizNo > 0 ) {
						if( !pop.isShow ) {
							pop.success( '修改成功!' );
						}
						disabledEdit( G.netConfig.dhcpFlag );
					} else {
						if( !pop.isShow ) {
							pop.error( '修改失败!' );
						}
					}
				}, function(){//向后抬发送未成功
					pop.error( '请求发生错误!' );
				} ).always( function() {
					$submit.removeAttr( 'disabled' );
					$cancel.removeAttr( 'disabled' );
					$loading.hide();
				} )
			}
		}

		ret = {
			init: function( netConfig ) {
				if( hasInit ) {
					return;
				}
				hasInit = true;

				mySlider = $( "#bandwidth" ).bootstrapSlider( {
					formatter: function( value ) {
						value = parseInt( value );
						$( 'input[name="bandwidth"]' ).val( value );
						return value + 'M';
					}
				} );

				fillConfig( netConfig );
				disabledEdit();

				//配置方式改变事件
				$style.change( function() {
					removeErrorDom();

					if( $style.val() === '1' ) {
						setDhcp( 1 );
					} else { 
						setDhcp( 0 );
					}
				} );

				//编辑按钮点击事件
                $edit.click( function(){
                	if( editState === -1 ) {
                		enabledEdit( G.netConfig.dhcpFlag ); 
                	}
                } );

                //编辑状态下，确定按钮点击事件(提交按钮点击事件)
                $submit.click( function() {
                	if( editState === 1 ){
                		setNetConfig();
                	}
				} );
                
                //编辑状态下，取消按钮点击事件 
				$cancel.click( function() {
					if( editState === 1 ){ 
					  fillConfig( G.netConfig );
					  disabledEdit();  
					}
				} );
			}
		}
		return ret;
	} )( $( '#netConfig' ) );

	//网络配置初始化
	netConfig.init( G.netConfig );


// $( function() {
// 	var loading = $( '.net-config .loading' );
// 	var mySlider;
	
// 	loading.show();
// 	getNetwork( function( netConf ) {
// 		mySlider = $( "#bandwidth" ).bootstrapSlider( {
// 			formatter: function( value ) {
// 				value = parseInt( value );
// 				$( 'input[name="bandwidth"]' ).val( value );
// 				return value + 'M';
// 			}
// 		} );
// 		mySlider.bootstrapSlider( 'setValue', netConf.bandwidth );

// 		fillTalbeConfig( netConf );
// 		fillModelConfig( netConf );
		
// 		loading.hide();
// 	}, function() {
// 		loading.hide();
// 	} );
	
// 	$( '.config' ).click( function() {
// 		var style = $( '#config .style' ),
// 			mask = $( '#config .mask' ),
// 			device = $( 'input[name="device"]' ),
// 			noDhcp = $( '#config .no-dhcp' );

// 		style.off().change( function() {
// 			if( style.val() === 'dhcp' ) {
// 				mask.show();
// 				$( '#config label.error' ).remove();

// 				device.addClass( 'ignore' );
// 				noDhcp.addClass( 'ignore' );
// 			} else {
// 				mask.hide();

// 				device.removeClass( 'ignore' );
// 				noDhcp.removeClass( 'ignore' );
// 			}
// 		} );

// 		$( '#config label.error' ).remove();
// 	} )
	
	
// 	function getNetwork( successFun, errorFun ) {
// 		$.ajax( {
// 			type: 'GET',
// 			url: 'ajax_network',
// 			dataType: 'json',
// 			success: function( data ) {
// 				successFun( data.netConf );
// 			},
// 			error: function() {
// 				errorFun();
// 			}
// 		} );
// 	}
	
// 	//向表格中填写配置信息
// 	function fillTalbeConfig( config ) {
// 		$( '.net-config .device' ).text( config.device );
// 		$( '.net-config .ip' ).text( config.ip );
// 		$( '.net-config .gateway' ).text( config.gateway );
// 		$( '.net-config .netmask' ).text( config.netmask );
// 		$( '.net-config .dns1' ).text( config.dns1 );
// 		$( '.net-config .dns2' ).text( config.dns2 || '' );
// 		$( '.net-config .bandwidth' ).text( ( config.bandwidth || 5 ) + 'M' );

// 		if( config.dhcpFlag === true ) {
// 			$( '.net-config .style' ).text( 'dhcp' );
// 		} else {
// 			$( '.net-config .style' ).text( 'static' );
// 		}
// 	}
	
// 	//向弹出的模态框中填写配置信息
// 	function fillModelConfig( config ) {
// 		var fields = [ 'device', 'ip', 'gateway', 'netmask', 'dns1', 'dns2' ],
// 			fieldsObj = {},
// 			i, len;

// 		for( i = 0, len = fields.length; i < len; i++ ) {
// 			$( '#config input[name="' + fields[ i ] + '"]' ).val( config[ fields[ i ] ] );
// 		}
// 		if( config.dhcpFlag === true ) {
// 			$( '#config .style' ).val( 'dhcp' );
// 			$( '#config .mask' ).show();

//             $( 'input[name="port"]' ).addClass( 'ignore' );
//             $( '#config .no-dhcp' ).addClass( 'ignore' );

// 		} else {
// 			$( '#config .style' ).val( 'static' );
// 		}
// 	}

// /********************网络配置，表单验证**************************/
// 	$.extend($.validator.messages, {
// 		required: "这是必填字段",
// 		ip: "输入格式不正确",
// 		mask: "网关不可达"
// 	});

// 	$.validator.addMethod( "ip", function( value, element, params ) {
// 		var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

// 		if( value === '' ) {
// 			return true;
// 		}

// 		return ipReg.test( value );

// 	}, "输入格式不正确");

// 	$.validator.addMethod( "mask", function( value, element, params ) {
// 		var ipArr = $( '#config input[name="ip"]' ).val().split( '.' ),
// 			gateway = $( '#config input[name="gateway"]' ).val(),
// 			gatewayArr = gateway .split( '.' ),
// 			netmaskArr = $( '#config input[name="netmask"]' ).val().split( '.' ),
// 			len = 4,
// 			i = 0;

// 		if( gateway  === '' ) {
// 			return true;
// 		}
// 		if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
// 			return false;
// 		}

// 		for( ; i < len; i++ ) {
// 			if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
// 				return false;
// 			}
// 		}

// 		return true;

// 	},"网关不可达");


// 	$( '#config' ).validate( {
// 	    rules: {
// 	    	device: 'required',
// 	      	ip: {
// 	        	required: true,
// 	        	ip: true
// 	     	},
// 	     	gateway: {
// 	        	ip: true,
// 			mask: true
// 	     	},
// 	     	netmask: {
// 	     		required: true,
// 	        	ip: true,
	        	
// 	     	},
// 	     	dns1: {
// 	     		ip: true
// 	     	},
// 	     	dns2: {
// 	     		ip: true
// 	     	}

// 	 	},
// 	 	ignore: '.ignore'
// 	} );

// 	$( '#config .submit' ).click( function(){
// 		var $submit = $( '#config .submit' ),
// 			$loading = $('#configModel .loading'),
// 			ip = $( '#config input[name="ip"]' ).val(),
// 			dhcpFlag = $( '#config .style' ).val() === 'dhcp' ? true : false,
// 			gateway = $( '#config input[name="gateway"]' ).val(),
// 			netmask = $( '#config input[name="netmask"]' ).val(),
// 			dns1 = $( '#config input[name="dns1"]' ).val(),
// 			dns2 = $( '#config input[name="dns2"]' ).val();

// 		if( $("#config").valid() ){
// 			$submit.attr( 'disabled', 'disabled' );
// 			$loading.show();

// 			requestAjax( 'changeNet?' + $('#config').serialize(), 'json', function( stateObj ) {
// 	   			if( stateObj.bizNo > 0 ) {
// 	   				//无论是否成功都去更新状态
// 	   				fillTalbeConfig( stateObj.netConf );
// 	   				mySlider.bootstrapSlider( 'setValue', stateObj.netConf.bandwidth );
// 	   				if( stateObj.netConfNo > 0 ) {
// 		            	$loading.hide();
// 		   				pop.success( '修改成功!' );
// 	   				} else {
// 	   					pop.error( '修改失败!' );
// 	   				}
// 	   			} else {
// 	   				pop.error( bizMsg );
// 	   			}
// 	   			$loading.hide();
//    				$( '#configModel' ).modal( 'hide' );
//    				$submit.removeAttr( 'disabled' );
// 			} )
// 		}
// 	} )
// } )




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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var projectListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var pageInfo = {
		perPage: 8,
		currentPage: 1
};

var Table = React.createClass( {displayName: "Table",
	getInitialState: function() {
		return {
			data: [],
			startIndex: 1
		}
	},
	componentDidMount: function() {
		//注册函数
		var updateState = function( pageInfo ) {
			this.setState( {
				data: pageInfo.checkerList,
				startIndex: ( pageInfo.pagenation.currentPage - 1 ) * pageInfo.pagenation.perPage
			} )
		};
		subscribe( updateState.bind( this ), projectListPub );
	},
    render: function() {
    	var lists = [],
    		colspan = 7,
    		startIndex = this.state.startIndex;

    	lists = this.state.data.map( function( list, index ) {
    		return React.createElement(TableCell, {key: index+1, startIndex: startIndex+index+1, rowNum: index, data: list})
    	} );
    	if( lists.length === 0 ) {
	    	lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
	    }
        return React.createElement("table", {className: "table table-bordered table-hover"}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, 
                            React.createElement("th", null, "序号"), 
                            React.createElement("th", null, "用户名"), 
                            React.createElement("th", null, "姓名"), 
                            React.createElement("th", null, "用户类型"), 
                            React.createElement("th", null, "漏洞库管理权限"), 
                            React.createElement("th", null, "添加时间"), 
                            React.createElement("th", null, "操作")
                        )
                    ), 
                    React.createElement("tbody", null, 
                        lists
                    )
               )
    }
} );

var TableCell = React.createClass( {displayName: "TableCell",
    render: function() {
        return  React.createElement("tr", null, 
        			React.createElement("td", null, this.props.startIndex), 
              		React.createElement("td", {className: "userName"}, this.props.data.userName), 
              		React.createElement("td", {className: "realName"}, this.props.data.realName), 
               		React.createElement("td", {className: "ps"}, this.props.data.userType), 
               		React.createElement("td", {className: "enableManageVulLib", "data-state": this.props.data.enableManageVulLib}, this.props.data.enableManageVulLib==1?'是':'否'), 
               		React.createElement("td", null, formateDate(this.props.data.addTime, 'YYYY-MM-DD hh:mm:ss')), 
               		React.createElement("td", {className: "operate", "data-index": this.props.rowNum}, 
               			React.createElement("a", {className: "account", href: "javascript:;"}, "修改账号"), 
               			React.createElement("a", {className: "permission", href: "javascript:;"}, "修改权限"), 
               			React.createElement("a", {className: "delete", href: "javascript:;"}, "删除")
               		)
                )
    }
} );

ReactDOM.render(
   React.createElement(Table, null),
   document.getElementById( 'table' )
)

var checkerListPagenation = pagenation.pagenation();
checkerListPagenation.init( {
	url: 'checker_list',
	isCache: true,
	perPage: pageInfo.perPage,
	successCb: function( pageList ) {
		var pagenation = pageList.pagenation;
		pageInfo = pagenation;
		projectListPub.deliver( pageList );

		if( pagenation.allNum > pagenation.perPage ) {
			pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
				checkerListPagenation.requestPage( page );
				pageInfo.currentPage = page;
			}, pagenation.currentPage  );
		} else {
			$( '#project-page' ).empty();
		}
	}
} );
checkerListPagenation.requestPage( pageInfo.currentPage );

/***************************************************************************/
function init() {
	var $addOrChangeModel = $( '#addOrChangeModel' ),
		$permissionModal = $( '#permissionModal' ),
		$form = $( '#addOrChange' ),
		$userName = $( '#addOrChangeModel input[name="userName"]' ),
		$realName = $( '#addOrChangeModel input[name="realName"]' ),
		$ps = $( '#addOrChangeModel input[name="ps"]' ),
		$confirmPs = $( '#addOrChangeModel input[name="confirmPs"]' ),
		$permissionItem = $( '#addOrChangeModel .permission-item' ),
		$submit = $( '#addOrChangeModel .submit' ),
		$modalTitle = $( '#addOrChangeModel .modal-title' ),
		$loading = $( '.loading' ),
		type; //add or update，标识是添加还是修改

	function ajax( url, successCb, errorCb, alwaysCb ) {
		successCb = successCb || function() {};
		errorCb = errorCb || function() {};
		alwaysCb = alwaysCb || function() {};

		url = url.indexOf( '?' ) > -1 ? ( url + '&' ) : ( url + '?' );
		url += '_=' + Math.random();

		$.ajax( {
			method: 'GET',
			url: url,
			dataType: 'JSON'
		} ).done( function( json ) {
			if( json.bizNo > 0 ) {
				successCb( json );
			} else {
				errorCb();
			}
		} ).fail( function() {
			pop.error( '请求发生错误!' );
		} ).always( function() {
			alwaysCb();
		} )
	}

	//执行失败回调函数
	function errorCb( errMsg ) {
		$loading.hide();
	}

	$( '.add' ).click( function() {
		$submit.text( '添 加' );
		$modalTitle.text( '添加检查员' );
		$userName.val( '' ).removeAttr( 'disabled' );
		$realName.val( '' ).removeAttr( 'disabled' );
		$ps.val( '' );
		$permissionItem.show().find( 'input' ).removeAttr( 'disabled' );
		$( '.forbid-bind' ).trigger( 'click' ); //默认检查员不能管理漏洞库
		$confirmPs.val( '' );
		type = 'add';
		$addOrChangeModel.modal( 'show' );
	} )

	$( '.table' ).delegate( '.account', 'click', function() {
		var $parentTr = $( '#table table tbody tr' ).eq( $( this ).parent().data( 'index' ) );

		//处理用户点击修改后直接取消修改
		$( '#table table tbody tr' ).removeClass( 'active' );
		$( this ).parents( 'tr' ).addClass( 'active' );

		$submit.text( '修 改' );
		$modalTitle.text( '修改检查员信息' );
		$userName.val( $( '.userName', $parentTr ).text() ).attr( 'disabled', 'disabled' );
		$realName.val( $( '.realName', $parentTr ).text() ).attr( 'disabled', 'disabled' );
		$ps.val( '' );
		$confirmPs.val( '' );

		$permissionItem.hide().find( 'input' ).attr( 'disabled', 'disabled' );

		type = 'account';

		$addOrChangeModel.modal( 'show' );
	} )

	function postData( url , param , successMsg ,errorMsg){
		$.ajax( {
			url: url,
			type: 'GET',
			data:param,
			dataType: 'JSON'
		} ).then( function( operateResult  ) {
			if( operateResult.bizNo > 0 ) {
				pop.success( successMsg );
				operateCheckerCb();
			} else {
				switch (operateResult.bizNo) {
					case -1:
						pop.error(errorMsg[1]);
						break;
					case -2:
						pop.error(errorMsg[2]);
						break;
					case -3:
						pop.error(errorMsg[3]);
						break;
					case -4:
						pop.error(errorMsg[4]);
						break;
					case -5:
						pop.error(errorMsg[5]);
						break;
					 default:

				}
				// pop.error( errorMsg );
				errorCb( operateResult.bizMsg);
			}
		}, function() {
			pop.error( errorMsg[0] );
			errorCb();
		} )
	};

	function getRsaKey( param , postUrl ,successMsg  ,errorMsg){
		$.ajax({
        type:"GET",
        url:'./rsa_key',
        success:function(res){
            console.log(res);
						console.log(param);
            var pwdKey = new RSAUtils.getKeyPair(res.exponent,"",res.modulus);
            var reversedPwd = param.ps.split("").reverse().join("");
						var reversedConPwd = param.confirmPs.split("").reverse().join("");
            param.ps = RSAUtils.encryptedString(pwdKey,reversedPwd);
					  param.confirmPs = RSAUtils.encryptedString(pwdKey,reversedConPwd);
						console.log(param);
						postData(postUrl , param ,successMsg , errorMsg );
        },
        error: function(result, status, xhr) {
        }
    });
	};



 /**
 * @update:[1] [2018-09-17] [宋丽娇] [对密码传输添加公钥加密]
 */
	$( '#addOrChangeModel .submit' ).click( function() {
		var successMsg,
			  errorMsg,
		  	url;
		 $userName.removeAttr( 'disabled' );
		 $realName.removeAttr( 'disabled' );

		if( !$( '#addOrChange' ).valid() ) {
			return false;
		}
		var userType = $('select[name="userType"]').val();
		var userName = $('input[name="userName"]').val();
 		var realName = $('input[name="realName"]').val();
 		var ps = $('input[name="ps"]').val();
 		var confirmPs = $('input[name = "confirmPs"]').val();
		var enableManageVulLib = $('input[name="enableManageVulLib"]:checked').val();
 		var param = {
 			userType:userType,
 			userName:userName,
 			realName:realName,
 		  	ps:ps,
 			confirmPs:confirmPs,
			enableManageVulLib:enableManageVulLib
 		};

		if( type === 'add' ) {
			successMsg = '添加成功!';
			errorMsg =['添加失败','用户名已存在','密码必须是数字、字符、特殊字符(~!@#$%^&*_)组合，且大于8位','新密码与确认密码不一致','密码不能包含用户名','session过期']
			console.log(param);
      getRsaKey(param , 'add_checker' , successMsg ,errorMsg);
		} else if( type === 'account' ){
			successMsg = '修改成功!';
	  	errorMsg =['修改失败','检查员不存在','密码必须是数字、字符、特殊字符(~!@#$%^&*_)组合，且大于8位','新密码与确认密码不一致','密码不能包含用户名','session过期']
			getRsaKey(param , 'change_checker' ,successMsg , errorMsg);
		} else {
			return false;
		}

		$addOrChangeModel.modal( 'hide' );
		$( '.loading' ).show();


	} )

	$("#addOrChange select").on("change",function(){

		let $this = $(this);
		if ($this.val() == "audit") {
$("#addOrChange input[value='0']").prop("checked",true);
			$("#addOrChange input[type='radio']").attr("disabled",true);
		}else{
			$("#addOrChange input[type='radio']").attr("disabled",false);
		}
	})

/******************************修改检查员权限开始******************************************/
	$( '.table' ).delegate( '.permission', 'click', function() {
		var $parentTr = $( '#table table tbody tr' ).eq( $( this ).parent().data( 'index' ) ),
			userName = $parentTr.find( '.userName' ).text();

		//设置检查员权限
		if( $( 'canManageVulLib', $parentTr ).data( 'state' ) == 1 ) {
			$( '#permissionModal .allow-bind' ).trigger( 'click' );
		} else {
			$( '#permissionModal .forbid-bind' ).trigger( 'click' );
		}

		$permissionModal.modal();
		$( '#permissionModal .ok' ).off().one( 'click', function() {
			changePermission( userName );
		} )
	} )

	//修改权限
	function changePermission( userName ) {
		var para = $( '#changePermission' ).serialize();

		$permissionModal.modal( 'hide' );
		$( '.loading' ).show();

		ajax( 'change_permission?userName=' + userName + '&' + para, function() {
			pop.success( '修改成功!' );
			operateCheckerCb();
		}, function() {
			pop.error( errorMsg );
		}, function() {
			$( '.loading' ).hide();
		} );
	}
/******************************修改检查员权限结束******************************************/

	$( '.table' ).delegate( '.delete', 'click', function() {
	  var $target = $( this ).parents( 'tr' ),
	    userName = $( '.userName', $target ).text(),
	    url;

	  pop.warning( '是否删除检查员' + userName + '?<br>此操作将会删除该检查员创建的所有项目, 请谨慎操作!' );
	  pop.on( '.ok', 'click', function() {
	  	url = 'delete_checker?userName=' + userName + '&_=' + Math.random();
	    deleteProject( url, function() {
	    	pop.success( '删除成功!' );
	    	$loading.show();
	    	operateCheckerCb();
	    }, function( errMsg ) {
	    	pop.error( errMsg );
	    	$loading.hide();
	    } );
	  } )
	} )

	//删除一个项目
	function deleteProject( ajaxUrl, successCb ) {
	  $.ajax( {
	    url: ajaxUrl,
	    type: 'GET',
	    dataType: 'JSON'
	  } ).then( function( operateResult  ) {
	    if( operateResult.bizNo > 0 ) {
	      //为了页码更新，如果删除的是当前页的最后一条，那么更新页面信息的时候
	      //就请求上一页
	      pageInfo.allNum = pageInfo.allNum - 1;
	      if( pageInfo.allNum < 0 ) {
	        pageInfo.allNum = 0;
	      }
	      successCb();
	    } else {
	      errorCb( operateResult.bizMsg );
	    }
	  }, function() {
	  	errorCb( '请求发生错误!' );
	  } )
	}

	//添加、删除、修改检查员的回调函数
	function operateCheckerCb() {
		var allPage = Math.ceil( pageInfo.allNum / pageInfo.perPage );

		//删除检查员时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
		if( allPage < pageInfo.currentPage ) {
			pageInfo.currentPage = pageInfo.currentPage - 1;
			if( pageInfo.currentPage < 1 ) {
				pageInfo.currentPage = 1;
			}
		}

		if( pageInfo.allNum >= 0 ) {
			checkerListPagenation.setOption( 'isCache', false );
			checkerListPagenation.requestPage( pageInfo.currentPage );
			checkerListPagenation.setOption( 'isCache', true );
		}
	}

	$.extend($.validator.messages, {
		required: "这是必填字段",
		equalTo: "两次输入密码不匹配"
	});

	$( '#addOrChange' ).validate( {
	    rules: {
	    	'userName': 'required',
	    	'realName': 'required',
	    	'ps': 'required',
	    	'enableManageVulLib': 'required',
	    	'confirmPs': {
	    		required: true,
	    		equalTo: "#ps"
	 		}
	 	}
	} );
}

init();


},{"../../../public/js-dev/pagenation":2,"../../../public/js-dev/pop":3}],2:[function(require,module,exports){
var pagenation = function() {
	var ret = {},
		pageCache = {},
		$mask = $( '.page-mask' ),
		$loadGif = $( '.loading' ),
		option = {};

	function throwError( content ) {
		throw new Error( content );
	}

	//请求数据成功的回调函数
	function success( pageInfo ) {
		if( option.isCache === true && pageCache[ pageInfo.pagenation.currentPage ] == null ) {
			pageCache[ pageInfo.pagenation.currentPage ] = deepCopy( pageInfo );
		}
		option.successCb( pageInfo );
		hideLoading();
	}

	//请求数据失败的回调函数
	function error() {
		hideLoading();
	}

	function showLoading() {
		$mask.show();
		$loadGif.show();
	}

	function hideLoading() {
		$mask.hide();
		$loadGif.hide();
	}
	
	function deepCopy (source) {
		var ret, key, i;
		
		if( $.type( source ) === 'object' ) {
			ret = {};
			for ( key in source) {
				ret[ key ] = deepCopy( source[ key ] );
		    }
		} else if( $.type( source ) === 'array' ) {
			ret = [];
			for( i = 0; i < source.length; i++ ) {
				ret[ i ] = deepCopy( source[ i ] );
			}
		} else {
			ret = source;
		}
		
		return ret;
	}

	ret = {
		init: function( originOption ) {
			if( !originOption.url ) {
				throwError( '请传入有效的数据请求URL' ); 
			}
			option.url = originOption.url;
			option.perPage = originOption.perPage || 10;
			option.isCache = originOption.isCache != null ?  !!originOption.isCache : true;
			option.successCb = originOption.successCb || function() {};
		},
		//设置参数，控制是否缓存，过滤时修改url
		setOption: function( attr, value ) {
			if( arguments.length !== 2 ) {
				return false;
			}
			option[ attr ] = value;
		},
		requestPage: function( page ) {
			var url,
				sign = '?';
					
			if( option.url.indexOf('?') > -1 ) {
				sign = '&';
			}
			url = option.url + sign + 'page=' + page + '&perPage=' + option.perPage + '&_=' + Math.random();
			
			showLoading();

			if( option.isCache === false ) {
				pageCache = {};
			}
			
			if( pageCache[ page ] != null ) {
				success( pageCache[ page ] );
				hideLoading();
			} else {
				$.ajax( {
					type: 'GET',
					url: url,
					dataType: 'JSON'
				} ).then( function( pageInfo ) {
					success( pageInfo );
				}, function() {
					error();
				} );
			}
		}
	};
	return ret;
}


module.exports.pagenation = pagenation;

},{}],3:[function(require,module,exports){
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
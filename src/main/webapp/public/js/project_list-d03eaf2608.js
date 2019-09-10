(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//项目列表发布者
var projectListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var pageInfo = {
    perPage: 15,
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
		var updateState = function( data ) {
			this.setState( {
				data: data.projectList,
				startIndex: ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage
			} )
		};
		subscribe( updateState.bind( this ), projectListPub );
	},
    render: function() {
    	var lists = [],
    		startIndex = this.state.startIndex,
        createTh = '',
        colspan;

      if( G.userType === 'admin' ) {
        colspan = 9;
        createTh = React.createElement("tr", null, 
                      React.createElement("th", null, "序号"), 
                      React.createElement("th", null, "项目名称"), 
                      React.createElement("th", null, "项目描述"), 
                      React.createElement("th", null, "执行方式"), 
                      React.createElement("th", null, "执行次数"), 
                      React.createElement("th", null, "项目状态"), 
                      React.createElement("th", null, "创建者"), 
                      React.createElement("th", null, "创建时间"), 
                      React.createElement("th", null, "操作")
                  )
      } else {
        colspan = 8;
        createTh = React.createElement("tr", null, 
                      React.createElement("th", null, "序号"), 
                      React.createElement("th", null, "项目名称"), 
                      React.createElement("th", null, "项目描述"), 
                      React.createElement("th", null, "执行方式"), 
                      React.createElement("th", null, "执行次数"), 
                      React.createElement("th", null, "项目状态"), 
                      React.createElement("th", null, "创建时间"), 
                      React.createElement("th", null, "操作")
                  )
      }

      lists = this.state.data.map( function( list, index ) {
        return React.createElement(TableCell, {key: list.projectID, index: startIndex+index+1, data: list})
      } );
      if( lists.length === 0 ) {
        lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
      }

      return React.createElement("table", {className: "table table-bordered table-hover"}, 
                  React.createElement("thead", null, 
                      createTh
                  ), 
                  React.createElement("tbody", null, 
                      lists
                  )
             )
    }
} );

var TableCell = React.createClass( {displayName: "TableCell",
    render: function() {
    	var flag = this.props.data.projectFlag === 1 ? '周期' : '单次';
      var createTd = '';
      if( G.userType === 'admin' ) {
        return React.createElement("tr", null, 
                React.createElement("td", null, this.props.index), 
                React.createElement("td", {className: "projectName"}, this.props.data.projectName), 
                React.createElement("td", {className: "ellipsis"}, this.props.data.describe), 
                React.createElement("td", null, flag), 
                React.createElement("td", null, this.props.data.times), 
                React.createElement("td", null, this.props.data.state), 
                React.createElement("td", null, this.props.data.checker), 
                React.createElement("td", null, this.props.data.createTime!='0'?formateDate(this.props.data.createTime, 'YYYY-MM-DD hh:mm:ss'):''), 
                React.createElement("td", {className: "operate"}, 
                  React.createElement("a", {href: "./project_detail?projectID="+this.props.data.projectID}, "详情"), 
                  React.createElement("a", {href: "javascript:;", className: "delete", "data-id": this.props.data.projectID}, "删除")
                )
              )
      } else {
        return React.createElement("tr", null, 
                    React.createElement("td", null, this.props.index), 
                    React.createElement("td", {className: "projectName"}, this.props.data.projectName), 
                    React.createElement("td", {className: "ellipsis"}, this.props.data.describe), 
                    React.createElement("td", null, flag), 
                    React.createElement("td", null, this.props.data.times), 
                    React.createElement("td", null, this.props.data.state), 
                    React.createElement("td", null, this.props.data.createTime!='0'?formateDate(this.props.data.createTime, 'YYYY-MM-DD hh:mm:ss'):''), 
                    React.createElement("td", {className: "operate"}, 
                      React.createElement("a", {href: "./project_detail?projectID="+this.props.data.projectID}, "详情"), 
                      React.createElement("a", {href: "javascript:;", className: "delete", "data-id": this.props.data.projectID}, "删除")
                    )
                  )
      }
    }
} );

ReactDOM.render( 
   React.createElement(Table, null),
   document.getElementById( 'table' )
)

//分页
var projectListPagenation = pagenation.pagenation();
projectListPagenation.init( {
  url: 'ajax_project_list',
  isCache: true,
  perPage: pageInfo.perPage,
  successCb: function( pageList ) {
    var pagenation = pageList.pagenation;
    pageInfo = pagenation;
    projectListPub.deliver( pageList );

    if( pagenation.allNum > pagenation.perPage ) {
      pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
        projectListPagenation.requestPage( page );
        pageInfo.currentPage = page;
      }, pagenation.currentPage  );
    } else {
      $( '#project-page' ).empty();
    }
  }
} );
projectListPagenation.requestPage( pageInfo.currentPage );


//删除项目点击事件
$( '.table' ).delegate( '.delete', 'click', function() {
  var $target = $( this ).parents( 'tr' ),
    projectID = $( this ).data( 'id' ),
    projectName = $( '.projectName', $target ).text(),
    $loading = $( '.loading' ),
    url;

  pop.warning( '是否删除项目: ' + projectName + '?<br>该项目包含的所有任务和报表都会被清除, 请谨慎操作!' );

  //为确定按钮绑定点击事件，删除项目并且弹出执行结果状态
  pop.on( '.ok', 'click', function() {
    url = 'delete_project?projectID=' + projectID + '&_=' + Math.random();
    deleteProject( url, function() {
      $loading.show();
      operateCb();
      pop.hide( function() {
        pop.success( '成功删除项目!' );
      } );
    }, function( errMsg ) {
      $loading.hide();
      pop.hide( function() {
        pop.error( errMsg );
      } );
    } );
  } );
} )


//删除一个项目
function deleteProject( url, successCb, errorCb ) {
  $.ajax( {
    url: url,
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
    errorCb( '操作失败!' );
  } )
}

//添加、删除、修改检查员的回调函数
function operateCb() {
  var allPage = Math.ceil( pageInfo.allNum / pageInfo.perPage );

  //删除项目时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
  if( allPage < pageInfo.currentPage ) {
    pageInfo.currentPage = pageInfo.currentPage - 1;
    if( pageInfo.currentPage < 1 ) {
      pageInfo.currentPage = 1;
    }
  }

  if( pageInfo.allNum >= 0 ) {
    projectListPagenation.setOption( 'isCache', false );
    projectListPagenation.requestPage( pageInfo.currentPage );
    projectListPagenation.setOption( 'isCache', true );
  }
}











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
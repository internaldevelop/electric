(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var taskListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var CONST = require( '../../../public/js-dev/const' );
var ifRequestConfig = false; //是否请求过配置信息
var pageInfo = {
    perPage: 15,
    currentPage: 1
};
var taskListPagenation = pagenation.pagenation();

var Table = React.createClass( {displayName: "Table",
	getInitialState: function() {
		return {
			data: []
		}
	},
	componentDidMount: function() {
		//注册函数
		var updateState = function( data ) {
			this.setState( {
				data: data.taskList
			} )
		};
		subscribe( updateState.bind( this ), taskListPub );
	},
    render: function() {
    	var lists = [],
        colspan = 9;      

      lists = this.state.data.map( function( list, index ) {
        return React.createElement(TableCell, {key: list.taskID, data: list})
      } );
      if( lists.length === 0 ) {
        lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
      }

     return React.createElement("table", {className: "table table-bordered table-hover"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                      React.createElement("th", null, "序号"), 
                      React.createElement("th", null, "进度"), 
                      React.createElement("th", null, "状态"), 
                      React.createElement("th", null, "开始时间"), 
                      React.createElement("th", null, "耗时"), 
                      React.createElement("th", null, "资产"), 
                      React.createElement("th", null, "漏洞"), 
                      React.createElement("th", {className: "text-left"}, "严重 | 高 | 中 | 低危"), 
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
      var vulKinds = [ {
          key: 'extremeHigh',
          zh: '严重'
        }, {
          key: 'high',
          zh: '高危'
        }, {
          key: 'mid',
          zh: '中危'
        }, {
          key: 'low',
          zh: '低危'
        } ],
        vulDetail = [],
        i, num, title;

      for( i = 0; i < vulKinds.length; i++ ) {
        num = this.props.data.vulCount[ vulKinds[ i ].key ];
        title =  vulKinds[ i ].zh;
        //最后一个无需加竖线
        if( i !== vulKinds.length - 1 ) {
          if( num !== 0 ) {
            vulDetail.push( React.createElement("span", {key: i}, React.createElement("span", {className: 'vul vul-'+vulKinds[ i ].key, title: title}, num), "|") );
          } else {
            vulDetail.push( React.createElement("span", {key: i}, React.createElement("span", {className: "vul", title: title}, "0"), "|") );
          }
        } else {
          if( num !== 0 ) {
            vulDetail.push( React.createElement("span", {key: i, className: 'vul vul-'+vulKinds[ i ].key, title: title}, num) );
          } else {
            vulDetail.push( React.createElement("span", {key: i}, React.createElement("span", {className: "vul", title: title}, "0")) );
          }
        }
      }

      return React.createElement("tr", null, 
              React.createElement("td", null, this.props.data.counts), 
              React.createElement("td", null, this.props.data.totalProgress + '%'), 
              React.createElement("td", null, this.props.data.state), 
              React.createElement("td", null, this.props.data.startTime!='0'?formateDate(this.props.data.startTime, 'YYYY-MM-DD hh:mm:ss'):''), 
              React.createElement("td", null, convertSecond(this.props.data.takingTime)), 
              React.createElement("td", null, this.props.data.properties), 
              React.createElement("td", null, this.props.data.vulCount.allNum), 
              React.createElement("td", null, React.createElement("span", {className: "vul-wrapper"}, vulDetail)), 
              React.createElement("td", {className: "operate"}, 
                React.createElement("a", {href: "./task_detail?projectID="+G.projectID+"&taskID="+this.props.data.taskID}, "详情"), 
                React.createElement("a", {href: "javascript:;", className: "delete", "data-id": this.props.data.taskID}, "删除"), 
                React.createElement("a", {href: "javascript:;", className: "send-form", "data-id": this.props.data.taskID}, "发送报表")
              )
            )
    }
} );

function init() {
  ReactDOM.render( 
     React.createElement(Table, null),
     document.getElementById( 'table' )
  )

  taskListPagenation.init( {
    url: 'task_page_list?projectID=' + G.projectID,
    isCache: false,
    perPage: pageInfo.perPage,
    successCb: function( pageList ) {
      var pagenation = pageList.pagenation;
      pageInfo = pagenation;

      //请求到数据后发布
      taskListPub.deliver( pageList );

      //如果有正在运行的任务，再次请求数据
      if( pageList.taskList[ 0 ] &&
          ( pageList.taskList[ 0 ].state === CONST.RUNNING || pageList.taskList[ 0 ].state === CONST.WAITING ) ) {
        lazyRequest();
      }

      if( pagenation.allNum > pagenation.perPage ) {
        pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
          taskListPagenation.requestPage( page );
          pageInfo.currentPage = page;
        }, pagenation.currentPage  );
      } else {
        $( '#project-page' ).empty();
      }
    }
  } );

  $( '.table' ).delegate( '.delete', 'click', function() {
    var taskID = $( this ).data( 'id' ),
      $loading = $( '.loading' ),
      url;

    pop.warning( '是否删除该任务?' );

    //为确定按钮绑定点击事件，执行项目并且弹出执行结果状态
    pop.on( '.ok', 'click', function() {
      url = 'delete_task?projectID=' + G.projectID + '&taskID=' + taskID + '&_=' + Math.random();
      deleteTask( url, function() {
        $loading.hide();
        operateCb();
        pop.hide( function() {
          pop.success( '删除任务成功!' );
        } );
      }, function( errMsg ) {
        $loading.hide();
        pop.hide( function() {
          pop.error( '删除任务失败!' );
        } );
      } );
    } )
  })

  //发送报表邮件点击功能
  $( '.table' ).delegate( '.send-form', 'click', function() {
    var taskID = $( this ).data( 'id' ),
      $loading = $( '.loading' ),
      url;

    $loading.show();
    $.ajax( {
      url: 'sendForm?projectID=' + G.projectID + '&taskID=' + taskID + '&_=' + Math.random(),
      dataType: 'JSON'
    } ).done( function( json ) {
      if( json.bizNo > 0 ) {
        pop.success( '发送成功!' );
      } else {
        pop.error( json.bizMsg );
      }
    } ).fail( function() {
      pop.error( '请求发生错误!' );
    } ).always( function() {
      $loading.hide();
    } )
  })

  //手动执行、查看配置按钮点击
  $( '.btn-group' ).delegate( '.c-btn', 'click', function() {
    if( $( this ).data( 'style' ) === 'exec' ) {
      execProject( function() {
        //更新项目列表
        operateCb();
      } );
    } else if( $( this ).data( 'style' ) === 'check-config' ) {
      checkConfig();
    }
  } )

  //请求任务列表
  taskListPagenation.requestPage( pageInfo.currentPage );

  //请求折线图
  requestChart();
}
init();

//删除一个项目
function deleteTask( url, successCb, errorCb ) {
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
    taskListPagenation.setOption( 'isCache', false );
    taskListPagenation.requestPage( pageInfo.currentPage );
    taskListPagenation.setOption( 'isCache', true );
  }

  requestChart();
}

/***************************************************************************/

//请求折线图数据
function requestChart() {
  function successCb( taskList ) {
    $charts = $( '#charts' );
    if( taskList.length === 0 ) {
      //暂无数据
      setNoData( $charts );
      $charts.css( 'height', 'auto' );
    } else {
      $charts.css( 'height', '' );
      formatChartsData( taskList );
    }
  }

  $.ajax( {
    url: 'task_list?projectID=' + G.projectID + '&_=' + Math.random(),
    type: 'GET',
    dataType: 'JSON'
  } ).then( function( data ) {
    if( data.bizNo === 1 ) {
      successCb( data.taskList );
    }
  }, function() {

  } )
}

//处理请求回的数据，并画图
function formatChartsData( data ) {
  var ret = {
      legend: ['总资产', '严重漏洞', '高危漏洞', '中危漏洞', '低危漏洞'],
      color: [ '#36c6d3', '#36c6d3', '#ffba10', '#f76521', '#f70501' ],
      xAxis: [],
      series: [ {
        name:'总资产',
        type:'line',
        itemStyle: {normal: {lineStyle: {color:'#36c6d3'}}},
        data:[]
      },
      {
        name:'低危漏洞',
        type:'line',
        stack: '总量',
        areaStyle: { normal: { color: '#36c6d3' } },
        itemStyle: {normal: {lineStyle: { color:'#36c6d3' } } },
        data:[]
      },
      {
        name:'中危漏洞',
        type:'line',
        stack: '总量',
        areaStyle: { normal: { color: '#ffba10' } },
        itemStyle: {normal: {lineStyle: { color:'#ffba10' } } },
        data:[]
      }, {
        name:'高危漏洞',
        type:'line',
        stack: '总量',
        areaStyle: { normal: { color: '#f76521' } },
        itemStyle: {normal: {lineStyle: { color:'#f76521' } } },
        data:[]
      }, {
        name:'严重漏洞',
        type:'line',
        stack: '总量',
        areaStyle: { normal: { color: '#f70501' } },
        itemStyle: {normal: {lineStyle: { color:'#f70501' } } },
        data:[]
      } ]
    },
    len = data.length,
    i;

  for( i = 0; i < len; i++ ) {
    ret.xAxis.push( formateDate( data[ i ].startTime, 'YYYY-MM-DD hh:mm:ss' ) );
    ret.series[ 0 ].data.push( data[ i ].properties );
    ret.series[ 1 ].data.push( data[ i ].vulCount.low );
    ret.series[ 2 ].data.push( data[ i ].vulCount.mid );
    ret.series[ 3 ].data.push( data[ i ].vulCount.high );
    ret.series[ 4 ].data.push( data[ i ].vulCount.extremeHigh );
  }
  
  drawCurve( 'charts', ret);
}

//echarts画堆叠图
function drawCurve( id, data ) {
  var myChart = echarts.init( document.getElementById( id ) );
  var option = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data: data.legend
    },
    color: data.color,
    calculable: true,
    animation: false,
    dataZoom : {
        show : true,
        realtime : true,
        start : 0,
        end : 100
    },
    xAxis: [
        {
            type : 'category',
            boundaryGap : false,
            data : data.xAxis
        }
    ],
    yAxis: [
        {
            type : 'value'
        }
    ],
    series: data.series
  };
  
  myChart.setOption( option );
}

/************************************************************************************/
// 如果是正在执行的任务，那么循环请求，直到任务执行完成
function lazyRequest() {
  var space = 5000;

  setTimeout( function() {
      operateCb();
  }, space );
}

function execProject( successCb, errorCb ) {
  var $target = $( this ).parents( 'tr' ),
    projectID = $( this ).data( 'id' ),
    projectName = $( '.projectName', $target ).text(),
    $loading = $( '.loading' ),
    url;

  pop.sure( '是否执行项目: ' + G.projectName + '?' );

  //为确定按钮绑定点击事件，执行项目并且弹出执行结果状态
  pop.on( '.ok', 'click', function() {
    $this = $( this );
    $this.attr( 'disabled', 'disabled' );
    url = 'exec_project?projectID=' + G.projectID + '&_=' + Math.random();

    $.ajax( {
      type: 'GET',
      url: url,
      dataType: 'JSON'
    } ).then( function( stateObj ) {
      $this.removeAttr( 'disabled' );
      if( stateObj.bizNo > 0 ) {
        if( stateObj.execNo > 0 ) {
          successCb();
          pop.hide( function() {
            pop.success( '执行项目成功!' );
          } );
        } else {
          pop.hide( function() {
            pop.error( '执行项目失败!' );
          } );
        }
      } else {
        pop.hide( function() {
          pop.error( stateObj.bizMsg );
        } );
      }
    }, function() {
      $this.removeAttr( 'disabled' );
      pop.hide( function() {
        pop.error( '请求发生错误!' );
      } );
    } )
  } );
}

//查看配置
function checkConfig() {
  var loading = $( '#config .config-loading' );

  loading.show();
  $( '#config' ).modal();
    
  if( ifRequestConfig == true ) {
    loading.hide();
  } else {
    //只显示数据的配置项，首先隐藏所有，后面再依次显示出来
    $( '.c-list' ).hide();

    $.ajax( {
      type: 'GET',
      url: 'project_config?projectID=' + G.projectID + '&_=' + Math.random(),
      dataType: 'JSON'
    } ).then( function( stateObj ) {
      if( stateObj.bizNo > 0 ) {
        ifRequestConfig = true;
        fillConfig( stateObj.content );
        $( '#config .modal-body' ).outerHeight( $( window ).height() - 200 + 'px' );
      } else {
        pop.error( stateObj.bizMsg );
      }
      loading.hide();
    }, function() {
      loading.hide();
      pop.error( '请求配置信息发生错误!' );
    } )
  }
}

function fillConfig( data ) {
  var ipArr = [],
    key, $name, $content, tmp;

  for( key in data ) {
    $name = $( '.' + key );
    $content = $( '.' + key + ' .c-content');
    switch ( key ) {
      case 'target':
        ipArr = data[ key ].match( /\S+/g );
        ipArr = ipArr.map( function( ip ) {
          return '<p>' + ip + '</p>';
        } );
        $content.html( ipArr.join( '' ) );
        $name.show();
        break;
      case 'protocol':
        if( data[ key ] === 'promis' ) {
          $content.text( 'TCP和UDP' );
        } else {
          $content.text( data[ key ] );
        }
        break;
      case 'scanType':
        tmp = data[ key ].replace( /(sA|sT|sF|sI|sM|sN|sS|sW|sX)/, 'TCP:' + '$1' ).replace( /(sU)/, 'UDP:' + '$1' ).replace( /(sY)/, 'SCTP:' + '$1' );
        if( tmp !== '' ) {
          $content.text( tmp );
          $name.show();
        }
        break;        
      //下面这些的操作是相同的，所以没有在每条后面加break
      case 'enableOsDetec': 
      case 'enableVersionDetec':
      case 'enableReboot':
      case 'enableChange':
        data[ key ] === 0 ? $content.text( '否' ) : $content.text( '是' );
        $name.show();
        break;
      case 'projectFlag':
        if( data[ key ] === 0 ) {
          $content.text( '一次性任务' );
        } else {
          $content.text( '周期性任务' );
          $( '.space .c-content' ).text( data.space ).show();
        }
        $name.show();
        break;
      case 'space':
        //不用进行任何操作，已经在projectFlag中处理了
        break;
      default:
        if( data[ key ] !== '' && data[ key ] != null ) {
          $content.text( data[ key ] );
          $name.show();
        }
        break;
    }
  } 
}




},{"../../../public/js-dev/const":2,"../../../public/js-dev/pagenation":3,"../../../public/js-dev/pop":4}],2:[function(require,module,exports){
var RUNNING = '正在执行'; //任务正在执行状态
var WAITING = '排队中'; //任务正在排队中


module.exports.RUNNING = RUNNING;
module.exports.WAITING = WAITING;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
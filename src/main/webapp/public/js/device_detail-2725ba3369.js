(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//项目列表发布者
var vulListPub = new Deliver();
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var isExploitAvailable = 1; //exploit扫描是否空闲
var isOpenvasAvailable = 1; //openvas扫描是否空闲
var isCheckingVul = false; //是否正在进行漏洞验证
var $running = $( '.loading' );
var requestError = '请求发生错误!';
var $exploit = $('.deep-scan [data-method="exploit"]');
var $openvas = $('.deep-scan [data-method="openvas"]');

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
				data: data
			} )
		};
		subscribe( updateState.bind( this ), vulListPub );
	},
  render: function() {
  	var lists = [],
  		startIndex = this.state.startIndex,
      createTh = '',
      colspan = 9;

    createTh = React.createElement("tr", null, 
                  React.createElement("th", null, "序号"), 
                  React.createElement("th", null, "网络服务"), 
                  React.createElement("th", null, "漏洞名称"), 
                  React.createElement("th", null, "漏洞类型"), 
                  React.createElement("th", null, "漏洞等级"), 
                  React.createElement("th", null, "修复建议"), 
                  React.createElement("th", null, "漏洞来源"), 
                  React.createElement("th", null, "验证状态"), 
                  React.createElement("th", null, "操作")
              )

    lists = this.state.data.map( function( list, index ) {
      return React.createElement(TableCell, {key: index, index: index+1, data: list})
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
      return React.createElement("tr", {"data-vulname": this.props.data.name , "data-vulId":this.props.data.vulID}, 
              React.createElement("td", null, this.props.index), 
              React.createElement("td", null, this.props.data.service), 
              React.createElement("td", null, this.props.data.name), 
              React.createElement("td", null, this.props.data.style), 
              React.createElement("td", null, this.props.data.grade), 
              React.createElement("td", null, this.props.data.solution), 
              React.createElement("td", null, this.props.data.source), 
              React.createElement("td", {className: "checked-state"}, this.props.data.checkedState), 
              React.createElement("td", {className: "operate" , "data-flag":this.props.data.flag}, 
                (this.props.data.hasCheckedScript == 1 || this.props.data.flag == 1) ?
                    React.createElement("a", {className: "check-vul", href: "javascript:;"}, "验证") : ''
              )
            )
    }
} );

/***********************************深度扫描开始***********************************/
//深度扫描按钮点击事件
$( '.deep-scan' ).delegate( 'button', 'click', function() {
  var $this = $( this ),
    scanMethod = $this.data( 'method' ),
    ip = G.ip;

  if( !isCheckingVul ) {
    //如果正在进行该扫描，就返回
    if( ( scanMethod === 'exploit' && isExploitAvailable === -1 ) ||
        ( scanMethod === 'openvas' && isOpenvasAvailable === -1 ) ) {
        return false;
    }

    pop.sure( '是否进行' + scanMethod + '漏洞扫描?' );
    pop.on( '.ok', 'click', function() {
      pop.hide( function() {
        var para = getIDs() + '&scanMethod=' + scanMethod;

        //开始深度扫描
        deepVulScan( para, function() {
            //当两个值都是空闲的采取执行loop函数，否则说明已经有执行过漏洞扫描
            if( isExploitAvailable === 1 && isOpenvasAvailable === 1 ) {
              loopCheckVulScan();
            }

            if( scanMethod === 'exploit' ) {
              isExploitAvailable = -1;
            } else if( scanMethod === 'openvas' ) {
              isOpenvasAvailable = -1;
            }

          }, function ( errorMsg ) {
            pop.error( errorMsg );
            $this.removeAttr( 'disabled' );
        } );
      } );
      $this.attr( 'disabled', 'disabled' );
    } );
  }
} )

//深度漏洞扫描
function deepVulScan( para, successCb, errorCb ) {
  $.ajax( {
    method: 'GET',
    url: 'deepVulScan?' + para + '&_=' + Math.random(),
    dataType: 'JSON'
  } ).then( function( json ) {
    if( json.bizNo > 0 ) {
      successCb && successCb();
    } else {
      errorCb && errorCb( json.bizMsg );
    }
  }, function() {
    errorCb( requestError );
  } )
}

//请求是否有漏洞扫描程序在执行
function loopCheckVulScan() {
  var timeSpace = 5000;

  $running.show();

  setTimeout( function checkVulScan() {
    $.ajax( {
      method: 'GET',
      url: 'vul_scan_state?_=' + Math.random()
    } ).then( function( json ) {
      if( json.bizNo > 0 ) {
        updateVulScanState( json.stateMap );

        //如果有正在执行的扫描，继续更新状态
        if( json.stateMap.isExploitAvailable === -1 || json.stateMap.isOpenvasAvailable === -1 ) {
          setTimeout( checkVulScan, timeSpace );
        }
      } else {
        pop.error( json.bizMsg );
        finishVulScan();
      }
    }, function() {
      pop.error( requestError );
      finishVulScan();
    } )
  }, timeSpace );
}

//漏洞扫描结束
function finishVulScan() {
  $running.hide();
  isExploitAvailable = 1;
  isOpenvasAvailable = 1;

  $exploit.removeAttr( 'disabled' );
  $openvas.removeAttr( 'disabled' );
}

//漏洞状态已更新
function updateVulScanState( stateMap ) {
  updateVulList( G.ip );

  if( stateMap.isExploitAvailable === 1 && stateMap.isOpenvasAvailable === 1 ) {
     $running.hide();
  }

  //上次是非空闲的，本次是空闲的就去掉该按钮的禁用
  if( isExploitAvailable === -1 && stateMap.isExploitAvailable === 1 ) {
    $exploit.removeAttr( 'disabled' );
  }
  if( isOpenvasAvailable === -1 && stateMap.isOpenvasAvailable === 1 ) {
    $openvas.removeAttr( 'disabled' );
  }

  isExploitAvailable = stateMap.isExploitAvailable;
  isOpenvasAvailable = stateMap.isOpenvasAvailable;
}

//更新漏洞列表
function updateVulList( ip, cb ) {
  requestVulList( ip, function( vulList ) {
    vulListPub.deliver( vulList );
    cb && cb();
  } );
}

//请求漏洞列表
function requestVulList( ip, successCb, errorCb ) {
  var url = 'vul_list?' + getIDs() + '&_=' + Math.random();
      
  $.ajax( {
    method: 'GET',
    url: url,
    dataType: 'JSON'
  } ).then( function( json ) {
    if( json.bizNo > 0 ) {
      successCb && successCb( json.vulList );
    } else {
      errorCb && errorCb( json.bizMsg );
    }
  }, function() {
    pop.error( requestError );
  } );
}
/***********************************深度扫描结束***********************************/

/***********************************漏洞验证开始***********************************/
var verifyVulObj = ( function( $par, $modal ) {
  var ret;

  //循环检查漏洞验证是否结束，没有结束则定时检查
  function loopCheckVerifyState( finishCb ) {
    var timespace = 5000,
      url = 'check_verify_state?' + getIDs() + '&vulName=' + ret.vulName;

    finishCb = finishCb || function() {};

    setTimeout( function checkVerifyState() {
      $.ajax( {
        method: 'GET',
        url: url + '&_=' + Math.random()
      } ).then( function( json ) {
        if( json.bizNo > 0 ) {
          if( json.verifyState != 1 ) {
            finishCb( json.verifyState );
          } else {
            setTimeout( checkVerifyState, timespace );
          }
        } else {
          finishCb();
        }
      }, function() {
        pop.error( requestError );
        finishCb();
      } );
    }, timespace );
  }

  //获取漏洞脚本
  function getVerifyPara( vulName, successCb ,flag,vulId ) {
    $running.show();
    if (flag == 1) {
        $.ajax({
          url: './make_use_vul?'+getIDs()+'&vulId='+vulId+ '&_=' + Math.random(),
          type: 'get',
          dataType: 'json',
        })
        .done(function(json) {
              if (json.bizNo > 0) {
                pop.success( "验证成功" );
                updateVulList(G.ip);
              }   else{
                pop.error(json.bizMsg);
              }
        })
        .fail(function() {
          pop.error( requestError );
        })
        .always(function() {
           $running.hide();
        });
        
    }else{
           $.ajax( {
        method: 'GET',
        url: 'verify_parameter?' + getIDs() + '&vulName=' + vulName + '&_=' + Math.random(),
        dataType: 'JSON'
      } ).done( function( json ) {
        if( json.bizNo > 0 ) {
          //生成用户需填写的内容
          successCb( json.parameter );
        } else {
          pop.error( json.bizMsg );
        }
      } ).fail( function() {
        pop.error( requestError );
      } ).always( function() {
        $running.hide();
      } );
    }
 
  }

  ret = {
    vulName: '',
    $form: $( '#verifyVul' ),
    $allItem: $( '.table .tbody tr' ),
    $activeIndex: -1,
    lastParam: [],
    init: function() {
      $.extend($.validator.messages, {
        required: "这是必填字段"
      });

      ret.$form.validate( {
        rules: {},
        ignore: '.ignore'
      } );

      $par.delegate( '.check-vul', 'click', function( e ) {
        var $activeTr = $( this ).parent().parent();
        var flag = $(this).parent().data("flag");
         ret.vulId  = $activeTr.data( 'vulid' );
        if( !isCheckingVul ) {
          ret.$activeIndex = $activeTr.index();
          ret.vulName = $activeTr.data( 'vulname' );
          $( '.table tbody tr' ).removeClass( 'active' );

          if( isExploitAvailable === 1 && isOpenvasAvailable === 1 && !isCheckingVul ) {
            getVerifyPara( ret.vulName, function( paraList ) {
              ret.removeValid();
              ret.makeModalContent( paraList );
              ret.addValid( paraList.param );
            } , flag , ret.vulId);
          }

          //绑定确定按钮点击事件
          $( '.submit', $modal ).off().on( 'click', function() {
            if( ret.$form.valid() ) {
              $( '.submit', $modal ).off();
              $modal.modal('hide');
              ret.verifyVul( $( '#verifyVul' ).serialize() );
            }
          } );
        } else {
          e.preventDefault();
        }
      } );
    },
    makeModalContent: function( parameter ) {
      var $formBody = $( '#verifyVul' ),
        item = '',
        htmlStr = '',
        i, j, temp;

      if( parameter.param.length > 0 ) {
        $formBody.html( '' );

        //生成参数列表
        for( i = 0; i < parameter.param.length; i++ ) {
          temp = parameter.param[ i ];
          //生成input元素
          item = '<input name="' + temp.name + '" type="text" class="form-control" placeholder="' + temp.defaultValue + '">';
          htmlStr += '<div class="form-group">' +
                  '<label class="col-md-3 control-label">' + temp.name +
                        '<span class="required" aria-required="true">* </span>' +
                  '</label>' +
                  '<div class="col-md-7">' +
                        item +
                  '</div>' +
                 '</div>';
        }

        //生成payload
       console.log(parameter);
       if (parameter.payload.length == 0) {
       	 	 item = '<select name="payload" class="form-control" disabled></select>';
       }else{
       	 item = '<select name="payload" class="form-control">';
	        for( i = 0; i < parameter.payload.length; i++ ) {
	          temp = parameter.payload[ i ];
	          item += '<option value="' + temp +'">' + temp + '</option>';
	        }
        	item += '</select>';
       }
      

        htmlStr += '<div class="form-group">' +
                  '<label class="col-md-3 control-label">' + 'payload' + 
                  '</label>' +
                  '<div class="col-md-7">' +
                        item +
                  '</div>' +
                 '</div>';

        $formBody.html( htmlStr );
        $modal.modal();
      }
    },
    //移除表单验证规则
    removeValid: function() {
      var param;

      //移除旧规则
      while( param = ret.lastParam.shift() ) {
        $( 'input[name="' + param + '"]' ).rules( 'remove' );
      }
    },
    //添加表单验证
    addValid: function( paraList ) {
      var param, i;

      //添加新规则
      for( i = 0; i < paraList.length; i++ ) {
        param = paraList[ i ].name;
        $( 'input[name="' + param + '"]' ).rules( 'add', { required: true } ); 
        ret.lastParam.push( param );
      }
    },
    //验证漏洞
    verifyVul: function( parameter ) {
      $.ajax( {
        method: 'GET',
        url: 'verify_vul?' + getIDs() + '&vulName=' + ret.vulName + '&' + parameter +'&_=' + Math.random(),
        dataType: 'JSON'
      } ).then( function( json ) {
        if( json.bizNo > 0 ) {
          /*
           * 调用updateVulList会更新漏洞列表，因此保留的是ret.$activeIndex，
           * 而不是保存的dom引用，此处假设更新后漏洞列表的顺序不会发生改变，
           * 比较好的做法根据漏洞名称来标识哪一列应该被选中
          */
          updateVulList( G.ip, function() {
            $running.show();
            isCheckingVul = true;
            $par.find( '.check-vul' ).addClass( 'disabled' );
            $par.find( 'tbody tr' ).eq( ret.$activeIndex ).addClass( 'active' );

            //检查漏洞验证是否结束
            loopCheckVerifyState( function( verifyState ) {
              if( verifyState && ret.$activeIndex != -1 ) {
                updateVulList( G.ip );
              }

              $running.hide();
              isCheckingVul = false;
              ret.vulName = '';
              ret.$activeIndex = -1;
              $par.find( '.check-vul' ).removeClass( 'disabled' );
            } );
          } )
        } else {
          pop.error( json.bizMsg );
        }
      }, function() {
        pop.error( requestError );
      } );
    }
  }

  return ret;
} )( $( '#table' ), $( '#checkVulModel' ) );
/***********************************漏洞验证结束***********************************/

//添加projectID和taskID
function getIDs() {
  return 'projectID=' + G.projectID + '&taskID=' + G.taskID + '&ip=' + G.ip;
}

( function init() {
  //生成漏洞列表表格
  ReactDOM.render( 
    React.createElement(Table, null),
    document.getElementById( 'table' )
  )

  //请求漏洞列表数据
  updateVulList( G.ip );

  //初始化漏洞验证程序
  verifyVulObj.init();
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
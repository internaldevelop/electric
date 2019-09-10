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

var Table = React.createClass( {
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

    createTh = <tr>
                  <th>序号</th>
                  <th>网络服务</th>
                  <th>漏洞名称</th>
                  <th>漏洞类型</th>
                  <th>漏洞等级</th>
                  <th>修复建议</th>
                  <th>漏洞来源</th>
                  <th>验证状态</th>
                  <th>操作</th>
              </tr>

    lists = this.state.data.map( function( list, index ) {
      return <TableCell key={index} index={index+1} data={list}/>
    } );
    if( lists.length === 0 ) {
      lists = [ <tr key="0"><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
    }

    return <table className='table table-bordered table-hover'>
                  <thead>
                      {createTh}
                  </thead>
                  <tbody>
                      {lists}
                  </tbody>
             </table>
  }
} );

var TableCell = React.createClass( {
    render: function() {
      return <tr data-vulname={this.props.data.name}>
              <td>{this.props.index}</td>
              <td>{this.props.data.service}</td>
              <td>{this.props.data.name}</td>
              <td>{this.props.data.style}</td>
              <td>{this.props.data.grade}</td>
              <td>{this.props.data.solution}</td>
              <td>{this.props.data.source}</td>
              <td className="checked-state">{this.props.data.checkedState}</td>
              <td className="operate">
                {this.props.data.hasCheckedScript == 1 ?
                    <a className="check-vul" href="javascript:;">验证</a> : ''}
              </td>
            </tr>
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
  function getVerifyPara( vulName, successCb ) {
    $running.show();

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

        if( !isCheckingVul ) {
          ret.$activeIndex = $activeTr.index();
          ret.vulName = $activeTr.data( 'vulname' );
          $( '.table tbody tr' ).removeClass( 'active' );

          if( isExploitAvailable === 1 && isOpenvasAvailable === 1 && !isCheckingVul ) {
            getVerifyPara( ret.vulName, function( paraList ) {
              ret.removeValid();
              ret.makeModalContent( paraList );
              ret.addValid( paraList.param );
            } );
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
        item = '<select name="payload" class="form-control">';
        for( i = 0; i < parameter.payload.length; i++ ) {
          temp = parameter.payload[ i ];
          item += '<option value="' + temp +'">' + temp + '</option>';
        }
        item += '</select>';

        htmlStr += '<div class="form-group">' +
                  '<label class="col-md-3 control-label">' + 'payload' +
                        '<span class="required" aria-required="true">* </span>' +
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
    <Table />,
    document.getElementById( 'table' )
  )

  //请求漏洞列表数据
  updateVulList( G.ip );

  //初始化漏洞验证程序
  verifyVulObj.init();
} )();
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

var taskDetailPub = new Deliver();
var deviceListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var chart = require( './task_chart' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var CONST = require( '../../../public/js-dev/const' );
var deviceListPagenation;
var searchKw = ''; //搜索关键字
var sortKw = 'ip'; //排序关键字,ip、style、brand
var sortStyle = 'asc';//升序：asc，降序desc
var pageInfo = {
  currentPage: 1,
  perPage: 15
}

// 设备列表组件
var Table = React.createClass( {
	getInitialState: function() {
		return {
			data: [],
			startIndex: 1
		}
	},
	componentDidMount: function() {
		// 注册函数
		var updateState = function( pageInfo ) {
			this.setState( {
				data: pageInfo.deviceList,
				startIndex: ( pageInfo.pagenation.currentPage - 1 ) * pageInfo.pagenation.perPage
			} )
		};
		subscribe( updateState.bind( this ), deviceListPub );
	},
  render: function() {
  	var lists = [],
  		startIndex = this.state.startIndex,
      colspan = 8;

  	lists = this.state.data.map( function( list, index ) {
  		return <TableCell key={index+1} index={startIndex+index+1} data={list}/>
  	} );

    if( lists.length === 0 ) {
      lists = [ <tr key="0"><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
    }


      return <table className='table table-bordered table-hover'>
                  <thead>
                      <tr>
                          <th>序号</th>
                          <th className="sort sort_asc" data-sortkw="ip" data-sortstyle="asc">IP</th>
                          <th>设备类型</th>
                          <th>品牌型号</th>
                          <th>服务数量</th>
                          <th className="sort" data-sortkw="vulCount" data-sortstyle="desc">漏洞数量</th>
                          <th className="text-left">严重 | 高 | 中 | 低危</th>
                          <th>操作</th>
                      </tr>
                  </thead>
                  <tbody>
                      {lists}
                  </tbody>
             </table>
  }
} );

var TableCell = React.createClass( {
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
          vulDetail.push( <span key={i}><span className={'vul vul-'+vulKinds[ i ].key} title={title}>{num}</span>|</span> );
        } else {
          vulDetail.push( <span key={i}><span className='vul' title={title}>0</span>|</span> );
        }
      } else {
        if( num !== 0 ) {
          vulDetail.push( <span key={i} className={'vul vul-'+vulKinds[ i ].key} title={title}>{num}</span> );
        } else {
          vulDetail.push( <span key={i}><span className='vul' title={title}>0</span></span> );
        }
      }
    }
    return  <tr>
      			<td>{this.props.index}</td>
            		<td>{this.props.data.ip}</td>
             		<td>{this.props.data.style}</td>
             		<td>{this.props.data.brand}</td>
                <td>{this.props.data.serviceCount}</td>
             		<td>{this.props.data.vulCount.allNum}</td>
             		<td><span className="vul-wrapper">{vulDetail}</span></td>
             		<td className="operate">
             			<a href={"./device_detail?projectID="+G.projectID+"&taskID="+G.taskID+'&ip='+this.props.data.ip}>详情</a>
             		</td>
            </tr>
  }
} );

// 概览信息组件
var Basic = React.createClass( {
  getInitialState: function() {
    return {
      startTime: '',
      takingTime: '',
      realBandWidth: 0,
      counts: ''
    }
  },
  componentDidMount: function() {
    // 注册函数
    var updateState = function( data ) {
      this.setState( {
        state: data.state,
        deviceNum: data.deviceNum,
        vulNum: data.vulNum,
        videoNum: data.videoNum,
        startTime: data.startTime,
        takingTime: data.takingTime,
        counts: data.counts,
        totalProgress: data.totalProgress,
        realBandWidth: data.realBandWidth
      } )
    };
    subscribe( updateState.bind( this ), taskDetailPub );
  },
  render: function() {
    var remainingTime = 0,
      bandWidth = this.state.realBandWidth;

    if( this.state.state !== CONST.RUNNING ) {
      remainingTime = this.state.state;
    } else if( this.state.totalProgress === 0 ) {
      remainingTime = '>1小时';
    } else {
      remainingTime = '约' + convertSecond( Math.ceil( this.state.takingTime / this.state.totalProgress * ( 100 - this.state.totalProgress ) ) );
    }

    if( bandWidth > 100 ) {
      bandWidth = bandWidth.toFixed( 0 );
    } else if( bandWidth != 0 ) {
      bandWidth = bandWidth.toFixed( 2 );
    }

    return <ul className="basic clear">
              <li>存活主机: <em>{this.state.deviceNum||0}</em>个</li>
              <li>监控设备: <em>{this.state.videoNum||0}</em>个</li>
              <li>漏洞: <em>{this.state.vulNum||0}</em>个</li>
              <li>流量: <em>{bandWidth}</em>KB</li>
              <li>耗时: {convertSecond(this.state.takingTime)}</li>
              <li>剩余时间: {remainingTime}</li>
              <li>开始时间: <span>{formateDate(this.state.startTime, 'YYYY-MM-DD hh:mm:ss')}</span></li>
              <li>序号: <span>{this.state.counts}</span></li>
           </ul>
  }
} );

// 进度条组件
var Progress = React.createClass( {
  getInitialState: function() {
    return {
      progressAry: []
    }
  },
  componentDidMount: function() {
    // 注册函数
    var updateState = function( data ) {
      this.setState( {
        progressAry: data.progress
      } )
    };
    subscribe( updateState.bind( this ), taskDetailPub );
  },
  render: function() {
    var children = [],
      progressAry = this.state.progressAry;

    children = this.state.progressAry.map( function( item, index ) {
      return <li key={index}>
                <p className="title">{item.name}</p>
                <div className="bar-wrapper">
                  <div className="bar" style={{width:item.value+'%'}}></div>
                </div>
             </li>
    } )
    return <ul className="c-progress clear">
            {children}
           </ul>
  }
} );

//错误信息组件
var ErrMsg = React.createClass( {
  getInitialState: function() {
    return {
      errAry: []
    }
  },
  componentDidMount: function() {
    // 注册函数
    var updateState = function( data ) {
      this.setState( {
        errAry: data.errorList
      } )
    };
    subscribe( updateState.bind( this ), taskDetailPub );
  },
  render: function() {
    var children = [],
      errAry = this.state.errAry || [];

    children = errAry.map( function( item, index ) {
      return <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className={"alert fade in error-" + item.errorType}>{item.errorMsg}</div>
             </div>
    } )
    return <div className="row">
            {children}
           </div>
  }
} );

//报表组件
var ReportForm = React.createClass( {
  getInitialState: function() {
    return {
      reportFormPath: ''
    }
  },
  componentDidMount: function() {
    // 注册函数
    var updateState = function( data ) {
      this.setState( {
        reportFormPath: data.reportFormPath
      } )
    };
    subscribe( updateState.bind( this ), taskDetailPub );
  },
  render: function() {
    if( this.state.reportFormPath !== '' ) {
      return <button className="c-btn">
              <a href={this.state.reportFormPath} target="_blank">
                任务报表
              </a>
              </button>
    }
    return <button className="c-btn" disabled>
                任务报表
              </button>
  }
} );


// 初始化函数
function init() {

  // 渲染任务概览信息和进度信息
  ReactDOM.render( 
    <Table />,
    document.getElementById( 'table' )
  )
  ReactDOM.render( 
    <Basic />,
    document.getElementById( 'basic' )
  )
  ReactDOM.render( 
    <Progress />,
    document.getElementById( 'progress' )
  )
  ReactDOM.render(
    <ErrMsg />,
    document.getElementById( 'errMsg' )
  )

  ReactDOM.render(
    <ReportForm />,
    document.getElementById( 'reportForm' )
  )


  // 请求概览信息
  requestBaskInfo( function( basicInfo ) {
  	// 请求概览信息成功回调
    taskDetailPub.deliver( basicInfo.overview );
    drawAllCharts( basicInfo.statistics );

    // 如果是正在运行的任务那么就执行running函数
    if( basicInfo.overview.state === CONST.RUNNING ||
        basicInfo.overview.state === CONST.WAITING ) {
      lazyRequest();
      $( '.ctrl .progress-wrapper' ).addClass( 'running' );
      //为停止按钮绑定点击事件
      bindStopTaskBtn( $( '.btn-stop' ) );
    }

    $( '.ctrl .progress-wrapper .number em' ).text( basicInfo.overview.totalProgress );
  } );

  // 设备列表分页信息
  deviceListPagenation = pagenation.pagenation();
  deviceListPagenation.init( {
    url: getPageListURL(),
    isCache: true,
    perPage: 15,
    successCb: function( pageList ) {
      var pagenation = pageList.pagenation;
      $( '.deviceNum em' ).text( pagenation.allNum ); //更新设备总数显示
      deviceListPub.deliver( pageList );
      if( pagenation.allNum > pagenation.perPage ) {
         pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
           deviceListPagenation.requestPage( page )
           pageInfo.currentPage = page;
         }, pagenation.currentPage  );
      } else {
         pageInfo.currentPage = 1;
        $( '#project-page' ).empty();
      }
    }
  } );
  deviceListPagenation.requestPage( pageInfo.currentPage );

  //过滤和搜索
  $( '.btn-search' ).click( function() {
    searchKw = $( '.kw' ).val();
    updateSortOrFilter();
  } )
  $( '.kw' ).on( 'keypress', function( e ) {
    //回车键直接搜索
    if( e.keyCode === 13 ) {
      searchKw = $( '.kw' ).val();
      updateSortOrFilter();
    }
  } );

  var $sortTh = $( '.sort' );
  $( '.table thead' ).delegate( '.sort', 'click', function() {
    $this = $( this );

    //和上一次点击的是同一个按钮，就调整排序顺序
    if( sortKw === $this.data( 'sortkw' ) ) {
      if( sortStyle === 'asc' ) {
        sortStyle = 'desc';
      } else {
        sortStyle = 'asc';
      }
    } else {
      sortStyle = $this.data( 'sortstyle' ) || 'asc';
    }

    $sortTh.removeClass( 'sort_asc sort_desc' );
    $this.addClass( 'sort_' + sortStyle );

    sortKw = $this.data( 'sortkw' );
    updateSortOrFilter();

  } )
}

//过滤或更新操作时，重新请求数据
function updateSortOrFilter() {
    deviceListPagenation.setOption( 'isCache', false );
    deviceListPagenation.setOption( 'url', getPageListURL() );
    deviceListPagenation.requestPage( pageInfo.currentPage );
    deviceListPagenation.setOption( 'isCache', true );
}

function bindStopTaskBtn( $btn ) {
  //停止任务成功
  function successCb() {
    pop.success( '停止任务成功!' );
    disabledStopTaskBtn( $btn );
  }

  //停止任务失败
  function errorCb( errMsg ) {
    pop.error( errMsg );
    $btn.removeAttr( 'disabled' );
  }

  $btn.removeAttr( 'disabled' );
  $btn.click( function() {
    var url = 'stop_task?projectID=' + G.projectID + '&taskID=' + G.taskID + '&_=' + Math.random();
    stopTask( url, successCb, errorCb );
  } );
}

//获取分页请求的url
function getPageListURL() {
  return 'device_list?projectID=' + G.projectID +
    '&taskID=' + G.taskID +
    '&searchKw=' + searchKw +
    '&sortKw=' + sortKw +
    '&sortStyle=' + sortStyle;
}

//停止任务
function stopTask( url, successCb, errorCb ) {
  pop.warning( '是否停止任务?' );
  pop.on( '.ok', 'click', function() {
    $( this ).attr( 'disabled', 'disabled' );

    $.ajax( {
      type: 'GET',
      url: url,
      dataType: 'JSON'
    } ).then( function( stateObj ) {
      if( stateObj.bizNo < 0 ) {
        pop.hide( function() {
          $( '#popModal .ok' ).removeAttr( 'disabled' );
          errorCb( stateObj.bizMsg );
        } )
      } else {
        pop.hide( function() {
          $( '#popModal .ok' ).removeAttr( 'disabled' );
          successCb();
        } )
      }
    }, function() {
      pop.hide( function() {
          $( '#popModal .ok' ).removeAttr( 'disabled' );
          errorCb( '请求发生错误!' );
        } )
    } );
  } )
}

//解除停止按钮点击事件并禁止
function disabledStopTaskBtn( $btn ) {
  $btn.attr( 'disabled', 'disabled' ).off();
}

// 请求任务概览信息
function requestBaskInfo( successCb ) {
  $.ajax( {
    url: 'ajax_task_detail?projectID=' + G.projectID + '&taskID=' + G.taskID + '&_=' + Math.random(),
    type: 'GET',
    dataType: 'JSON'
  } ).then( function( basicInfo ) {
    if( basicInfo.bizNo > 0 ) {
     successCb( basicInfo );
    }
  } )
}

//画统计图，生成echarts格式数据，给定饼图和柱状图颜色
function drawAllCharts( statistics ) {
  var noDataHeight = '50px', //没有数据时，noda区域的高度
    normalColor = [ '#36c6d3', '#659be0', '#ed6b75', '#8775a7' ],
    deviceTypeKey = [ '摄像机', 'NVR/DVR', '其它' ],
    osTypeKey = [],
    vulDeviceKey = [ '漏洞设备', '正常设备' ],
    vulLevelKey = [ '严重', '高危', '中危', '低危' ],
    vulLevelColor = [ '#f70501', '#f76521', '#ffba10', '#36c6d3' ],
    barData, $dom, key;

  //判断是否是空对象
  function isEmptyObject( obj ) {
    var type = typeof obj;
    if( type === 'undefined' || type === 'function' ||
        type === 'string' || type === 'number' || type === 'boolean' ) {

      return false;
    }

    for( var key in obj ) {
      if( obj.hasOwnProperty( key ) ) {
        return false;
      }
    }

    return true;
  }

  //@param {string} idStr: 画图区域id标识
  //@param {array} sortKey: 饼图顺序关键字
  //@param {object} srcData: 原始数据
  //@param {array} color: 饼图颜色关键字，和顺序是一一对应的，为空就是用默认颜色且不与顺序关键字对应
  function drawPie( idStr, sortKey, srcData, color ) {
    var $dom = $( '#' + idStr ),
      pieData = [],
      pieColor = [],
      isNeedColor = color != null,
      color = color || normalColor,
      i;

    $dom.css( 'height', '' );

    if( sortKey.length > 0 ) {
      //传入了排序关键字

      //数据为空就添加“暂无数据”提示，按照deviceTypeKey生成有序数据
      for( i = 0; i < sortKey.length; i++ ) {
        if( srcData[ sortKey[ i ] ] > 0 ) {
          pieData.push( {
            name: sortKey[ i ],
            value: srcData[ sortKey[ i ] ]
          } );
          if( isNeedColor ) {
            pieColor.push( color[ i ] );
          }
        }
      }
    } else {
      //没有传入排序关键字

      for( i in srcData ) {
        if( srcData[ i ] > 0 ) {
          pieData.push( {
            name: i,
            value: srcData[ i ]
          } )
        }
      }
    }
    

    if( pieData.length > 0 ) {
      if( isNeedColor ) {
        chart.drawPie( idStr, pieData, pieColor );
      } else {
        chart.drawPie( idStr, pieData, color );
      }
    } else {
      $dom.css( 'height', noDataHeight );
      setNoData( $dom );
    }
  }

  //@param {string} idStr: 画图区域id标识
  //@param {object} srcData: 原始数据
  //@param {array} color: 柱状图颜色
  function drawBar( idStr, srcData, color ) {
    var $dom = $( '#' + idStr ),
      barData = formatBarData( srcData, 'bar' ),
      color = color || normalColor;

    if( barData.yAxis.length > 0 ) {
      $dom.css( 'height', '' );
      chart.drawBar( idStr, barData, color );
    } else {
      $dom.css( 'height', noDataHeight );
      setNoData( $dom );
    }
  }

  drawPie( 'device', deviceTypeKey, statistics.deviceTypeMap );
  //drawPie( 'os', osTypeKey, statistics.osTypeMap );
  drawPie( 'vulDevice', vulDeviceKey, statistics.vulDeviceMap, [ '#f70501', '#36c6d3' ] );
  drawPie( 'vulLevel', vulLevelKey, statistics.vulLevelMap, vulLevelColor );
  drawBar( 'os', statistics.osTypeList, [ '#8775a7' ] );

  drawBar( 'brand', statistics.brandList, [ '#36c6d3' ] );
  drawBar( 'service', statistics.serviceList, [ '#659be0' ] );
  drawBar( 'vulStyle', statistics.vulStyleList, [ '#ed6b75' ] );
 // drawBar( 'vulDanger', statistics.vulDangerList, [ '#8775a7' ] );
}

function formatBarData( origin, type ) {
  /*
	 * 如果每个柱需要单独控制颜色，那么series.data = [{value: ,itemStyle:{normal:{color:'color'}}}]
	 * 该函数可以格式化柱状图和条状图两种类型的数据
  */

  var i = 0,
    ret = {
      series: [{
        name: '',
        type: 'bar',
        barWidth: '14px',
        data: []
      }]
    },
    xOrY, len;

  type = type || 'column';
  xOrY = type === 'column' ? 'xAxis' : 'yAxis';

  ret[ xOrY ] = [];

  if( ({}).toString.call( origin ) !== '[object Array]' ) {
    return ret;
  }

  for( len = origin.length; i < len; i++ ) {
    ret[ xOrY ].push( origin[ i ].name );
    ret.series[0].data.push( origin[ i ].value );
  }

  //为了让柱状图由上到下数值依次减少，所以需要对数据进行反序排列
  if( xOrY === 'yAxis' ) {
    ret.series[0].data = ret.series[0].data.reverse();
     ret[ xOrY ] =  ret[ xOrY ].reverse();
  }

  return ret;
}


// 如果是正在执行的任务，那么循环请求，直到任务执行完成
function lazyRequest() {
  var space = 5000;

  setTimeout( function() {
    deviceListPagenation.setOption( 'isCache', false );
    deviceListPagenation.requestPage( pageInfo.currentPage );

    requestBaskInfo( function( basicInfo ) {
    	// 请求概览信息成功回调
	    taskDetailPub.deliver( basicInfo.overview );
	    drawAllCharts( basicInfo.statistics );

	    // 如果是正在运行的任务那么就执行running函数
	    if( basicInfo.overview.state === CONST.RUNNING ||
          basicInfo.overview.state === CONST.WAITING ) {
	      lazyRequest();
	    } else {
        deviceListPagenation.setOption( 'isCache', true );
        $( '.ctrl .progress-wrapper' ).removeClass( 'running' );
        //任务自动执行结束时，禁止停止任务按钮
        disabledStopTaskBtn( $( '.btn-stop' ) );
      }

    	$( '.ctrl .progress-wrapper .number em' ).text( basicInfo.overview.totalProgress );
    } );
  }, space );
}

init();

/** ************************************************************************ */
// taskDetailPub.deliver( data.overview );

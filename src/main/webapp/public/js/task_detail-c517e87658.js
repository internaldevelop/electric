(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var Table = React.createClass( {displayName: "Table",
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
      colspan = 7;

    lists = this.state.data.map( function( list, index ) {
      return React.createElement(TableCell, {key: index+1, index: startIndex+index+1, data: list})
    } );

    if( lists.length === 0 ) {
      lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
    }


      return React.createElement("table", {className: "table table-bordered table-hover"}, 
                  React.createElement("thead", null, 
                      React.createElement("tr", null, 
                          React.createElement("th", {style: {"width":"50px"}}, "序号"), 
                          React.createElement("th", {className: "sort sort_asc", "data-sortkw": "ip", "data-sortstyle": "asc",style:{"width":"130px"}}, "IP"), 
                          React.createElement("th", {className:"service-td"}, "开启的服务"), 
                          // React.createElement("th", null, "品牌型号"), 
                          React.createElement("th", {style: {"width":"40px"}}, "服务数量"), 
                          React.createElement("th", {className: "sort", style: {"width":"40px"},"data-sortkw": "vulCount", "data-sortstyle": "desc"}, "漏洞数量"), 
                          React.createElement("th", {className: "text-left",style: {"width":"130px"},}, "严重 | 高 | 中 | 低危"), 
                          React.createElement("th", {style: {"width":"50px"}}, "操作")
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
    return  React.createElement("tr", null, 
            React.createElement("td", null, this.props.index), 
                React.createElement("td", null, this.props.data.ip), 
                React.createElement("td", {className: "ellipsis",title:this.props.data.serviceList}, this.props.data.serviceList), 
                // React.createElement("td", null, this.props.data.brand), 
                React.createElement("td", null, this.props.data.serviceCount), 
                React.createElement("td", null, this.props.data.vulCount.allNum), 
                React.createElement("td", null, React.createElement("span", {className: "vul-wrapper"}, vulDetail)), 
                React.createElement("td", {className: "operate"}, 
                  React.createElement("a", {href: "./device_detail?projectID="+G.projectID+"&taskID="+G.taskID+'&ip='+this.props.data.ip}, "详情")
                )
            )
  }
} );

// 概览信息组件
var Basic = React.createClass( {displayName: "Basic",
  getInitialState: function() {
    return {
      startTime: '',
      takingTime: '',
      realBandWidth: 0,
      counts: '',
      process:''
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
        realBandWidth: data.realBandWidth,
        process:data.process
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

    return React.createElement("ul", {className: "basic clear"}, 
              React.createElement("li", null, "存活主机: ", React.createElement("em", null, this.state.deviceNum||0), "个"), 
              React.createElement("li", null, "监控设备: ", React.createElement("em", null, this.state.videoNum||0), "个"), 
              React.createElement("li", null, "漏洞: ", React.createElement("em", null, this.state.vulNum||0), "个"), 
              React.createElement("li", null, "流量: ", React.createElement("em", null, bandWidth), "KB"),
              React.createElement("li", null, "并发任务进程数: ", React.createElement("em", null, this.state.process||0), "个"), 
              React.createElement("li", null, "耗时: ", convertSecond(this.state.takingTime)), 
              React.createElement("li", null, "剩余时间: ", remainingTime), 
              React.createElement("li", null, "开始时间: ", React.createElement("span", null, formateDate(this.state.startTime, 'YYYY-MM-DD hh:mm:ss'))), 
              React.createElement("li", null, "序号: ", React.createElement("span", null, this.state.counts))
           )
  }
} );

// 进度条组件
var Progress = React.createClass( {displayName: "Progress",
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
      return React.createElement("li", {key: index}, 
                React.createElement("p", {className: "title"}, item.name), 
                React.createElement("div", {className: "bar-wrapper"}, 
                  React.createElement("div", {className: "bar", style: {width:item.value+'%'}})
                )
             )
    } )
    return React.createElement("ul", {className: "c-progress clear"}, 
            children
           )
  }
} );

//错误信息组件
var ErrMsg = React.createClass( {displayName: "ErrMsg",
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
      return React.createElement("div", {key: index, className: "col-lg-6 col-md-6 col-sm-12 col-xs-12"}, 
              React.createElement("div", {className: "alert fade in error-" + item.errorType}, item.errorMsg)
             )
    } )
    return React.createElement("div", {className: "row"}, 
            children
           )
  }
} );

//报表组件
var ReportForm = React.createClass( {displayName: "ReportForm",
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
      return React.createElement("button", {className: "c-btn"}, 
              React.createElement("a", {href: this.state.reportFormPath, target: "_blank"}, 
                "任务报表"
              )
              )
    }
    return React.createElement("button", {className: "c-btn", disabled: true}, 
                "任务报表"
              )
  }
} );


// 初始化函数
function init() {

  // 渲染任务概览信息和进度信息
  ReactDOM.render( 
    React.createElement(Table, null),
    document.getElementById( 'table' )
  )
  ReactDOM.render( 
    React.createElement(Basic, null),
    document.getElementById( 'basic' )
  )
  ReactDOM.render( 
    React.createElement(Progress, null),
    document.getElementById( 'progress' )
  )
  ReactDOM.render(
    React.createElement(ErrMsg, null),
    document.getElementById( 'errMsg' )
  )

  ReactDOM.render(
    React.createElement(ReportForm, null),
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


},{"../../../public/js-dev/const":3,"../../../public/js-dev/pagenation":4,"../../../public/js-dev/pop":5,"./task_chart":2}],2:[function(require,module,exports){
//@param {string} id 画图容器DOM的id
//@param {array} data 数据list,格式为[{name:'',value:''}]
//@return: null
function drawPie( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            color: colorArray,
            tooltip : {
                trigger: 'item',
                //formatter: "{a} <br/>{b} : {c} ({d}%)"
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left'
            },
            toolbox: {
                show : false,
            },
            calculable : true,
            animation: false,
            series : [
                {
                    name: name,
                    type:'pie',
                     itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}:{c}",
                                position: 'inner'
                            },
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        }
                    },
                    radius : '90%',
                    center: ['50%', '53%'],
                    data: data
                }
            ]
        };

    myChart.setOption(option);
}

//@param {string} id 画图容器DOM的id
//@param {object} data 数据list,格式为{xAxis:[],series:[{name: , type: , data: }]}
//@return: null
function drawColumn( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            tooltip : {
                trigger: 'axis'
            },
            color: colorArray,
            legend: {
            },
            toolbox: {
            },
            calculable : true,
            animation: false,
            grid: {
                left: '2%',
                //right: '4%',
                //bottom: '3%',
                top:'8%',
                width: '90%',
                height: '90%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.xAxis,
                    axisLabel: {
                        interval: 0,
                        rotate: -5
                       
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : data.series
        };
                    
    myChart.setOption(option);
}

  //控制每条柱的文字显示2 2017-12-22版
  function barTitleLineCtr( data ){
      var res = [];
      for( var i = 0; i < data.length; i++ ){
          var len = data[i].length;
          var objStr = '';
          if( len > 10 ){
              objStr = data[i].substring(0,10)+'...';
          }else{
              objStr = data[i];
          }
          res.push( objStr );
      }
      return res;
  }

//@param {string} id 画图容器DOM的id
//@param {object} data 数据list,格式为{xAxis:[],series:[{name: , type: , data: }]}
//@return: null
function drawBar( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            tooltip : {
                trigger: 'axis',
                 formatter: function( params ){//提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                      console.log(params) ;
                      return "名称："+data.yAxis[params[0].dataIndex]+"<br/>"+"数量："+data.series[0].data[params[0].dataIndex];
                  },
            },
            color: colorArray,
            legend: {
            },
            toolbox: {
            },
            calculable : true,
            animation: false,
            position:'top',
            grid: {
                left: '2%',
                //right: '4%',
                //bottom: '3%',
                top:'8%',
                width: '90%',
                height: '92%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'value',
                    boundaryGap : [0, 0.01]
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : barTitleLineCtr(data.yAxis),
                    axisLabel: {
                        interval: 0
                    }
                }
            ],
            series : data.series
        };
    
    myChart.setOption(option);              
};

module.exports = {
    drawPie: drawPie,
    drawColumn: drawColumn,
    drawBar: drawBar
}



},{}],3:[function(require,module,exports){
var RUNNING = '正在执行'; //任务正在执行状态
var WAITING = '排队中'; //任务正在排队中


module.exports.RUNNING = RUNNING;
module.exports.WAITING = WAITING;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
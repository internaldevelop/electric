/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var taskListPub = new Deliver();
var pagenation = require( '../../public/js-dev/pagenation' );

var Table = React.createClass( {
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
				data: data.lists,
				startIndex: ( data.currentPage - 1 ) * data.perPage
			} )
		};
		subscribe( updateState.bind( this ), taskListPub );
	},
    render: function() {
    	var lists = [],
    		startIndex = this.state.startIndex;
    	lists = this.state.data.map( function( list, index ) {
    		return <TableCell key={index+1} index={startIndex+index+1} data={list}/>
    	} );
        return <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>进度</th>
                            <th>状态</th>
                            <th>开始时间</th>
                            <th>耗时</th>
                            <th>资产</th>
                            <th>漏洞</th>
                            <th>高|中|低危</th>
                            <th>检查员</th>
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
        return  <tr>
        			<td>{this.props.index}</td>
              		<td>{this.props.data.progress + '%'}</td>
               		<td>{this.props.data.state}</td>
               		<td>{this.props.data.startTime}</td>
               		<td>{this.props.data.takingTime + 's'}</td>
                  <td>{this.props.data.vuls.properties}</td>
                  <td>{this.props.data.vuls.allNum}</td>
                  <td>{this.props.data.vuls.high + '|' + this.props.data.vuls.mid + '|' + this.props.data.vuls.low }</td>
               		<td>{this.props.data.checker}</td>
                  <td>
               			<a href={"./detail?taskID="+this.props.data.taskID}>详情</a>
               			<a href={"./delete?taskID="+this.props.data.taskID}>删除</a>
               		</td>
                </tr>      
    }
} );

ReactDOM.render( 
   <Table />,
   document.getElementById( 'table' )
)

var taskListPagenation = pagenation.pagenation();
taskListPagenation.init( {
	url: 'abd',
	isCache: true,
	successCb: function( pageInfo ) {
		taskListPub.deliver( pageInfo.content );
		if( pageInfo.allNumber > pageInfo.perPage ) {
			pagination( 'project-page', Math.ceil( pageInfo.allNumber / pageInfo.perPage ), function( page ) {
				taskListPagenation.requestPage( page )
			}, pageInfo.currentPage  );
		}
	}
} );
taskListPagenation.requestPage( 1 );

/***************************************************************************/
( function() {
  var originChartsData = {
    errNo: 1, //请求状态码
    errMsg: '', //错误信息
    content: [{
        time: 123,       //任务执行时间
        properties: 100,   //资产数
        vuls: {
          allNum: 30, //总漏洞数
          high: 10,    //高危漏洞
          mid:  10,  //中危漏洞
          low:  10  //低危漏洞
        }
      },
      {
        time: 34653,       //任务执行时间
        properties: 1000,   //资产数
        vuls: {
          allNum: 300, //总漏洞数
          high: 700,    //高危漏洞
          mid:  100,  //中危漏洞
          low:  100  //低危漏洞
        }
      }
      
    ]
  };

  formatChartsData( originChartsData.content )

  //请求折线图数据
  function requestChart( successCb ) {
    $.ajax( {
      url: 'taskOverview?projectID=' + X.projectID,
      type: 'GET',
      dataType: 'JSON'
    } ).then( function( data ) {
      if( data.errNo === 1 ) {
        successCb( data.content );
      }
      
    }, function() {

    } )
  }

  //处理请求回的数据，并画图
  function formatChartsData( data ) {
    var ret = {
        legend: [ '总资产', '高危漏洞', '中危漏洞', '低危漏洞' ],
        xAxis: [],
        series: [ {
          name:'总资产',
          type:'line',
          itemStyle: {normal: {lineStyle: {color:'blue'}}},
          data:[]
        },
        {
          name:'低危漏洞',
          type:'line',
          stack: '总量',
          areaStyle: { normal: { color: 'red' } },
          itemStyle: {normal: {lineStyle: { color:'red' } } },
          data:[]
        },
        {
          name:'中危漏洞',
          type:'line',
          stack: '总量',
          areaStyle: { normal: { color: 'yellow' } },
          itemStyle: {normal: {lineStyle: { color:'yellow' } } },
          data:[]
        }, {
          name:'高危漏洞',
          type:'line',
          stack: '总量',
          areaStyle: { normal: { color: 'green' } },
          itemStyle: {normal: {lineStyle: { color:'green' } } },
          data:[]
        } ]
      },
      len = data.length,
      i;

    for( i = 0; i < len; i++ ) {
      ret.xAxis.push( data[ i ].time );
      ret.series[ 0 ].data.push( data[ i ].properties );
      ret.series[ 1 ].data.push( data[ i ].vuls.low );
      ret.series[ 2 ].data.push( data[ i ].vuls.mid );
      ret.series[ 3 ].data.push( data[ i ].vuls.high );
    }
    
    drawCurve( 'charts', ret);
  }

  function drawCurve( id, data ) {
    var myChart = echarts.init( document.getElementById( id ) );
    var option = {
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data: data.legend
      },
      calculable: true,
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
} )()





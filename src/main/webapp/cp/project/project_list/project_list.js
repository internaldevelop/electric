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
        createTh = <tr>
                      <th>序号</th>
                      <th>项目名称</th>
                      <th>项目描述</th>
                      <th>执行方式</th>
                      <th>执行次数</th>
                      <th>项目状态</th>
                      <th>创建者</th>
                      <th>创建时间</th>
                      <th>操作</th>
                  </tr>
      } else {
        colspan = 8;
        createTh = <tr>
                      <th>序号</th>
                      <th>项目名称</th>
                      <th>项目描述</th>
                      <th>执行方式</th>
                      <th>执行次数</th>
                      <th>项目状态</th>
                      <th>创建时间</th>
                      <th>操作</th>
                  </tr>
      }

      lists = this.state.data.map( function( list, index ) {
        return <TableCell key={list.projectID} index={startIndex+index+1} data={list}/>
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
    	var flag = this.props.data.projectFlag === 1 ? '周期' : '单次';
      var createTd = '';
      if( G.userType === 'admin' ) {
        return <tr>
                <td>{this.props.index}</td>
                <td className="projectName">{this.props.data.projectName}</td>
                <td className="ellipsis">{this.props.data.describe}</td>
                <td>{flag}</td>
                <td>{this.props.data.times}</td>
                <td>{this.props.data.state}</td>
                <td>{this.props.data.checker}</td>
                <td>{this.props.data.createTime!='0'?formateDate(this.props.data.createTime, 'YYYY-MM-DD hh:mm:ss'):''}</td>
                <td className="operate">
                  <a href={"./project_detail?projectID="+this.props.data.projectID}>详情</a>
                  <a href="javascript:;" className="delete" data-id={this.props.data.projectID}>删除</a>
                </td>
              </tr>
      } else {
        return <tr>
                    <td>{this.props.index}</td>
                    <td className="projectName">{this.props.data.projectName}</td>
                    <td className="ellipsis">{this.props.data.describe}</td>
                    <td>{flag}</td>
                    <td>{this.props.data.times}</td>
                    <td>{this.props.data.state}</td>
                    <td>{this.props.data.createTime!='0'?formateDate(this.props.data.createTime, 'YYYY-MM-DD hh:mm:ss'):''}</td>
                    <td className="operate">
                      <a href={"./project_detail?projectID="+this.props.data.projectID}>详情</a>
                      <a href="javascript:;" className="delete" data-id={this.props.data.projectID}>删除</a>
                    </td>
                  </tr>
      }
    }
} );

ReactDOM.render( 
   <Table />,
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










/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//项目列表发布者
var logListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
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
        data: data.logList,
        startIndex: ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage
      } )
    };
    subscribe( updateState.bind( this ), logListPub );
  },
    render: function() {
      var lists = [],
        startIndex = this.state.startIndex,
        colspan = 5;

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
                        <th>用户</th>
                        <th>操作</th>
                        <th>时间</th>
                        <th>备注</th>
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
      return <tr>
              <td>{this.props.index}</td>
              <td>{this.props.data.user}</td>
              <td>{this.props.data.operate}</td>
              <td>{this.props.data.time}</td>
              <td>{this.props.data.note}</td>
            </tr>
    }
} );

ReactDOM.render( 
   <Table />,
   document.getElementById( 'table' )
)

//分页
var logListPagenation = pagenation.pagenation();
logListPagenation.init( {
  url: 'ajax_project_list',
  isCache: true,
  perPage: pageInfo.perPage,
  successCb: function( pageList ) {
    var pagenation = pageList.pagenation;
    pageInfo = pagenation;
    logListPub.deliver( pageList );

    if( pagenation.allNum > pagenation.perPage ) {
      pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
        logListPagenation.requestPage( page );
        pageInfo.currentPage = page;
      }, pagenation.currentPage  );
    } else {
      $( '#project-page' ).empty();
    }
  }
} );
logListPagenation.requestPage( pageInfo.currentPage );










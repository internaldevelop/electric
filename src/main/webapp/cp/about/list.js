/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var projectListPub = new Deliver();
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
		subscribe( updateState.bind( this ), projectListPub );
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
                            <th>项目名称</th>
                            <th>项目描述</th>
                            <th>任务类型</th>
                            <th>创建者</th>
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
              		<td>{this.props.data.name}</td>
               		<td>{this.props.data.des}</td>
               		<td>{this.props.data.style}</td>
               		<td>{this.props.data.checker}</td>
               		<td>
               			<a href={'"./detail?projectID='+this.props.data.projectID+'"'}>详情</a>
               			<a href={'"./delete?projectID='+this.props.data.projectID+'"'}>删除</a>
               		</td>
                </tr>
    }
} );

ReactDOM.render( 
   <Table />,
   document.getElementById( 'table' )
)

var projectListPagenation = pagenation.pagenation();
projectListPagenation.init( {
	url: 'abd',
	isCache: true,
	successCb: function( pageInfo ) {
		projectListPub.deliver( pageInfo.content );
		if( pageInfo.allNumber > pageInfo.perPage ) {
			pagination( 'project-page', Math.ceil( pageInfo.allNumber / pageInfo.perPage ), function( page ) {
				projectListPagenation.requestPage( page )
			}, pageInfo.currentPage  );
		}
	}
} );
projectListPagenation.requestPage( 1 );

/***************************************************************************/

$( '.submit' ).click( function() {
	if( $( '#add input[name="checkScript"]' ).val() != "" ) {
		$( '.exist' ).show();
	}else {
		return false;
	}
} )









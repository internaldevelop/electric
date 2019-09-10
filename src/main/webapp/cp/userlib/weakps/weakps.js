/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//弱秘钥数据发布者
var weakpsPub = new Deliver();
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
		subscribe( updateState.bind( this ), weakpsPub );
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
                            <th>用户名</th>
                            <th>密码</th>
                            <th>添加时间</th>
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
              		<td>{this.props.data.userName}</td>
               		<td>{this.props.data.ps}</td>
               		<td>{formateDate(this.props.data.addTime,'YYYY:MM:DD  hh:mm:ss')}</td>
                </tr>
    }
} );



ReactDOM.render( 
   <Table />,
   document.getElementById( 'table' )
)

var weakpsPagenation = pagenation.pagenation();
weakpsPagenation.init( {
	url: 'abd',
	isCache: true,
	successCb: function( pageInfo ) {
		projectListPub.deliver( pageInfo.content );
		if( pageInfo.allNumber > pageInfo.perPage ) {
			pagination( 'project-page', Math.ceil( pageInfo.allNumber / pageInfo.perPage ), function( page ) {
				weakpsPagenation.requestPage( page )
			}, pageInfo.currentPage  );
		}
	}
} );
weakpsPagenation.requestPage( 1 );

/***************************************************************************/
validateObj = $( '#add' ).validate( {
    rules: {
    	username: {
    		required: true
    	},
    	ps: {
    		required: true
    	}
 	},
 	messages: {
 		title: {
            remote: "已添加过该用户名和密码！"
 		}
 	},
 	onkeyup: false,//这个地方要注意，修改去控制器验证的事件。
 	ignore: '.ignore'
} );

$( '.submit' ).click( function() {
	if( $( '#add' ).valid() ) {
		$( '.exist' ).show();
	}
} )









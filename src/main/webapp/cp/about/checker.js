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
                            <th>用户名</th>
                            <th>密码</th>
                            <th>添加时间</th>
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
              		<td className={this.props.data.username}>{this.props.data.username}</td>
               		<td className={this.props.data.ps}>{this.props.data.ps}</td>
               		<td>{this.props.data.addTime}</td>
               		<td>
               			<a class="update" href="" data-index={this.props.index}>修改</a>
               			<a href={'"./delete?userName='+this.props.data.username+'"'}>删除</a>
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
var $addOrUpdateModel = $( '#addOrUpdateModel' ),
	$userName = $( '#addOrUpdateModel input[name="username"]' ),
	$ps = $( '#addOrUpdateModel input[name="ps"]' ),
	$confirmPs = $( '#addOrUpdateModel input[name="confirm"]' ),
	$submit = $( '#addOrUpdateModel .submit' );


$( '.addChecker' ).click( function() {
	$submit.text( '添加' );
	$userName.text( '' );
	$ps.text( '' );
	$confirmPs.text( '' );
	
	$addOrUpdateModel.attr( 'action', 'add' ).modal();
} )

$( '#table table tbody tr td' ).delegate( '.update', 'click', function() {
	var $target = $( '#table table tbody tr' ).eq( $( this ).data( 'index' ) - 1 );
	
	$submit.text( '修改' );
	$userName.text( $( '.usernmae', $target ).text() );
	$ps.text( '' );
	$confirmPs.text( '' );
	
	$addOrUpdateModel.attr( 'action', 'add' ).modal();
} )

$( '.submit' ).click( function() {
	if( $( '#add input[name="checkScript"]' ).val() != "" ) {
		$( '.exist' ).show();
	}else {
		return false;
	}
} )

$.extend($.validator.messages, {
	required: "这是必填字段",
	equalTo: "两次输入密码不匹配"
});

$( '#addOrUpdate' ).validate( {
    rules: {
    	'username': 'required',
    	'ps': 'required',
    	'confirm': {
    		required: true,
    		equalTo: "#ps"
 		}
 	}
} );









/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var projectListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var pageInfo = {
		perPage: 8,
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
		var updateState = function( pageInfo ) {
			this.setState( {
				data: pageInfo.checkerList,
				startIndex: ( pageInfo.pagenation.currentPage - 1 ) * pageInfo.pagenation.perPage
			} )
		};
		subscribe( updateState.bind( this ), projectListPub );
	},
    render: function() {
    	var lists = [],
    		colspan = 7,
    		startIndex = this.state.startIndex;
    	
    	lists = this.state.data.map( function( list, index ) {
    		return <TableCell key={index+1} startIndex={startIndex+index+1} rowNum={index} data={list}/>
    	} );
    	if( lists.length === 0 ) {
	    	lists = [ <tr key="0"><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
	    }
        return <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>用户名</th>
                            <th>姓名</th>
                            <th>密码</th>
                            <th>漏洞库管理权限</th>
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
        			<td>{this.props.startIndex}</td>
              		<td className="userName">{this.props.data.userName}</td>
              		<td className="realName">{this.props.data.realName}</td>
               		<td className="ps">{this.props.data.passwd}</td>
               		<td className="enableManageVulLib" data-state={this.props.data.enableManageVulLib}>{this.props.data.enableManageVulLib==1?'是':'否'}</td>
               		<td>{formateDate(this.props.data.addTime, 'YYYY-MM-DD hh:mm:ss')}</td>
               		<td className="operate" data-index={this.props.rowNum}>
               			<a className="account" href="javascript:;">修改账号</a>
               			<a className="permission" href="javascript:;">修改权限</a>
               			<a className="delete" href="javascript:;">删除</a>
               		</td>
                </tr>
    }
} );

ReactDOM.render( 
   <Table />,
   document.getElementById( 'table' )
)

var checkerListPagenation = pagenation.pagenation();
checkerListPagenation.init( {
	url: 'checker_list',
	isCache: true,
	perPage: pageInfo.perPage,
	successCb: function( pageList ) {
		var pagenation = pageList.pagenation;
		pageInfo = pagenation;
		projectListPub.deliver( pageList );

		if( pagenation.allNum > pagenation.perPage ) {
			pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
				checkerListPagenation.requestPage( page );
				pageInfo.currentPage = page;
			}, pagenation.currentPage  );
		} else {
			$( '#project-page' ).empty();
		}
	}
} );
checkerListPagenation.requestPage( pageInfo.currentPage );

/***************************************************************************/
function init() {
	var $addOrChangeModel = $( '#addOrChangeModel' ),
		$permissionModal = $( '#permissionModal' ),
		$form = $( '#addOrChange' ),
		$userName = $( '#addOrChangeModel input[name="userName"]' ),
		$realName = $( '#addOrChangeModel input[name="realName"]' ),
		$ps = $( '#addOrChangeModel input[name="ps"]' ),
		$confirmPs = $( '#addOrChangeModel input[name="confirmPs"]' ),
		$permissionItem = $( '#addOrChangeModel .permission-item' ),
		$submit = $( '#addOrChangeModel .submit' ),
		$modalTitle = $( '#addOrChangeModel .modal-title' ),
		$loading = $( '.loading' ),
		type; //add or update，标识是添加还是修改
	
	function ajax( url, successCb, errorCb, alwaysCb ) {
		successCb = successCb || function() {};
		errorCb = errorCb || function() {};
		alwaysCb = alwaysCb || function() {};

		url = url.indexOf( '?' ) > -1 ? ( url + '&' ) : ( url + '?' );
		url += '_=' + Math.random();

		$.ajax( {
			method: 'GET',
			url: url,
			dataType: 'JSON'
		} ).done( function( json ) {
			if( json.bizNo > 0 ) {
				successCb( json );
			} else {
				errorCb();
			}
		} ).fail( function() {
			pop.error( '请求发生错误!' );
		} ).always( function() {
			alwaysCb();
		} )
	}

	//执行失败回调函数
	function errorCb( errMsg ) {
		$loading.hide();
	}
	
	$( '.add' ).click( function() {
		$submit.text( '添 加' );
		$modalTitle.text( '添加检查员' );
		$userName.val( '' ).removeAttr( 'disabled' );
		$realName.val( '' ).removeAttr( 'disabled' );
		$ps.val( '' );
		$permissionItem.show().find( 'input' ).removeAttr( 'disabled' );
		$( '.forbid-bind' ).trigger( 'click' ); //默认检查员不能管理漏洞库
		$confirmPs.val( '' );
		type = 'add';
		
		$addOrChangeModel.modal( 'show' );
	} )
	
	$( '.table' ).delegate( '.account', 'click', function() {
		var $parentTr = $( '#table table tbody tr' ).eq( $( this ).parent().data( 'index' ) );

		//处理用户点击修改后直接取消修改
		$( '#table table tbody tr' ).removeClass( 'active' );
		$( this ).parents( 'tr' ).addClass( 'active' );
		
		$submit.text( '修 改' );
		$modalTitle.text( '修改检查员信息' );
		$userName.val( $( '.userName', $parentTr ).text() ).attr( 'disabled', 'disabled' );
		$realName.val( $( '.realName', $parentTr ).text() ).attr( 'disabled', 'disabled' );
		$ps.val( '' );
		$confirmPs.val( '' );

		$permissionItem.hide().find( 'input' ).attr( 'disabled', 'disabled' );
		
		type = 'account';
		
		$addOrChangeModel.modal( 'show' );
	} )

	$( '#addOrChangeModel .submit' ).click( function() {
		var successMsg,
			errorMsg,
			url;

		$userName.removeAttr( 'disabled' );
		$realName.removeAttr( 'disabled' );
		
		if( !$( '#addOrChange' ).valid() ) {
			return false;
		}
		
		if( type === 'add' ) {
			successMsg = '添加成功!';
			errorMsg = '添加失败!';
			url = 'add_checker?' + $form.serialize();
		} else if( type === 'account' ){
			successMsg = '修改成功!';
			errorMsg = '修改失败!';
			url = 'change_checker?' + $form.serialize();
		} else {
			return false;
		}
		
		$addOrChangeModel.modal( 'hide' );
		$( '.loading' ).show();

		$.ajax( {
			url: url + '&_=' + Math.random(),
			type: 'GET',
			dataType: 'JSON'
		} ).then( function( operateResult  ) {
			if( operateResult.bizNo > 0 ) {
				pop.success( successMsg );
				operateCheckerCb();
			} else {
				pop.error( errorMsg );
				errorCb( operateResult.bizMsg );
			}
		}, function() {
			pop.error( errorMsg );
			errorCb();
		} )
	} )

/******************************修改检查员权限开始******************************************/
	$( '.table' ).delegate( '.permission', 'click', function() {
		var $parentTr = $( '#table table tbody tr' ).eq( $( this ).parent().data( 'index' ) ),
			userName = $parentTr.find( '.userName' ).text();

		//设置检查员权限
		if( $( 'canManageVulLib', $parentTr ).data( 'state' ) == 1 ) {
			$( '#permissionModal .allow-bind' ).trigger( 'click' );
		} else {
			$( '#permissionModal .forbid-bind' ).trigger( 'click' );
		}

		$permissionModal.modal();
		$( '#permissionModal .ok' ).off().one( 'click', function() {
			changePermission( userName );
		} )
	} )

	//修改权限
	function changePermission( userName ) {
		var para = $( '#changePermission' ).serialize();

		$permissionModal.modal( 'hide' );
		$( '.loading' ).show();

		ajax( 'change_permission?userName=' + userName + '&' + para, function() {
			pop.success( '修改成功!' );
			operateCheckerCb();
		}, function() {
			pop.error( errorMsg );
		}, function() {
			$( '.loading' ).hide();
		} );
	}
/******************************修改检查员权限结束******************************************/

	$( '.table' ).delegate( '.delete', 'click', function() {
	  var $target = $( this ).parents( 'tr' ),
	    userName = $( '.userName', $target ).text(),
	    url;

	  pop.warning( '是否删除检查员' + userName + '?<br>此操作将会删除该检查员创建的所有项目, 请谨慎操作!' );
	  pop.on( '.ok', 'click', function() {
	  	url = 'delete_checker?userName=' + userName + '&_=' + Math.random();
	    deleteProject( url, function() {
	    	pop.success( '删除成功!' );
	    	$loading.show();
	    	operateCheckerCb();
	    }, function( errMsg ) {
	    	pop.error( errMsg );
	    	$loading.hide();
	    } );
	  } )
	} )

	//删除一个项目
	function deleteProject( ajaxUrl, successCb ) {
	  $.ajax( {
	    url: ajaxUrl,
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
	  	errorCb( '请求发生错误!' );
	  } )
	}
	
	//添加、删除、修改检查员的回调函数
	function operateCheckerCb() {
		var allPage = Math.ceil( pageInfo.allNum / pageInfo.perPage );

		//删除检查员时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
		if( allPage < pageInfo.currentPage ) {
			pageInfo.currentPage = pageInfo.currentPage - 1;
			if( pageInfo.currentPage < 1 ) {
				pageInfo.currentPage = 1;
			}
		}

		if( pageInfo.allNum >= 0 ) {
			checkerListPagenation.setOption( 'isCache', false );
			checkerListPagenation.requestPage( pageInfo.currentPage );
			checkerListPagenation.setOption( 'isCache', true );
		}
	}
	
	$.extend($.validator.messages, {
		required: "这是必填字段",
		equalTo: "两次输入密码不匹配"
	});
	
	$( '#addOrChange' ).validate( {
	    rules: {
	    	'userName': 'required',
	    	'realName': 'required',
	    	'ps': 'required',
	    	'enableManageVulLib': 'required',
	    	'confirmPs': {
	    		required: true,
	    		equalTo: "#ps"
	 		}
	 	}
	} );
}

init();









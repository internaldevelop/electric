(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

//项目列表发布者
var logListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var pageInfo = {
    perPage: 15,
    currentPage: 1
};

var Table = React.createClass( {displayName: "Table",
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
        return React.createElement(TableCell, {key: index+1, index: startIndex+index+1, data: list})
      } );
      if( lists.length === 0 ) {
        lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
      }
      const style = [{width:"8%"},{width:'10%'},{width:"200px"},{width:"30%"}];
      return React.createElement("table", {className: "table table-bordered table-hover"}, 
                  React.createElement("thead", null, 
                      React.createElement("tr", null, 
                        React.createElement("th", {style: style[0]}, "序号"), 
                        React.createElement("th", {style: style[1]}, "日志类型"), 
                        React.createElement("th", {style: style[1]}, "操作人"), 
                        React.createElement("th", {style: style[2]}, "时间"), 
                        React.createElement("th", null, "描述")
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
      return React.createElement("tr", null, 
              React.createElement("td", {className: 'center'}, this.props.index), 
              React.createElement("td", {className: 'center'}, this.props.data.type), 
              React.createElement("td", {className: 'center'}, this.props.data.user), 
              React.createElement("td", {className: 'center'}, this.props.data.date), 
              React.createElement("td", null, this.props.data.desc)
            )
    }
} );

ReactDOM.render( 
   React.createElement(Table, null),
   document.getElementById( 'table' )
)

$("#edit").click(function(event) {
	$(this).hide();
	$(".cp").css("display","inline-block");
	$(".editWrap  input").removeAttr('disabled');
});

$("#edit_ok").click(function(event) {
	$.ajax({
		url: 'update_log_flag',
		type: 'POST',
		dataType:'json',
		data:{
			flag:$("input[name='flag']:checked").val()
		}
	})
	.done(function(res) {
		if (res.bizNo > -1) {
			$("#edit").show();
			$(".cp").css("display","none");
			$(".editWrap input").attr('disabled',true);
			$(".pop-text").html("编辑成功");
			$('#popModal').modal('show');
		}else{
			$(".modal-content").html(res.msg);
			$('#popModal').modal('show');
		}
	})
	.fail(function() {
		$(".pop-text").html("连接失败");
		$('#popModal').modal('show');
	});
});

$("#edit_cancel").click(function(event) {
	$("#edit").show();
	$(".cp").css("display","none");
	$(".editWrap input").attr("checked",false);
	$("input[value="+G+"]").prop("checked",true);
	$(".editWrap input").attr('disabled',true);
});

//分页
var logListPagenation = pagenation.pagenation();
logListPagenation.init( {
  url: 'log_list',
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











},{"../../../public/js-dev/pagenation":2}],2:[function(require,module,exports){
var pagenation = function() {
	var ret = {},
		pageCache = {},
		$mask = $( '.page-mask' ),
		$loadGif = $( '.loading' ),
		option = {},
		timeId = null,
		isStop = false,
		REFRESH_TIME = 15000,
		currentPage;

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
			option.isTimeRefresh = originOption.isTimeRefresh != null ? !!originOption.isTimeRefresh : true;
			option.hasCondition = originOption.hasCondition == null ? false : !!originOption.hasCondition;//根据状态定时刷新，比如正在执行，则刷新，执行完毕则不再刷新
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

			currentPage = page;

			url = option.url + sign + 'page=' + page + '&perPage=' + option.perPage + '&_=' + Math.random();
			
			showLoading();

			if( option.isCache === false ) {
				pageCache = {};
			}
			
			if( pageCache[ page ] != null ) {
				success( pageCache[ page ] );
				// hideLoading();
			} else {
				$.ajax( {
					type: 'GET',
					url: url,
					dataType: 'JSON'
				} ).then( function( pageInfo ) {
					success( pageInfo );
					var isComputing;
					if(option.hasCondition) {
						isComputing = true;
						pageInfo.projectList.forEach(function(item,idx,arr) {
							isComputing = isComputing && item.state !== "正在执行";
						});
					}else{
						isComputing = false;
					}

					if(option.isTimeRefresh && !isStop && !isComputing) {
				    ret.setTimeRefresh();
				  }

				}, function() {
					error();
				} );
			}
		},
		//设置定时刷新
		setTimeRefresh: function() {
			if( timeId ) {
				clearTimeout( timeId );
				timeId = null;
			}

			isStop = false;
			
			timeId = setTimeout( function() {
				ret.requestPage(currentPage);
			}, REFRESH_TIME );
		},
		//取消定时刷新
		stopTimeRefresh: function() {
			clearTimeout( timeId );
			timeId = null;
			isStop = true;
		}
	};
	return ret;
}


module.exports.pagenation = pagenation;

},{}]},{},[1])
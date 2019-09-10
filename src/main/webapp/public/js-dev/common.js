//格式化日期
function formateDate( date, fmt ) {
    var date = new Date( +date ),
        o = {
            "M+": date.getMonth() + 1,
            "D+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

    if (/(y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    
    return fmt;
}

//秒转为时分秒
function convertSecond( srcSeconds ) {
	var hours = 0,
		minutes = 0,
		seconds = srcSeconds,
		ret = '',
		remainder;

	if( typeof srcSeconds !== 'number' ) {
		return '0秒';
	}

	hours = parseInt( srcSeconds / 3600 );
	remainder = parseInt( srcSeconds % 3600 );
	minutes = parseInt( remainder / 60 );
	seconds = parseInt( remainder % 60 );

	if( hours > 0 ) {
		ret = hours + '小时' + minutes + '分' + seconds + '秒';
	} else if( minutes > 0 ) {
		ret = minutes + '分' + seconds + '秒';
	} else {
		ret = seconds + '秒';
	}

	return ret;
}

//设置暂无数据
function setNoData( $dom ) {
	$dom.html( '<div class="no-data"><i class="fa fa-exclamation-circle"></i><span class="content">暂无数据</span></div>' );
}

//分页
function pagination( id, total, callBack, currentPage ) {
    var options = {
        bootstrapMajorVersion: 3,
        currentPage: currentPage || 1, //当前页数
        totalPages: total, //总页数
        numberOfPages: 8,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                  return "首页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "末页";
                case "page":
                  return page;
            }
        },

        //点击事件，用于通过Ajax来刷新整个list列表
        onPageChanged: function ( event, type, page ) {
            callBack( page );
        }
    };
    return $( '#' + id ).bootstrapPaginator( options );
}

//请求url对应的json数据，fun为请求成功回调函数
function requestAjax( url, dataType, successFun, errorFun ) {
	dataType = dataType || 'text';
	errorFun = errorFun || $.noop;
	
	$.ajax( {
		type: 'GET',
		url: url,
		dataType: dataType,
		success: function( json ) {
			successFun( json );
		},
		error: function() {
			errorFun();
		}
	} );
}

//显示或隐藏元素，数据为数组或者单一元素或者多个参数传递。元素为jquery或dom元素
function changeElemsState( state, elems ) {
	var arg = [].slice.call( arguments, 1 );

	arg.forEach( function( elem ) {
		if( $.type( elem ) === 'array' ) {
			elem.forEach( function( ele ) {
				changeElemsState.apply( null, [ state, ele ] );
			} )
		} else {
			if( state === 'show' ) {
				$( elem ).show();
			} else if( state === 'hide' ) {
				$( elem ).hide();
			}
			
		}
	} )
}

//弹出警告框
function  myWarning( str ) {
	sweetAlert("警告！", str, "warning");
}

//弹出警告框
function  myError( str ) {
	sweetAlert("错误！", str, "error");
}

//弹出成功框
function  mySuccess( str ) {
	sweetAlert("成功！", str, "success");
}

//确定和取消框
function myCancel( str, callback ) {
    sweetAlert( {
        title: str,
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "取消",
        confirmButtonText: "继续",
    }, callback );
}

//比较两个变量的值是否相等
function isEqual( src1, src2 ) {
	var type1 = $.type( src1 ),
		type2 = $.type( src2 ),
		ret = true,
		src1Key = [],
		i, key;
	
	if( type1 !== type2 ) {
		return false;
	}
	
	if( type1 === 'object' ) {
		for( key in src1 ) {
			src1Key.push( key );
			if( $.type( src1[ key ] ) === 'object' || $.type( src1[ key ] ) === 'array' ) {
				ret = compareValue( src1[ key ], src2[ key ] );
			} else if( String( src1[ key ] ) !== String( src2[ key ] ) ) {
				return false;
			}
		}
		for( key in src2 ) {
			if( src1Key.indexOf( key ) === -1 ) {
				return false;
			}
		}
		
	} else if( type1 === 'array' ) {
		if( src1.length !== src2.length ) {
			return false;
		}
		for( i = 0; i < src1.length; i++ ) {
			if( $.type( src1[ key ] ) === 'object' || $.type( src1[ key ] ) === 'array' ) {
				ret = compareValue( src1[ key ], src2[ key ] );
			} else if( String( src1[ i ] ) !== String( src2[ i ] ) ) {
				return false;
			}
		}
	} else if( String( src1 ) !== String( src2 ) ) {
		return false;
	}
	
	return ret;
}

function lazyExe( time ) {
	var timeId;
	time = isNaN( parseInt( time ) ) === true ? 100 : parseInt( time );
	
	return function( fn ) {
		clearTimeout( timeId );
		setTimeout( function() {
			fn();
		}, time );
	}
}

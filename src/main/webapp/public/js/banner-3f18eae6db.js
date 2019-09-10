(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * 作者: 徐云飞
 * 版本: 1.0
 * 创建时间: 2016.10.20
*/

//漏洞验证脚本库发布者
var bannerListPub = new Deliver();
var pagenation = require( '../../../public/js-dev/pagenation' );
var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );
var pageInfo = {
        perPage: 8,
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
        var updateState = function( pageInfo ) {
            this.setState( {
                data: pageInfo.bannerList,
                startIndex: ( pageInfo.pagenation.currentPage - 1 ) * pageInfo.pagenation.perPage + 1
            } )
        };
        subscribe( updateState.bind( this ), bannerListPub );
    },
    render: function() {
        var lists = [],
            colspan = 8,
            startIndex = this.state.startIndex;

        lists = this.state.data.map( function( list, index ) {
            return React.createElement(TableCell, {key: index+1, startIndex: startIndex+index, data: list})
        } );
        if( lists.length === 0 ) {
            lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
        }
        return  React.createElement("table", {className: "table table-bordered table-hover"},
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "序号"),
                            React.createElement("th", null, "端口"),
                            React.createElement("th", null, "协议"),
                            React.createElement("th", null, "类型"),
                            React.createElement("th", null, "编码格式"),
                            React.createElement("th", null, "探测文件"),
                            React.createElement("th", null, "添加时间"),
                            React.createElement("th", null, "操作")
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
        var data = this.props.data;

        return  React.createElement("tr", null,
                    React.createElement("td", null, this.props.startIndex),
                    React.createElement("td", {className: "port"}, data.port),
                    React.createElement("td", {className: "protocol"}, data.protocol),
                    React.createElement("td", {className: "type"}, data.type),
                    React.createElement("td", {className: "encoding"}, data.encoding),
                    React.createElement("td", {className: "bannerFile"}, data.fileName),
                    React.createElement("td", {className: "addTime"}, formateDate(data.addTime, 'YYYY-MM-DD hh:mm:ss')),
                    React.createElement("td", {className: "operate", key: Math.random(), "data-id": data.id},
                        React.createElement("a", {className: "update", href: "javascript:;"}, "修改"),
                        React.createElement("a", {className: "delete", href: "javascript:;"}, "删除")
                    )
                )
    }
} );

ReactDOM.render(
   React.createElement(Table, null),
   document.getElementById( 'table' )
)

var bannerListPagenation = pagenation.pagenation();
bannerListPagenation.init( {
    url: 'bannerList',
    isCache: true,
    perPage: pageInfo.perPage,
    successCb: function( pageList ) {
        var pagenation = pageList.pagenation;
        pageInfo = pagenation;
        bannerListPub.deliver( pageList );

        if( pagenation.allNum > pagenation.perPage ) {
            pagination( 'project-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
                bannerListPagenation.requestPage( page );
                pageInfo.currentPage = page;
            }, pagenation.currentPage  );
        } else {
            $( '#project-page' ).empty();
        }
    }
} );
bannerListPagenation.requestPage( pageInfo.currentPage );

/***************************************************************************/
function init() {
    var $addOrChangeModel = $( '#addOrChangeModel' ),
        $modalTitle = $addOrChangeModel.find( '.modal-title' ),
        $form = $( '#addOrChange' ),
        $port = $form.find( 'input[name="port"]' ),
        $protocol = $form.find( 'input[name="protocol"]' ),
        $type = $form.find( 'select[name="type"]' ),
        $encoding = $form.find( 'select[name="encoding"]' ),
        $file = $form.find( 'input[name="bannerFile"]' ),
        $submit = $form.find( '.submit' ),
        $loading = $( '.loading' ),
        id = '',
        operateType; //add or update，标识是添加还是修改

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

    //初始化添加协议表单
    function initAddForm() {
        $modalTitle.text( '添加探测协议' );
        $submit.text( '添 加' );
        $port.val( '' );
        $protocol.val( '' );
        $type.val( 'tcp' );
        $encoding.val( 'String' );
        $file.val('');
    }

    //初始化修改协议表单
    function initUpdateForm( bannerInfo ) {
        $modalTitle.text( '修改探测协议' );
        $submit.text( '修 改' );
        $port.val( bannerInfo.port );
        $protocol.val( bannerInfo.protocol );
        $type.val( bannerInfo.type );
        $encoding.val( bannerInfo.encoding );
        $file.val('');
    }

    $( '.J-add' ).click( function() {
        operateType = 'add';

        initAddForm();

        $addOrChangeModel.modal( 'show' );
    } )

    $( '.table' ).delegate( '.update', 'click', function() {
        var $parentTr = $(this).parents('tr'),
            port = $parentTr.find('.port').text(),
            protocol = $parentTr.find('.protocol').text(),
            type = $parentTr.find('.type').text(),
            encoding = $parentTr.find('.encoding').text();

        operateType = 'update';

        initUpdateForm({
            port: port,
            protocol: protocol,
            type: type,
            encoding: encoding
        });

        id = $(this).parent().data('id');

        $addOrChangeModel.modal( 'show' );
    } )

    $submit.click( function() {
        var successMsg,
            errorMsg,
            url, data;

        if( !$form.valid() ) {
            return false;
        }

        data = new FormData($form[0]);

        if( operateType === 'add' ) {
            successMsg = '添加成功!';
            errorMsg = '添加失败!';

            url = 'addBanner';
        } else if( operateType === 'update' ){
            successMsg = '修改成功!';
            errorMsg = '修改失败!';

            url = 'updateBanner';
            data.append('id', id);
        } else {
            return false;
        }

        $addOrChangeModel.modal( 'hide' );
        $( '.loading' ).show();

        $.ajax( {
            type: 'POST',
            url: url,
            data: data,
            dataType: 'JSON',
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false
        } ).then( function( operateResult  ) {
            if( operateResult.bizNo > 0 ) {
                pop.success( successMsg );
                operateBannerCb();
            } else {
                pop.error( operateResult.bizMsg || errorMsg );
                errorCb( operateResult.bizMsg );
            }
        }, function() {
            pop.error( errorMsg );
            errorCb();
        } )
    } )

/********************************删除探测文件开始*********************************/
    $( '.table' ).delegate( '.delete', 'click', function() {
      var _id = $(this).parent().data('id'),
        url;

      pop.warning( '是否删本条探测信息?<br>此操作不可撤销, 请谨慎操作!' );
      pop.on( '.ok', 'click', function() {
        url = 'deleteBanner?id=' + _id;
        deleteBanner( url, function() {
            pop.hide(function() {
                pop.success( '删除成功!' );
                $loading.show();
                operateBannerCb();
            })
        }, function( errMsg ) {
            pop.hide(function() {
                pop.error( errMsg );
                $loading.hide();
            })
        } );
      } )
    } )

    //删除一个项目
    function deleteBanner( ajaxUrl, successCb, errorCb ) {
      $.ajax( {
        url: ajaxUrl,
        type: 'GET',
        dataType: 'JSON'
      } ).then( function( operateResult  ) {
        if( operateResult.bizNo > 0 ) {
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
    function operateBannerCb() {
        var allPage = Math.ceil( pageInfo.allNum / pageInfo.perPage );

        //删除检查员时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
        if( allPage < pageInfo.currentPage ) {
            pageInfo.currentPage = pageInfo.currentPage - 1;
            if( pageInfo.currentPage < 1 ) {
                pageInfo.currentPage = 1;
            }
        }

        if( pageInfo.allNum >= 0 ) {
            bannerListPagenation.setOption( 'isCache', false );
            bannerListPagenation.requestPage( pageInfo.currentPage );
            bannerListPagenation.setOption( 'isCache', true );
        }
    }

      $.validator.addMethod( "port", function( value, element, params ) {
        //端口段或者单个端口，空格分隔
        var portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

        value = value.trim();

        if( value === '' || portReg.test( value ) ) {
            return true;
        }

        return false;
    }, "输入格式不正确");

    $.validator.addMethod( "portRange", function( value, element, params ) {
        if( value>=0 && value <= 65535 ) {
            return true;
        }
        return false;
    }, "端口范围为0-65535");

     $.validator.addMethod( "protocol", function( value, element, params ) {
        //端口段或者单个端口，空格分隔
        var portReg = /^[A-Za-z0-9]+$/;

        value = value.trim();

        if(  portReg.test( value ) && value.length < 45 ) {
            return true;
        }

        return false;
    }, "协议格式不正确");

    $.extend($.validator.messages, {
        required: "这是必填字段",
    });

    $form.validate( {
        rules: {
            'port': {
                required: true,
                portRange:true,
                port: true,
            },
            'protocol':{
                required: true,
                protocol: true
            },
            'bannerFile':'required'
        }
    } );
}

init();










},{"../../../public/js-dev/pagenation":2,"../../../public/js-dev/pop":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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


},{"../../../public/js-dev/pagenation":2,"../../../public/js-dev/pop":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
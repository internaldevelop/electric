//瀑布流换页，以及滚动条滚动加载
//规则：1.加载新数据可以通过滚动条加载，也可以通过点击下一页进行加载
//      2.一点点击了下一页则，前面的所有页面不能通过滚动条来加载数据
//      3.所有已经加载的数据缓存起来，不再重新加载

/*
$( function() {
    var scrollId, resizeId, water, listInfo, pageInfo;

    function init() {

        pageInfo = {
            0: {
                children: [],

                //本页是否还能进行滚动加载
                isScrollLoad: true,

                //已经加载的次数
                loadNum: 0,

                //到当前页为止已经加载的数据总数，用于页面展示统计结果
                loadPageNum: 0

            },

            //设备总数
            totalNum: 0,

            //已经加载的数据总数
            loadPageNum: 0,

            //当前页码，从0开始
            currentPage: 0,

            //每次加载几个
            perNum: 10,

            //每页加载多少次
            count: 4
        };

        water = waterFall( {
            $par: $( '.device-list' ),
            minWidth: 280,
            space: 10,
          //  $children: $( '.device-list .each-device' )
        } );

        listInfo = getData();

        if( listInfo.list.length > 0 ) {

            updateList( listInfo );
        }
        
    }

    function updateList( listInfo ) {
        var currentPage = pageInfo.currentPage;

        pageInfo.totalNum = listInfo.totalNum;
        pageInfo.loadPageNum += listInfo.list.length;
        pageInfo[ currentPage ].loadPageNum = pageInfo.loadPageNum;
        pageInfo[ currentPage ].loadNum++;

        updateShowNum();

        if( pageInfo[ currentPage ].loadNum === pageInfo.count ) {
            pageInfo[ currentPage ].isScrollLoad = false;
        }

        pageInfo[ currentPage ].children = pageInfo[ currentPage ].children.concat( listInfo.list );

        water.append( listInfo.list )
    }

    function updateShowNum() {
        $( '.result-sum .num' ).text( pageInfo[ pageInfo.currentPage ].loadPageNum +
            '/' + pageInfo.totalNum );
    }

    function noMoreData() {
        var noticeObj = $( '.no-data' );

        if( noticeObj.hasClass( 'appear' ) ) {
            return;
        }

        $( '.no-data' ).addClass( 'appear' );

        setTimeout( function() {
            $( '.no-data' ).removeClass( 'appear' );
        }, 2000 )
    }

    $( window ).resize( function() {
        clearTimeout( resizeId );

        resizeId = setTimeout( function() {
            water.fresh();
        }, 200 );
    } );

    $( '.pageCtrl .pre' ).click( function() {
        var that = $( this );

        if( that.hasClass( 'no' ) || pageInfo.currentPage === 0 ) {
            return false;
        }

        pageInfo.currentPage--;
        water.clear().append( pageInfo[ pageInfo.currentPage ].children );
        updateShowNum();

        if( pageInfo.currentPage === 0 ) {
            that.addClass( 'no' );
        }
    } );

    $( '.pageCtrl .next' ).click( function() {

        if( pageInfo[ pageInfo.currentPage + 1 ] != null ) {
            //有缓存的数据

            pageInfo.currentPage++;
            water.clear().append( pageInfo[ pageInfo.currentPage ].children );
            updateShowNum();

            $( '.pageCtrl .pre' ).removeClass( 'no' );
        } else {
            //没有下一页的数据，请求新数据

            listInfo = getData();

            if( listInfo.list.length > 0 ) {
                water.clear();
                
                pageInfo[ pageInfo.currentPage ].isScrollLoad = false;
                    pageInfo.currentPage++;

                    pageInfo[ pageInfo.currentPage ] = {
                        children: [],
                        isScrollLoad: true,
                        loadNum: 0
                    }

                    updateList( listInfo );

                    $( '.pageCtrl .pre' ).removeClass( 'no' );
                

            } else {
                noMoreData();
            }
        }        
    } );

    $( '.device-list-wrap' ).scroll( function() {
        var that = $( this );

        clearTimeout( scrollId );
        scrollId = setTimeout( function() {
            var scrollTop = that.scrollTop(),
                height = that.height(),
                scrollHeight = that[ 0 ].scrollHeight,
                currentPage = pageInfo.currentPage;

            //滚动条滚动到底部再进行数据请求
            if( scrollHeight - scrollTop - height < 100 ) {

                if( pageInfo[ pageInfo.currentPage ].loadNum < pageInfo.count &&
                    pageInfo[ pageInfo.currentPage ].isScrollLoad === true ) {

                    listInfo = getData();

                    if( listInfo.list.length > 0 ) {

                        //判断当前页是否等于加载数据前的当前页，防止在加载过程中进行了翻页
                        //如果进行了翻页，数据请求回来不进行任何处理
                        if( currentPage === pageInfo.currentPage ) {
                            updateList( listInfo );
                        }
                        
                    }
                }
            }

        }, 100 );

    } );

   // init();
} )
*/

/*
 * @input:options = {
    $par: //瀑布流的父元素，向其中添加元素
    perWidth: //每个子元素的宽度
    $children: //需要进行布局处理的jquery子元素
    rowSpace: //每行之间的间隔
 }
*/
function waterFall( options ) {
    var option, returnObj,
        defaultOpt = {
            $par: null,
            perWidth: 0,
            $children: null,
            space: 0,
            rowSpace: 10,
            minWidth: 0
        };

    option = $.extend( defaultOpt, options );

    function WaterFall( $par, perWidth, $children ) {

        this.colsHeight = [];
        this.children = [];

        this.$par = $par;
        this.perWidth = option.perWidth;
       
        //初始化
        this.init( $children );
    }

    WaterFall.prototype.init = function( $children ) {
        var that = this;

        this.getPos();

        this.append( $children );
    }

    //计算瀑布流列数，间距，首列距左侧距离
    WaterFall.prototype.getPos = function() {
        var i, len, pos;

        if( option.perWidth !== 0 ) {
            //固定宽度

            pos = widthFixed(  this.$par.width(), option.perWidth );
        } else if( option.space !==0 ) {
            //固定间隙和最小宽度

            pos = spaceFixed( this.$par.width(), option.space, option.minWidth );
        }

        this.space = pos.space || option.space;
        this.perWidth = pos.perWidth || option.perWidth;
        this.cols = pos.cols;
        this.left = pos.left;

        this.colsHeight = [];

        for( i = 0; i < this.cols; i++ ) {
            this.colsHeight[ i ] = 0;
        }
    }

    //向对象中追加元素，输入为jquery对象
    WaterFall.prototype._append = function( children ) {
        var childHeight, i, len, minObj,
            that = this;

        //遍历子元素，计算子元素定位位置
        for( i = 0, len = children.length; i < len; i++ ) {

            this.$par.append( children[ i ] );

            childHeight = children[ i ].innerHeight();

            //获取最短列和索引
            minObj = getMinElem( this.colsHeight );

            children[ i ].css( {
                top: minObj.value + 'px',
                left: that.left + ( that.perWidth + that.space ) * minObj.index + 'px',
                width: that.perWidth + 'px'
            } );

            this.colsHeight[ minObj.index ] += childHeight + option.rowSpace;
        }

        this.$par.css( 'height', Math.max.apply( '', this.colsHeight ) + 'px' );

        return this;
    }

    //向对象中追加元素，输入为jquery对象
    WaterFall.prototype.append = function( children ) {
        var childrenArray = [],
            that = this;

        if( !children ) {
            return this;
        }

        if( $.type( children ) === 'array' ) {
            this.children = this.children.concat( children );
            this._append( children );
        } else {
            children.each( function( _, elem ) {
                that.children.push( $( elem ) );
                childrenArray.push( $( elem ) );
            } );

            this._append( childrenArray );
        }

        return this;
    }

    //普通刷新，重新计算位置，重新排列子元素
    WaterFall.prototype.fresh = function() {
        this.getPos();
        this._append( this.children );

        return this;
    }

    //强制刷新，清空children对象，重新计算位置
    WaterFall.prototype.clear = function() {
        this.getPos();
        this.children = [];
        this.$par.empty().css( 'height', 0 );

        return this;
    }

    //计算数组中最小元素及其索引
    function getMinElem( src ) {
        var i, len,
            index = 0,
            min = src[ 0 ];

        for( i = 0, len = src.length; i < len; i++ ) {
            if( min > src[ i ] ) {
                index = i;
                min = src[ i ];
            }
        }

        return {
            index: index,
            value: min
        }
    }


    //固定列宽，间隙可变
    //计算瀑布流的列数，第一列距离左侧的距离，以及每列之间的间隔
    function widthFixed( totalWidth, perWidth ) {
        var nSideSpace, nNormal,

            //最终的列数
            n,

            //列与列之间的空隙
            space = 1,

            //第一列距离左侧的距离
            left;

        nNormal = parseInt( ( totalWidth + space ) / ( perWidth + space ), 10 );
        nSideSpace = parseInt( ( totalWidth - space ) / ( perWidth + space ), 10 );

        //console.log(nNormal === nSideSpace)
        //相等说明在左右两侧加上空白也不会影响到最终列数，为了使布局居中
        if( nNormal === nSideSpace ) {
            n = nSideSpace;
            space = parseInt( ( totalWidth + space - ( perWidth + space ) * n ) / ( n + 1 ), 10 ) + space;
            left = parseInt( ( totalWidth - ( perWidth * n + space * ( n + 1 ) ) ) / 2, 10 );

        } else {
            n = nNormal;
            space = parseInt( ( totalWidth + space - ( perWidth + space ) * n ) / ( n - 1 ), 10 ) + space;
            left = parseInt( ( totalWidth - ( perWidth * n + space * ( n - 1 ) ) ) / 2, 10 );
        }

        //总宽度小于等于每列的宽度或者总宽度等于两列宽度和
        if( n === 0 || n === 1 ) {
            n === 0 ? left = 0 : left = parseInt( ( totalWidth - perWidth ) / 2, 10 );
           
            return {
                cols: 1,
                space: 0,
                left: left
            }
        }

        return {
            cols: n,
            space: space,
            left: left + space
        }
    }

    //固定间隔，宽度可变，但是有一个最小宽度
    function spaceFixed( totalWidth, space, minWidth ) {
        var n,
            perWidth ,
            left;

        n = parseInt( ( totalWidth + space ) / ( minWidth + space ), 10 );
        perWidth = parseInt( ( totalWidth + space - ( minWidth + space ) * n ) / n, 10 ) + minWidth;
        left = parseInt( ( totalWidth + space - ( perWidth + space ) * n ) / 2, 10 );
       
        if( n === 0 ) {
            return {
                cols: 1,
                perWidth: minWidth,
                left: 0
            }
        }

        return {
            cols: n,
            perWidth: perWidth,
            left: left
        }
    }

    //创建瀑布流对象
    returnObj = new WaterFall( option.$par, option.perWidth, option.$children );

    return returnObj;
}



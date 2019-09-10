(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//@param {string} id ÁîªÂõæÂÆπÂô®DOMÁöÑid
//@param {array} data Êï∞ÊçÆlist,Ê†ºÂºè‰∏∫[{name:'',value:''}]
//@return: null
function drawPie( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            color: colorArray,
            tooltip : {
                trigger: 'item',
                //formatter: "{a} <br/>{b} : {c} ({d}%)"
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left'
            },
            toolbox: {
                show : false,
            },
            calculable : true,
            animation: false,
            series : [
                {
                    name: name,
                    type:'pie',
                     itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}:{c}",
                                position: 'inner'
                            },
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        }
                    },
                    radius : '90%',
                    center: ['50%', '53%'],
                    data: data
                }
            ]
        };

    myChart.setOption(option);
}

//@param {string} id ÁîªÂõæÂÆπÂô®DOMÁöÑid
//@param {object} data Êï∞ÊçÆlist,Ê†ºÂºè‰∏∫{xAxis:[],series:[{name: , type: , data: }]}
//@return: null
function drawColumn( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            tooltip : {
                trigger: 'axis'
            },
            color: colorArray,
            legend: {
            },
            toolbox: {
            },
            calculable : true,
            animation: false,
            grid: {
                left: '2%',
                //right: '4%',
                //bottom: '3%',
                top:'8%',
                width: '90%',
                height: '90%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.xAxis,
                    axisLabel: {
                        interval: 0,
                        rotate: -5
                       
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : data.series
        };
                    
    myChart.setOption(option);
}




  //øÿ÷∆√øÃı÷˘µƒŒƒ◊÷œ‘ æ2 2017-12-22∞Ê
  function barTitleLineCtr( data ){
      var res = [];
      for( var i = 0; i < data.length; i++ ){
          var len = data[i].length;
          var objStr = '';
          if( len > 10 ){
              objStr = data[i].substring(0,10)+'...';
          }else{
              objStr = data[i];
          }
          res.push( objStr );
      }
      return res;
  }

//@param {string} id ÁîªÂõæÂÆπÂô®DOMÁöÑid
//@param {object} data Êï∞ÊçÆlist,Ê†ºÂºè‰∏∫{xAxis:[],series:[{name: , type: , data: }]}
//@return: null
function drawBar( id, data, colorArray ) {
    var myChart = echarts.init(document.getElementById( id )),
        option = {
            title : {
            },
            tooltip : {
                trigger: 'axis'
            },
            color: colorArray,
            legend: {
            },
            toolbox: {
            },
            calculable : true,
            animation: false,
            position:'top',
            grid: {
                left: '2%',
                //right: '4%',
                //bottom: '3%',
                top:'8%',
                width: '90%',
                height: '92%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'value',
                    boundaryGap : [0, 0.01]
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : barTitleLineCtr(data.yAxis),
                    axisLabel: {
                        interval: 0
                    }
                }
            ],
            series : data.series
        };
    
    myChart.setOption(option);              
};

module.exports = {
    drawPie: drawPie,
    drawColumn: drawColumn,
    drawBar: drawBar
}



},{}]},{},[1])
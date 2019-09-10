//@param {string} id 画图容器DOM的id
//@param {array} data 数据list,格式为[{name:'',value:''}]
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

//@param {string} id 画图容器DOM的id
//@param {object} data 数据list,格式为{xAxis:[],series:[{name: , type: , data: }]}
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

//@param {string} id 画图容器DOM的id
//@param {object} data 数据list,格式为{xAxis:[],series:[{name: , type: , data: }]}
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
                    data : data.yAxis,
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


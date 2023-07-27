import React from 'react';
import ReactEcharts from "echarts-for-react"; 
/*
    This component is to display the histogram.
*/
function Histogram(props) {
    //option for histogram
    let app = {};
    let option;

    const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
    ];
    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: 'left',
                center: 'center',
                right: 'right'
            }
        },
        verticalAlign: {
            options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
            }
        },
        position: {
            options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
            }, {})
        },
        distance: {
            min: 0,
            max: 100
        }
    };
    app.config = {  
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
        onChange: function () {
            const labelOption = 
            {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            };
            myChart.setOption({
            series: [
                {
                    label: labelOption
                },
                {
                    label: labelOption
                },
                {
                    label: labelOption
                },
                {
                    label: labelOption
                }
            ]
            });
        }
    };
    const labelOption = {
        show: false,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 0,
        rich: {
            name: {}
        }
    };
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['totalconfirmed', 'totalrecovered', 'totaldeceased']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: props.data.XAxis.map((date)=>{
                    return (new Date(date).toISOString().split('T')[0]);
                })
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: 
        [
            {
                name: 'Averagedailyconfirmed',
                type: 'bar',
                barGap: 5,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: props.data.dailyconfirmed,
                barWidth: '50%'
            },
            {
                name: 'Averagedailyrecovered',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: props.data.dailyrecovered,
                barWidth: '50%'
            },
            {
                name: 'Averagedailydeceased',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: props.data.dailydeceased,
                barWidth: '50%'
            },
        ]
    };
    return (
        <div className="w-full h-[400px] ">
            {/*div to display histogram*/}

            <ReactEcharts option={option} />
        </div>
    );
}

export default Histogram;
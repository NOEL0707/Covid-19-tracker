import React from "react";
import ReactEcharts from "echarts-for-react"; 

/*
  This component is to display the Stacked Line chart.
*/
function StackedLineChart(props) {
  //option for the chart
  let option = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['totalconfirmed', 'totalrecovered', 'totaldeceased']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.data.XAxis.map((date)=>{
          return (new Date(date).toISOString().split('T')[0]);
        })
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'totalconfirmed',
          type: 'line',
          stack: 'Total',
          data: props.data.totalconfirmed
        },
        {
          name: 'totalrecovered',
          type: 'line',
          stack: 'Total',
          data: props.data.totalrecovered
        },
        {
          name: 'totaldeceased',
          type: 'line',
          stack: 'Total',
          data: props.data.totaldeceased
        }
      ]
    };
    console.log(props.data.XAxis);
  return (
      <div className="w-full h-[400px] ">
        {/*div to display histogram*/}
        <ReactEcharts option={option} />;
      </div>
  );
}

export default StackedLineChart;
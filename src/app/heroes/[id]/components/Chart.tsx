import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Character } from '../../../../types/index';
interface ChartProps {
  character: Character;
}

const Chart: React.FC<ChartProps> = ({character}) => {
  const option = {
    title: {
      text: 'Appearances',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Appearances',
        type: 'pie',
        radius: '50%',
        data: [
          { value: character.series?.available, name: 'Series' },
          { value: character.stories?.available, name: 'Stories' },
          { value: character.comics?.available, name: 'Comics' },
          { value: character.events?.available, name: 'Events' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '70%' }} />;
};

export default Chart;
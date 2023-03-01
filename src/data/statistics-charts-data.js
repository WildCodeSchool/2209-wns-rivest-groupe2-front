import { chartsConfig } from '../configs/charts-config';

const websiteViewsChart = {
  type: 'bar',
  height: 220,
  series: [
    {
      name: 'Visited places',
      data: [6, 10, 6, 7, 6, 12],
    },
  ],
  options: {
    ...chartsConfig,
    colors: '#fff',
    plotOptions: {
      bar: {
        columnWidth: '16%',
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    },
  },
};

const dailySalesChart = {
  type: 'line',
  height: 220,
  series: [
    {
      name: 'Kilometers',
      data: [ 70, 95, 66, 80, 80, 115],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ['#fff'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
};



const completedTasksChart = {
  type: 'line',
  height: 220,
  series: [
    {
      name: 'Kilometers',
      data: [ 4, 4.25, 3.5, 5, 4.25, 3.5],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ['#fff'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
};


export const statisticsChartsData = [
  {
    color: 'blue',
    title: 'Visited Places',
    description: 'Last 6 months',
    footer: 'Last visited place: 2 days ago',
    chart: websiteViewsChart,
  },
  {
    color: 'pink',
    title: 'Number of kilometers travelled',
    description: 'Last 6 months',
    footer: 'Updated: 2 days ago',
    chart: dailySalesChart,
  },
  {
    color: 'green',
    title: 'Average rating evolution',
    description: 'Last 6 months',
    footer: 'Updated: 2 days ago',
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;

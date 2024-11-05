import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexLegend } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend?: ApexLegend;
};
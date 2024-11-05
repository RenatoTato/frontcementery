import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexLegend, ApexXAxis, ApexYAxis, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels?: string[]; // Opcional para gráficos con ejes
  responsive: ApexResponsive[];
  legend?: ApexLegend;
  xaxis?: ApexXAxis; // Para gráficos de barras y otros con ejes
  yaxis?: ApexYAxis; // Para gráficos con eje y
  dataLabels?: ApexDataLabels; // Para etiquetas en datos
  plotOptions?: ApexPlotOptions; // Configuración de opciones para gráficos de barras
};
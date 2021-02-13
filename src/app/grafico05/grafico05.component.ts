import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

interface ExtendedChart extends Highcharts.PlotPackedbubbleOptions {
  layoutAlgorithm: {
    splitSeries: any; // Para poner type a este campo, en otro caso se queja Angular
  };
}

@Component({
  selector: "app-grafico05",
  templateUrl: "./grafico05.component.html",
  styleUrls: ["./grafico05.component.css"]
})
export class Grafico05Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "packedbubble",
      height: "40%"
    },
    title: {
      text: ""
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}micrg/m3 PM<sub>2.5</sub>"
    },
    plotOptions: {
      packedbubble: {
        minSize: "20%",
        maxSize: "100%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: true,
          parentNodeLimit: true
        },

        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 250
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal"
          }
        }
      } as ExtendedChart
    },
    series: [
      {
        type: "packedbubble",
        name: "Grecia",
        data: [
          {
            name: "Estación 1",
            value: 767.1
          },
          {
            name: "Estación 2",
            value: 20.7
          },
          {
            name: "Estación 3",
            value: 97.2
          },
          {
            name: "Estación 4",
            value: 111.7
          }
        ]
      },
      {
        type: "packedbubble",
        name: "España",
        data: [
          {
            name: "Bermejales",
            value: 22.2
          },
          {
            name: "Los Remedios",
            value: 56.2
          },
          {
            name: "Centro",
            value: 17.1
          },
          {
            name: "Los Principes",
            value: 89.1
          }
        ]
      },
      {
        type: "packedbubble",
        name: "Bulgaria",
        data: [
          {
            name: "Estación 1",
            value: 7.6
          },
          {
            name: "Estación 2",
            value: 8.4
          },
          {
            name: "Estación 3",
            value: 8.3
          },
          {
            name: "Estación 4",
            value: 10.2
          }
        ]
      }
    ]
  };
  constructor() {}
  select: String = "PM10";
  ngOnInit() {
    this.cargar();
  }
  submitted = false;

  seriesPM25: any = [
    {
      type: "packedbubble",
      name: "Grecia",
      data: [
        {
          name: "Estación 1",
          value: 7
        },
        {
          name: "Estación 2",
          value: 2
        },
        {
          name: "Estación 3",
          value: 97.2
        },
        {
          name: "Estación 4",
          value: 11.7
        }
      ]
    },
    {
      type: "packedbubble",
      name: "España",
      data: [
        {
          name: "Bermejales",
          value: 8.2
        },
        {
          name: "Los Remedios",
          value: 9.2
        },
        {
          name: "Centro",
          value: 13.1
        },
        {
          name: "Los Principes",
          value: 14.1
        }
      ]
    },
    {
      type: "packedbubble",
      name: "Bulgaria",
      data: [
        {
          name: "Estación 1",
          value: 77.6
        },
        {
          name: "Estación 2",
          value: 88.4
        },
        {
          name: "Estación 3",
          value: 5.3
        },
        {
          name: "Estación 4",
          value: 100.2
        }
      ]
    }
  ];

  seriesPM10: any = [
    {
      type: "packedbubble",
      name: "Grecia",
      data: [
        {
          name: "Estación 1",
          value: 767.1
        },
        {
          name: "Estación 2",
          value: 20.7
        },
        {
          name: "Estación 3",
          value: 97.2
        },
        {
          name: "Estación 4",
          value: 111.7
        }
      ]
    },
    {
      type: "packedbubble",
      name: "España",
      data: [
        {
          name: "Bermejales",
          value: 22.2
        },
        {
          name: "Los Remedios",
          value: 56.2
        },
        {
          name: "Centro",
          value: 17.1
        },
        {
          name: "Los Principes",
          value: 89.1
        }
      ]
    },
    {
      type: "packedbubble",
      name: "Bulgaria",
      data: [
        {
          name: "Estación 1",
          value: 7.6
        },
        {
          name: "Estación 2",
          value: 8.4
        },
        {
          name: "Estación 3",
          value: 8.3
        },
        {
          name: "Estación 4",
          value: 10.2
        }
      ]
    }
  ];

  onSubmit() {
    this.cargar();
  }

  contaminantes = ["PM10", "PM25"];

  cargar() {
    this.chartOptions.title.text = `Datos actuales del contaminante: ${this.select}`;
    this.chartOptions.tooltip.pointFormat =
    `<b>{point.name}:</b> {point.value}µg/m3 ${this.select}`;
    if (this.select == "PM10") {
      this.chartOptions.series = this.seriesPM10;
    } else if (this.select == "PM25") {
      this.chartOptions.series = this.seriesPM25;
    }
    Highcharts.chart("miGrafico", this.chartOptions);
  }
}

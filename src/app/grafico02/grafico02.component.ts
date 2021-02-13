import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Select } from "../seleccion";
/*
IMPORTANTE Añadir las siguientes línes para el heatmap
*/
import HeatmapModule from "highcharts/modules/heatmap";
HeatmapModule(Highcharts);

const getPointCategoryName = (point: any, dimension: any) => {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
};

const colorEU = (contaminante: number, valor: number): string => {
  let miColor: string;
  // Códigos aceptados [0.- PM25, 1.- PM10, 2.- NO2, 3.- O3, 4.- SO2]
  const limtesCont = [
    [10, 20, 25, 50, 75, 800],
    [20, 40, 50, 100, 150, 1200],
    [40, 90, 120, 230, 340, 1000],
    [50, 100, 130, 240, 380, 800],
    [100, 200, 350, 500, 750, 1250]
  ];

  // ORDEN PARA colores
  //  "Good",  "Fair", "Moderate", "Poor", "VeryPoor", "ExtremelyPoor",
  const coloresAQI: any = [
    "#50F0E6",
    "#50CCAA",
    "#F0E641",
    "#FF5050",
    "#960032",
    "#7D2181"
  ];

  if (valor < limtesCont[contaminante][0]) {
    miColor = coloresAQI[0];
  } else if (valor < limtesCont[contaminante][1]) {
    miColor = coloresAQI[1];
  } else if (valor < limtesCont[contaminante][2]) {
    miColor = coloresAQI[2];
  } else if (valor < limtesCont[contaminante][3]) {
    miColor = coloresAQI[3];
  } else if (valor < limtesCont[contaminante][4]) {
    miColor = coloresAQI[4];
  } else {
    miColor = coloresAQI[5];
  }

  return miColor;
};

let dataSeriesFinal: any;

const dataSeriesOrig: any = [
  { x: 0, y: 0, value: 9 },
  { x: 1, y: 0, value: 19 },
  { x: 2, y: 0, value: 24 },
  { x: 3, y: 0, value: 49 },
  { x: 4, y: 0, value: 74 },
  { x: 5, y: 0, value: 799 },
  { x: 6, y: 0, value: 50 },
  { x: 7, y: 0, value: 25 },
  { x: 8, y: 0, value: 20 },
  { x: 9, y: 0, value: 10 },
  { x: 10, y: 0, value: 0 },
  { x: 11, y: 0, value: 9 },
  { x: 12, y: 0, value: 19 },
  { x: 13, y: 0, value: 24 },
  { x: 14, y: 0, value: 49 },
  { x: 15, y: 0, value: 74 },
  { x: 16, y: 0, value: 799 },
  { x: 17, y: 0, value: 50 },
  { x: 18, y: 0, value: 25 },
  { x: 19, y: 0, value: 20 },
  { x: 20, y: 0, value: 10 },
  { x: 21, y: 0, value: 0 },
  { x: 22, y: 0, value: 19 },
  { x: 23, y: 0, value: 24 },
  { x: 24, y: 0, value: 49 },
  { x: 25, y: 0, value: 74 },
  { x: 26, y: 0, value: 799 },
  { x: 27, y: 0, value: 50 },
  { x: 28, y: 0, value: 25 },
  { x: 29, y: 0, value: 20 },
  { x: 30, y: 0, value: 10 },

  { x: 0, y: 1, value: 19 },
  { x: 1, y: 1, value: 25 },
  { x: 2, y: 1, value: 45 },
  { x: 3, y: 1, value: 58 },
  { x: 4, y: 1, value: 120 },
  { x: 5, y: 1, value: 151 },
  { x: 6, y: 1, value: 119 },
  { x: 7, y: 1, value: 50 },
  { x: 8, y: 1, value: 43 },
  { x: 9, y: 1, value: 23 },
  { x: 10, y: 1, value: 2 },
  { x: 11, y: 1, value: 9 },
  { x: 12, y: 1, value: 19 },
  { x: 13, y: 1, value: 24 },
  { x: 14, y: 1, value: 49 },
  { x: 15, y: 1, value: 74 },
  { x: 16, y: 1, value: 799 },
  { x: 17, y: 1, value: 50 },
  { x: 18, y: 1, value: 25 },
  { x: 19, y: 1, value: 20 },
  { x: 20, y: 1, value: 10 },
  { x: 21, y: 1, value: 0 },
  { x: 22, y: 1, value: 19 },
  { x: 23, y: 1, value: 24 },
  { x: 24, y: 1, value: 49 },
  { x: 25, y: 1, value: 74 },
  { x: 26, y: 1, value: 799 },
  { x: 27, y: 1, value: 50 },
  { x: 28, y: 1, value: 25 },
  { x: 29, y: 1, value: 20 },
  { x: 30, y: 1, value: 10 },

  { x: 0, y: 2, value: 39 },
  { x: 1, y: 2, value: 89 },
  { x: 2, y: 2, value: 119 },
  { x: 3, y: 2, value: 229 },
  { x: 4, y: 2, value: 339 },
  { x: 5, y: 2, value: 999 },
  { x: 6, y: 2, value: 230 },
  { x: 7, y: 2, value: 120 },
  { x: 8, y: 2, value: 90 },
  { x: 9, y: 2, value: 40 },
  { x: 10, y: 2, value: 4 },
  { x: 11, y: 2, value: 9 },
  { x: 12, y: 2, value: 19 },
  { x: 13, y: 2, value: 24 },
  { x: 14, y: 2, value: 49 },
  { x: 15, y: 2, value: 74 },
  { x: 16, y: 2, value: 799 },
  { x: 17, y: 2, value: 50 },
  { x: 18, y: 2, value: 25 },
  { x: 19, y: 2, value: 20 },
  { x: 20, y: 2, value: 10 },
  { x: 21, y: 2, value: 0 },
  { x: 22, y: 2, value: 19 },
  { x: 23, y: 2, value: 24 },
  { x: 24, y: 2, value: 49 },
  { x: 25, y: 2, value: 74 },
  { x: 26, y: 2, value: 799 },
  { x: 27, y: 2, value: 50 },
  { x: 28, y: 2, value: 25 },
  { x: 29, y: 2, value: 20 },
  { x: 30, y: 2, value: 10 },

  { x: 0, y: 3, value: 49 },
  { x: 1, y: 3, value: 99 },
  { x: 2, y: 3, value: 129 },
  { x: 3, y: 3, value: 239 },
  { x: 4, y: 3, value: 379 },
  { x: 5, y: 3, value: 799 },
  { x: 6, y: 3, value: 370 },
  { x: 7, y: 3, value: 135 },
  { x: 8, y: 3, value: 120 },
  { x: 9, y: 3, value: 60 },
  { x: 10, y: 3, value: 6 },
  { x: 11, y: 3, value: 9 },
  { x: 12, y: 3, value: 19 },
  { x: 13, y: 3, value: 24 },
  { x: 14, y: 3, value: 49 },
  { x: 15, y: 3, value: 74 },
  { x: 16, y: 3, value: 799 },
  { x: 17, y: 3, value: 50 },
  { x: 18, y: 3, value: 25 },
  { x: 19, y: 3, value: 20 },
  { x: 20, y: 3, value: 10 },
  { x: 21, y: 3, value: 0 },
  { x: 22, y: 3, value: 19 },
  { x: 23, y: 3, value: 24 },
  { x: 24, y: 3, value: 49 },
  { x: 25, y: 3, value: 74 },
  { x: 26, y: 3, value: 799 },
  { x: 27, y: 3, value: 50 },
  { x: 28, y: 3, value: 25 },
  { x: 29, y: 3, value: 20 },
  { x: 30, y: 3, value: 10 },

  { x: 0, y: 4, value: 50 },
  { x: 1, y: 4, value: 150 },
  { x: 2, y: 4, value: 220 },
  { x: 3, y: 4, value: 380 },
  { x: 4, y: 4, value: 600 },
  { x: 5, y: 4, value: 800 },
  { x: 6, y: 4, value: 700 },
  { x: 7, y: 4, value: 400 },
  { x: 8, y: 4, value: 280 },
  { x: 9, y: 4, value: 130 },
  { x: 10, y: 4, value: 10 },
  { x: 11, y: 4, value: 9 },
  { x: 12, y: 4, value: 19 },
  { x: 13, y: 4, value: 24 },
  { x: 14, y: 4, value: 49 },
  { x: 15, y: 4, value: 74 },
  { x: 16, y: 4, value: 799 },
  { x: 17, y: 4, value: 50 },
  { x: 18, y: 4, value: 25 },
  { x: 19, y: 4, value: 20 },
  { x: 20, y: 4, value: 10 },
  { x: 21, y: 4, value: 0 },
  { x: 22, y: 4, value: 19 },
  { x: 23, y: 4, value: 24 },
  { x: 24, y: 4, value: 49 },
  { x: 25, y: 4, value: 74 },
  { x: 26, y: 4, value: 799 },
  { x: 27, y: 4, value: 50 },
  { x: 28, y: 4, value: 25 },
  { x: 29, y: 4, value: 20 },
  { x: 30, y: 4, value: 10 }
];

const dataSeriesOrig2: any = [
  { x: 0, y: 0, value: 99 },
  { x: 1, y: 0, value: 19 },
  { x: 2, y: 0, value: 24 },
  { x: 3, y: 0, value: 490 },
  { x: 4, y: 0, value: 40 },
  { x: 5, y: 0, value: 79 },
  { x: 6, y: 0, value: 5 },
  { x: 7, y: 0, value: 50 },
  { x: 8, y: 0, value: 200 },
  { x: 9, y: 0, value: 100 },
  { x: 10, y: 0, value: 80 },
  { x: 11, y: 0, value: 98 },
  { x: 12, y: 0, value: 198 },
  { x: 13, y: 0, value: 247 },
  { x: 14, y: 0, value: 496 },
  { x: 15, y: 0, value: 7 },
  { x: 16, y: 0, value: 79 },
  { x: 17, y: 0, value: 560 },
  { x: 18, y: 0, value: 265 },
  { x: 19, y: 0, value: 260 },
  { x: 20, y: 0, value: 160 },
  { x: 21, y: 0, value: 60 },
  { x: 22, y: 0, value: 169 },
  { x: 23, y: 0, value: 64 },
  { x: 24, y: 0, value: 9 },
  { x: 25, y: 0, value: 74 },
  { x: 26, y: 0, value: 79 },
  { x: 27, y: 0, value: 570 },
  { x: 28, y: 0, value: 275 },
  { x: 29, y: 0, value: 70 },
  { x: 30, y: 0, value: 170 },

  { x: 0, y: 1, value: 197 },
  { x: 1, y: 1, value: 257 },
  { x: 2, y: 1, value: 475 },
  { x: 3, y: 1, value: 578 },
  { x: 4, y: 1, value: 120 },
  { x: 5, y: 1, value: 51 },
  { x: 6, y: 1, value: 719 },
  { x: 7, y: 1, value: 570 },
  { x: 8, y: 1, value: 473 },
  { x: 9, y: 1, value: 237 },
  { x: 10, y: 1, value: 2 },
  { x: 11, y: 1, value: 69 },
  { x: 12, y: 1, value: 179 },
  { x: 13, y: 1, value: 24 },
  { x: 14, y: 1, value: 49 },
  { x: 15, y: 1, value: 74 },
  { x: 16, y: 1, value: 99 },
  { x: 17, y: 1, value: 650 },
  { x: 18, y: 1, value: 25 },
  { x: 19, y: 1, value: 260 },
  { x: 20, y: 1, value: 10 },
  { x: 21, y: 1, value: 60 },
  { x: 22, y: 1, value: 19 },
  { x: 23, y: 1, value: 624 },
  { x: 24, y: 1, value: 49 },
  { x: 25, y: 1, value: 674 },
  { x: 26, y: 1, value: 799 },
  { x: 27, y: 1, value: 0 },
  { x: 28, y: 1, value: 25 },
  { x: 29, y: 1, value: 20 },
  { x: 30, y: 1, value: 10 },

  { x: 0, y: 2, value: 39 },
  { x: 1, y: 2, value: 879 },
  { x: 2, y: 2, value: 19 },
  { x: 3, y: 2, value: 29 },
  { x: 4, y: 2, value: 39 },
  { x: 5, y: 2, value: 99 },
  { x: 6, y: 2, value: 30 },
  { x: 7, y: 2, value: 20 },
  { x: 8, y: 2, value: 90 },
  { x: 9, y: 2, value: 740 },
  { x: 10, y: 2, value: 74 },
  { x: 11, y: 2, value: 89 },
  { x: 12, y: 2, value: 819 },
  { x: 13, y: 2, value: 284 },
  { x: 14, y: 2, value: 49 },
  { x: 15, y: 2, value: 784 },
  { x: 16, y: 2, value: 799 },
  { x: 17, y: 2, value: 50 },
  { x: 18, y: 2, value: 25 },
  { x: 19, y: 2, value: 20 },
  { x: 20, y: 2, value: 10 },
  { x: 21, y: 2, value: 0 },
  { x: 22, y: 2, value: 189 },
  { x: 23, y: 2, value: 4 },
  { x: 24, y: 2, value: 9 },
  { x: 25, y: 2, value: 874 },
  { x: 26, y: 2, value: 99 },
  { x: 27, y: 2, value: 750 },
  { x: 28, y: 2, value: 5 },
  { x: 29, y: 2, value: 20 },
  { x: 30, y: 2, value: 10 },

  { x: 0, y: 3, value: 49 },
  { x: 1, y: 3, value: 99 },
  { x: 2, y: 3, value: 129 },
  { x: 3, y: 3, value: 239 },
  { x: 4, y: 3, value: 79 },
  { x: 5, y: 3, value: 799 },
  { x: 6, y: 3, value: 70 },
  { x: 7, y: 3, value: 135 },
  { x: 8, y: 3, value: 120 },
  { x: 9, y: 3, value: 760 },
  { x: 10, y: 3, value: 76 },
  { x: 11, y: 3, value: 79 },
  { x: 12, y: 3, value: 619 },
  { x: 13, y: 3, value: 24 },
  { x: 14, y: 3, value: 49 },
  { x: 15, y: 3, value: 74 },
  { x: 16, y: 3, value: 799 },
  { x: 17, y: 3, value: 50 },
  { x: 18, y: 3, value: 25 },
  { x: 19, y: 3, value: 20 },
  { x: 20, y: 3, value: 10 },
  { x: 21, y: 3, value: 0 },
  { x: 22, y: 3, value: 19 },
  { x: 23, y: 3, value: 24 },
  { x: 24, y: 3, value: 49 },
  { x: 25, y: 3, value: 74 },
  { x: 26, y: 3, value: 799 },
  { x: 27, y: 3, value: 50 },
  { x: 28, y: 3, value: 25 },
  { x: 29, y: 3, value: 20 },
  { x: 30, y: 3, value: 10 },

  { x: 0, y: 4, value: 50 },
  { x: 1, y: 4, value: 150 },
  { x: 2, y: 4, value: 220 },
  { x: 3, y: 4, value: 380 },
  { x: 4, y: 4, value: 600 },
  { x: 5, y: 4, value: 800 },
  { x: 6, y: 4, value: 700 },
  { x: 7, y: 4, value: 400 },
  { x: 8, y: 4, value: 280 },
  { x: 9, y: 4, value: 130 },
  { x: 10, y: 4, value: 10 },
  { x: 11, y: 4, value: 9 },
  { x: 12, y: 4, value: 19 },
  { x: 13, y: 4, value: 24 },
  { x: 14, y: 4, value: 49 },
  { x: 15, y: 4, value: 74 },
  { x: 16, y: 4, value: 799 },
  { x: 17, y: 4, value: 50 },
  { x: 18, y: 4, value: 25 },
  { x: 19, y: 4, value: 20 },
  { x: 20, y: 4, value: 10 },
  { x: 21, y: 4, value: 0 },
  { x: 22, y: 4, value: 19 },
  { x: 23, y: 4, value: 24 },
  { x: 24, y: 4, value: 49 },
  { x: 25, y: 4, value: 74 },
  { x: 26, y: 4, value: 799 },
  { x: 27, y: 4, value: 50 },
  { x: 28, y: 4, value: 25 },
  { x: 29, y: 4, value: 20 },
  { x: 30, y: 4, value: 10 }
];

@Component({
  selector: "app-grafico02",
  templateUrl: "./grafico02.component.html",
  styleUrls: ["./grafico02.component.css"]
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },

    title: {
      text: ""
    },

    xAxis: {
      categories: [
        "Día 1",
        "Día 2",
        "Día 3",
        "Día 4",
        "Día 5",
        "Día 6",
        "Día 7",
        "Día 8",
        "Día 9",
        "Día 10",
        "Día 11",
        "Día 12",
        "Día 13",
        "Día 14",
        "Día 15",
        "Día 16",
        "Día 17",
        "Día 18",
        "Día 19",
        "Día 20",
        "Día 21",
        "Día 22",
        "Día 23",
        "Día 24",
        "Día 25",
        "Día 26",
        "Día 27",
        "Día 28",
        "Día 29",
        "Día 30",
        "Día 31"
      ]
    },

    yAxis: {
      categories: ["PM2.5", "PM10", "NO2", "O3", "SO2"],
      title: null,
      reversed: true
    },

    accessibility: {
      point: {
        descriptionFormatter: function(point) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, "x"),
            yName = getPointCategoryName(point, "y"),
            val = point.value;
          return ix + ". " + xName + " sales " + yName + ", " + val + ".";
        }
      }
    },

    colorAxis: {
      min: 0,
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
      enabled: false,
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280
    },

    tooltip: {
      formatter: function() {
        return (
          "<b>" +
          getPointCategoryName(this.point, "x") +
          "</b>: " +
          this.point.value +
          "µg/m3 " +
          getPointCategoryName(this.point, "y")
        );
      }
    },

    series: [
      {
        /*
      IMPORTANTE PONER EL TYPE
      */
        type: "heatmap",
        name: "Sales per employee",
        borderWidth: 1,
        data: [],
        dataLabels: {
          enabled: true,
          color: "#000000"
        }
      }
    ]
  };

  constructor() {}

  ngOnInit() {
    this.cargar()
  }

  months = ["Enero", "Febrero", "Marzo", "Abril"];
  countries = ["Bulgaria", "Grecia", "España"];
  years = [2017, 2018, 2019, 2020, 2021, 2022];

  select = new Select("Bulgaria", "2020", this.months[0]);

  submitted = false;

  onSubmit() {
    this.cargar()
  }


  cargar(){
    this.chartOptions.title.text = `País: ${this.select.country} - Año: ${
      this.select.year
    } - Mes: ${this.select.month}`;
    if (this.select.country == "España") {
      dataSeriesFinal = dataSeriesOrig.map((i: any) => {
        let miColor: string;

        miColor = colorEU(i.y, i.value);

        return {
          x: i.x,
          y: i.y,
          value: i.value,
          color: miColor
        };
      });
    } else {
      dataSeriesFinal = dataSeriesOrig2.map((i: any) => {
        let miColor: string;

        miColor = colorEU(i.y, i.value);

        return {
          x: i.x,
          y: i.y,
          value: i.value,
          color: miColor
        };
      });
    }
    this.chartOptions.series[0]["data"] = dataSeriesFinal;
    // el i.y es en este caso el contaminante
    // y lo asocio con el limite para ese contaminante
    Highcharts.chart("miGrafico", this.chartOptions);
    //this.getMisDatos();
  }


}

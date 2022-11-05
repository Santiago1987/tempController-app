import { useEffect, useState } from "react";
import { moduleData, sensorMappingResult } from "../../../types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_brokenAxis from "highcharts/modules/broken-axis";
import TempTable from "../../components/Table/TempTable";
HC_brokenAxis(Highcharts);

type props = {
  dataComplete: sensorMappingResult | [];
  selectedModule:
    | { chipID: string; sensors: (boolean | undefined)[] }
    | undefined;
};

type singleModule = {
  dateformat: Date;
  temperature: number[];
}[];

type tableData = {
  titles: string[];
  moduleData: singleModule;
};

//datacomplete ===> [chipID:[{dia, temperatura: [array de sensores]]}]

const Graphic = ({ dataComplete, selectedModule }: props) => {
  const [tableData, setTableData] = useState<tableData>({
    titles: [],
    moduleData: [],
  });
  const timezone = new Date().getTimezoneOffset();
  const [options, setOptions] = useState<any>({
    chart: {
      type: "line",
    },
    title: {
      text: "Temperaturas registradas",
      style: {},
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function () {
            alert("You just clicked the graph");
          },
        },
      },
    },
    setOptions: {
      global: {
        timezoneOffset: timezone,
      },
    },
  });

  // DATA FORMATING
  useEffect(() => {
    if (!(selectedModule && dataComplete)) return;

    let { chipID } = selectedModule;

    //data ===> [date, temperatura[sensores]]
    let data = dataComplete[chipID] as singleModule;
    let mappedData = formatData(data);

    let xAxis: any = {
      type: "datetime",
      //tickInterval: 3600 * 1000,
      dateTimeLabelFormats: {
        hour: "%I %p",
        minute: "%I:%M %p",
        second: "%I:%M:%S %p",
      },
    };

    let [ydata, breaks] = getAxis(mappedData);
    console.log(ydata);
    setTableData({ titles: Object.keys(ydata), moduleData: data });

    xAxis = { ...xAxis, breaks };
    let series: any[] = [];

    for (let sen in ydata) {
      if (!ydata[sen]) return;
      series.push({
        type: "line",
        name: `Sensor ${+sen + 1}`,
        pointPadding: 0,
        groupPadding: 0,
        data: ydata[sen],
      });
    }

    setOptions({ ...options, series, xAxis });
  }, [dataComplete, selectedModule]);

  //recibe todas las temps de un modulo y devuelve por sensor
  const formatData = (data: singleModule): any => {
    if (!data) return [];
    if (!selectedModule) return [];
    let { sensors } = selectedModule;

    let dataFormated: moduleData = new Map();

    for (let temp of data) {
      let { dateformat, temperature } = temp;

      for (let i = 0; i < temperature.length; i++) {
        if (sensors[i]) {
          let array = dataFormated.get(dateformat);

          if (!array) array = [];
          array.push({ sensor: i, temperature: temperature[i] });
          dataFormated.set(dateformat, array);
        }
      }
    }
    return dataFormated;
  };

  //armado de los datos para el grafico
  // devuelve un array de dos elementos 0: eje x , 1: array de eje y
  const getAxis = (data: moduleData): any => {
    //let Xcategori: Date[] = [];
    //let Xcategori: String[] = [];
    let Ydata: (number | String)[][][] = [];
    let bfdate: number | undefined = undefined;
    let breaks: { from: number; to: number; breakSize: number }[] = [];

    if (!data.size) return [[], []];
    for (const [key, value] of data) {
      let date: Date | number = new Date(key);

      date = date.getTime();
      //seteos de los intervalos de breaks para que la linea no sea continua
      if (bfdate && date - bfdate > 3600 * 1000) {
        breaks.push({ from: bfdate, to: date, breakSize: 3600 * 1000 });
      }
      bfdate = date;
      for (let index in value) {
        let { sensor, temperature } = value[index];
        if (!Ydata[sensor]) Ydata[sensor] = [];
        Ydata[sensor].push([date, temperature]);
      }
    }

    return [Ydata, breaks];
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <TempTable tableData={tableData} />
    </>
  );
};

export default Graphic;

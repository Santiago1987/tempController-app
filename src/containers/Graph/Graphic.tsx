import { useEffect, useState } from "react";
import { moduleData, sensorMappingResult } from "../../../types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
//import moment from "moment";

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

//datacomplete ===> [chipID:[{dia, temperatura: [array de sensores]]}]

const Graphic = ({ dataComplete, selectedModule }: props) => {
  const [options, setOptions] = useState<any>({
    chart: {
      type: "line",
    },
    title: {
      text: "Temperaturas registradas",
      style: {},
    },
    xAxis: {
      categories: [],
    },
  });

  // DATA FORMATING
  useEffect(() => {
    if (!(selectedModule && dataComplete)) return;

    let { chipID } = selectedModule;

    //data ===> [date, temperatura[sensores]]
    let data = dataComplete[chipID] as singleModule;
    let mappedData = formatData(data);

    let ydata = getAxis(mappedData);

    let xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        hour: "%I %p",
        minute: "%I:%M %p",
      },
    };
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
    let Ydata: (number | Date)[][][] = [];

    if (!data.size) return [];

    for (const [key, value] of data) {
      //Xcategori.push(key);

      for (let index in value) {
        let { sensor, temperature } = value[index];
        if (!Ydata[sensor]) Ydata[sensor] = [];
        Ydata[sensor].push([key, temperature]);
      }
    }

    return Ydata;
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Graphic;

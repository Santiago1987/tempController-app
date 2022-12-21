import { useEffect, useState } from "react";
import { moduleData, MapSensorList, sentorTitles } from "../../../types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_brokenAxis from "highcharts/modules/broken-axis";
import HC_exporting from "highcharts/modules/exporting";
import TempTable from "../../components/Table/TempTable";
import moment from "moment";

//HIGHCHARTS MODULES
HC_brokenAxis(Highcharts);
HC_exporting(Highcharts);
type tempLimits = {
  tempLimitInf: number | "";
  tempLimitSup: number | "";
};

type tempRange = {
  minTemp: number | "";
  maxTemp: number | "";
};

type props = {
  moduleData: MapSensorList[];
  selectedModule:
    | { chipID: string; modName: string; sensors: (boolean | undefined)[] }
    | undefined;
  dates: { frDate: Date | undefined; toDate: Date | undefined };
  tempLimits: tempLimits;
  sensorTitles: sentorTitles;
  yRange: tempRange;
};

type tableData = {
  titles: string[];
  moduleData: MapSensorList[];
  sensorTitles: string[];
  modName: string;
};

//datacomplete ===> [chipID:[{dia, temperatura: [array de sensores]]}]

const Graphic = ({
  moduleData,
  selectedModule,
  dates,
  tempLimits,
  sensorTitles,
  yRange,
}: props) => {
  const [tableData, setTableData] = useState<tableData>({
    titles: [],
    moduleData: [],
    sensorTitles: [],
    modName: "",
  });

  //const timezone = new Date().getTimezoneOffset();
  const [options, setOptions] = useState<any>({
    chart: {
      type: "line",
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      zooming: { type: "xy" },
    },
    plotOptions: {
      series: {
        cursor: "pointer",
      },
    },
    setOptions: {
      global: {
        //timezoneOffset: timezone,
      },
      chart: {
        style: {
          fontFamily: "serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Temperaturas °C",
      },
    },
    exporting: {
      filename: `Temps ${moment(dates.frDate).format("DD/MM HH:MM")}-${moment(
        dates.toDate
      ).format("DD/MM HH:MM")}`,
    },
  });

  // DATA FORMATING
  useEffect(() => {
    if (!selectedModule) return;

    let title = {
      text: `Modulo: ${selectedModule.modName}`,
    };

    if (!moduleData) {
      setOptions({ ...options, series: [], xAxis: {} });
      setTableData({
        titles: [],
        moduleData: [],
        sensorTitles: [],
        modName: "NO DATA",
      });
      return;
    }
    let { chipID, modName } = selectedModule;

    let [mappedData, tableData] = formatData(moduleData);

    let xAxis: any = {
      type: "datetime",
      //tickInterval: 3600 * 1000,
      dateTimeLabelFormats: {
        day: "%e. %b",
        hour: "%H:%M",
        minute: "%H:%M",
      },
    };

    let [ydata, breaks] = getAxis(mappedData);
    setTableData({
      titles: Object.keys(ydata),
      moduleData: tableData,
      sensorTitles: sensorTitles[chipID],
      modName,
    });

    xAxis = { ...xAxis, breaks };

    let series: any[] = [];

    for (let sen in ydata) {
      if (!ydata[sen]) return;

      series.push({
        type: "line",
        name: `${
          sensorTitles[chipID]
            ? sensorTitles[chipID][sen]
            : "Sensor: " + sen + 1
        }`,
        pointPadding: 0,
        groupPadding: 0,
        data: ydata[sen],
      });
    }

    //TEMPS LIMITES
    let { tempLimitInf, tempLimitSup } = tempLimits;

    let { yAxis } = options;
    if (tempLimitInf && tempLimitSup) {
      let plotBands = [
        {
          color: "#c6e7f6",
          from: tempLimitInf,
          to: tempLimitSup,
        },
      ];

      yAxis = { ...yAxis, plotBands };
    } else if (tempLimitInf !== "" || tempLimitSup !== "") {
      let plotLines = [
        {
          color: "#FF0000",
          width: 2,
          value: tempLimitInf !== "" ? tempLimitInf : tempLimitSup,
        },
      ];

      yAxis = { ...yAxis, plotLines };
    }

    setOptions({ ...options, series, xAxis, title, yAxis });
  }, [moduleData, selectedModule]);

  //TEMP RANGE
  useEffect(() => {
    let { minTemp, maxTemp } = yRange;
    let min = minTemp === "" ? null : minTemp;
    let max = maxTemp === "" ? null : maxTemp;
    setOptions({
      ...options,
      yAxis: { min, max },
    });
  }, [yRange]);

  //recibe todas las temps de un modulo y devuelve por sensor
  const formatData = (data: MapSensorList[]): any => {
    if (!data) return [];
    if (!selectedModule) return [];
    let { sensors } = selectedModule;

    //table
    let tableDta: MapSensorList[] = [];

    let dataFormated: moduleData = new Map();

    for (let temp of data) {
      let { date, temperature } = temp;
      let tmpSingleSensor: number[] = [];

      for (let i = 0; i < temperature.length; i++) {
        if (sensors[i]) {
          let array = dataFormated.get(date);

          tmpSingleSensor.push(temperature[i]);

          if (!array) array = [];
          array.push({ sensor: i, temperature: temperature[i] });
          dataFormated.set(date, array);
        }
      }
      tableDta.push({ date, temperature: tmpSingleSensor });
    }
    return [dataFormated, tableDta];
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
      <div className="mt-1">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <TempTable tableData={tableData} />
    </>
  );
};

export default Graphic;

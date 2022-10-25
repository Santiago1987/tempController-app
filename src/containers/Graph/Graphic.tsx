import { useEffect, useState } from "react";
import { moduleData, sensorMappingResult } from "../../../types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

type props = {
  dataComplete: sensorMappingResult | [];
  selectedModule: { chipID: string; sensors: boolean[] };
};

const Graphic = ({ dataComplete, selectedModule }: props) => {
  const [moduleData, setModuleData] = useState<moduleData>({});
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>({
    chart: {
      type: "spiline",
    },
    title: {
      text: "Temperaturas registradas",
      style: {},
    },
    xAxis: {
      categories: [],
    },
    series: [
      {
        type: "line",
        name: "",
        pointPadding: 0,
        groupPadding: 0,
        data: [],
      },
    ],
  });

  // DATA FORMATING
  useEffect(() => {
    if (!(selectedModule || dataComplete)) return;
    setLoading(true);
    let { chipID } = selectedModule;
    let data = dataComplete[chipID];

    if (!data) return;
    let dataFormated = {};

    for (let temp of data) {
      let { dateformat, temperature } = temp;

      for (let i = 0; i < temperature.length; i++) {
        if (!dataFormated[i + 1]) dataFormated[i + 1] = [];

        dataFormated[i + 1].push({
          date: dateformat,
          temperature: temperature[i],
        });
      }
    }

    setModuleData(dataFormated);
    setLoading(false);
  }, [dataComplete, selectedModule]);

  useEffect(() => {
    if (loading) return;
    let Xcategori: string[] = [];
    let Ydata: number[] = [];
    let selectedSensor;

    let { sensors } = selectedModule;
    if (sensors[0]) selectedSensor = 1;
    if (selectedSensor === undefined) return;

    let data = moduleData[selectedSensor];

    if (!data) return;

    for (let temp of data) {
      //console.log(moment(temp.date).format("h:mm:ss"));

      Xcategori.push(moment(temp.date).format("h:mm:ss"));
      Ydata.push(temp.temperature);
    }

    let series = [
      {
        type: "line",
        name: `Sensor ${selectedSensor}`,
        pointPadding: 0,
        groupPadding: 0,
        data: Ydata,
      },
    ];

    let xAxis = {
      categories: Xcategori,
      type: "datetime",
      dateTimeLabelFormats: {
        hour: "%I %p",
        minute: "%I:%M %p",
      },
    };

    setOptions({ ...options, series, xAxis });
  }, [selectedModule, loading]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Graphic;

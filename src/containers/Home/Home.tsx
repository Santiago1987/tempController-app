import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import useUser from "../../containers/hooks/User/useUser";
import useModuleActions from "../hooks/Module/useModuleActions";
import useSensorActions from "../hooks/Sensor/useSensorActions";
import mapTempListFromBd from "../../utils/mapTempListFromBD";
import { sensorMappingResult, ModuleFromBD } from "../../../types";
import DateSelection from "../../components/DateSelection/DateSelection";
import Graphic from "../Graph/Graphic";
import ModuleSelection from "../../components/ModuleSelection/ModuleSelection";

type selecModule = { chipID: string; sensors: boolean[] };

const Home: React.FC = () => {
  const { isLogged, logout } = useUser();
  const navigate = useNavigate();
  const { getModuleList } = useModuleActions();
  const { getTempList } = useSensorActions();

  const [dates, setDates] = useState({
    frDate: moment().format(),
    toDate: moment().format(),
  });

  const [modules, setModules] = useState<ModuleFromBD[]>([]);
  const [temps, setTemps] = useState<sensorMappingResult | []>([]);
  const [selectedModule, setSelectedModule] = useState<selecModule | undefined>(
    undefined
  );

  const [defaultModule, setDefaultModule] = useState<ModuleFromBD | undefined>(
    undefined
  );
  // CHECK IF USER IS LOGGED
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    //GET LIST OF MODULES
    getModuleList()
      .then((res) => {
        let result: ModuleFromBD[] = [];
        for (let m of res) {
          let { active } = m;
          if (active) result.push({ ...m });
        }

        setModules(result);

        setDates({
          frDate: moment().subtract(1, "day").format(),
          toDate: moment().format(),
        });
        //DEFAULT MODULE
        setDefaultModule(result[0]);

        //SELECTED MODULE INIT
        setSelectedModule({
          chipID: result[0].chipID,
          sensors: [true, false, false, false, false, false],
        });
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
      });
  }, [isLogged]);

  // GETTING DATA SENSORS FROM BD
  useEffect(() => {
    if (modules.length < 1) return;
    let { frDate, toDate } = dates;

    getTempList(frDate, toDate)
      .then(mapTempListFromBd)
      .then(setTemps)
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
      });
  }, [dates]);

  // DATE FUNCTIONS
  const handleOnChangeFrDate = (date) => {
    setDates({ ...dates, frDate: moment(date).format() });
  };

  const handleOnChangeToDate = (date) => {
    setDates({ ...dates, toDate: moment(date).format() });
  };

  //MODULES FUNCTIONS
  const handleOnChangeModule = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let { value } = ev.target;

    let mod = modules.find((m) => m.chipID === value);
    if (!mod) return;

    let { sensors } = mod;

    let actives = sensors.map((s) => {
      if (s.active) return true;
      return false;
    });

    setSelectedModule({ chipID: value, sensors: actives });
  };

  const handleOnChangeSensor = (index: number) => {
    if (!selectedModule) return;

    let { sensors } = selectedModule;
    sensors[index] = !sensors[index];

    setSelectedModule({ ...selectedModule, sensors });
  };

  return (
    <>
      <h1>HOME</h1>
      <DateSelection
        frDate={dates.frDate}
        toDate={dates.toDate}
        handleOnChangeFrDate={handleOnChangeFrDate}
        handleOnChangeToDate={handleOnChangeToDate}
      />
      <ModuleSelection
        moduleList={modules}
        handleOnChangeModule={handleOnChangeModule}
        defaultModule={defaultModule}
        handleOnChangeSensor={handleOnChangeSensor}
      />
      <Graphic dataComplete={temps} selectedModule={selectedModule} />
    </>
  );
};

export default Home;

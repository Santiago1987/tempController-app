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

type selecModule = { chipID: string; sensors: (boolean | undefined)[] };

const Home: React.FC = () => {
  //USUARIO
  const { isLogged, logout } = useUser();
  const navigate = useNavigate();

  //FUNCIONES DE MODULOS
  const { getModuleList } = useModuleActions();

  //FUNCIONES DE SENSORES
  const { getTempList } = useSensorActions();

  //FECHAS
  const [dates, setDates] = useState({
    frDate: moment().format(),
    toDate: moment().format(),
  });

  //LISTA DE MODULOS
  const [modules, setModules] = useState<ModuleFromBD[]>([]);

  //LISTA DE TEMPERATURAS POR MODULO COMO KEY DEL JSON
  const [temps, setTemps] = useState<sensorMappingResult | []>([]);

  //MODULO SELECCIONADO EN EL COMBOBOX
  const [selectedModule, setSelectedModule] = useState<selecModule | undefined>(
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

        //SOLO MODULOS ACTIVOS
        for (let m of res) {
          let { active } = m;
          if (active) result.push({ ...m });
        }
        setModules(result);

        //FECHAS DEFAULT
        setDates({
          frDate: moment().subtract(1, "day").format(),
          toDate: moment().format(),
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
      .then((res) => {
        setTemps(res);

        if (!selectedModule) {
          let { chipID, sensors } = modules[0];
          let sen: (boolean | undefined)[] = [];

          for (let s of sensors) {
            sen.push(s.active ? true : undefined);
          }
          setSelectedModule({
            chipID,
            sensors: sen,
          });
        }
      })
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
      return undefined;
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
      <div className="container">
        <div className="row">
          <DateSelection
            frDate={dates.frDate}
            toDate={dates.toDate}
            handleOnChangeFrDate={handleOnChangeFrDate}
            handleOnChangeToDate={handleOnChangeToDate}
          />
          <ModuleSelection
            moduleList={modules}
            handleOnChangeModule={handleOnChangeModule}
            moduleID={selectedModule?.chipID}
            sensors={selectedModule?.sensors}
            handleOnChangeSensor={handleOnChangeSensor}
          />
        </div>
        <div className="row">
          <Graphic
            dataComplete={temps}
            selectedModule={selectedModule}
            dates={dates}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

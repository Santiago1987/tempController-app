import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import useUser from "../../containers/hooks/User/useUser";
import useModuleActions from "../hooks/Module/useModuleActions";
import useSensorActions from "../hooks/Sensor/useSensorActions";
import mapTempListFromBd from "../../utils/mapTempListFromBD";
import {
  MapSensorList,
  ModuleFromBD,
  sensorMappingResult,
} from "../../../types";
import DateSelection from "../../components/DateSelection/DateSelection";
import Graphic from "../Graph/Graphic";
import ModuleSelection from "../../components/ModuleSelection/ModuleSelection";

type selecModule = { chipID: string; sensors: (boolean | undefined)[] };
type dates = { frDate: Date | undefined; toDate: Date | undefined };

const Home: React.FC = () => {
  //USUARIO
  const { isLogged, logout } = useUser();
  const navigate = useNavigate();

  //FUNCIONES DE MODULOS
  const { getModuleList } = useModuleActions();

  //FUNCIONES DE SENSORES
  const { getTempList } = useSensorActions();

  //FECHAS
  const [dates, setDates] = useState<dates>({
    frDate: undefined,
    toDate: undefined,
  });

  //LISTA DE MODULOS
  const [modules, setModules] = useState<ModuleFromBD[]>([]);

  //LISTA DE TEMPERATURAS POR MODULO COMO KEY DEL JSON
  const [temps, setTemps] = useState<sensorMappingResult | []>([]);

  //LISTA DE TEMPS DE UN SOLO MODULO
  const [modTemps, setModTemps] = useState<MapSensorList[]>([]);

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
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
      });

    //FECHAS DEFAULT
    if (!(dates.frDate && dates.toDate)) {
      setDates({
        frDate: moment().subtract(1, "days").toDate(),
        toDate: moment().toDate(),
      });
    }
  }, []);

  // GETTING DATA SENSORS FROM BD
  useEffect(() => {
    if (modules.length < 1) return;
    if (!(dates.frDate && dates.toDate)) return;
    let { frDate, toDate } = dates;

    getTempList(frDate, toDate)
      .then(mapTempListFromBd)
      .then((res) => {
        //GUARDADO DE TODA LA DATA => chipID key{ fecha, temps[]}
        setTemps(res);

        if (!selectedModule) {
          //se selecciona por defecto el primer modulo
          let { chipID, sensors } = modules[0];
          setModTemps(res[chipID]);
          let sen: (boolean | undefined)[] = [];

          for (let s of sensors) {
            sen.push(s.active ? true : undefined);
          }
          setSelectedModule({
            chipID,
            sensors: sen,
          });
          return;
        }
        setModTemps(res[selectedModule.chipID]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
      });
  }, [dates, modules]);

  // DATE FUNCTIONS
  const handleOnChangeFrDate = (date) => {
    if (!date) return;
    setDates({ ...dates, frDate: moment(date).toDate() });
  };

  const handleOnChangeToDate = (date) => {
    if (!date) return;
    setDates({ ...dates, toDate: moment(date).toDate() });
  };

  //MODULES FUNCTIONS
  const handleOnChangeModule = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let { value } = ev.target;

    let mod = modules.find((m) => m.chipID === value);
    if (!mod) return;

    let { sensors, chipID } = mod;

    setModTemps(temps[chipID]);

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
            moduleData={modTemps}
            selectedModule={selectedModule}
            dates={dates}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

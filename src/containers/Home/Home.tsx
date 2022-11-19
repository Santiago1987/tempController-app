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
  alert,
  sentorTitles,
} from "../../../types";
import DateSelection from "../../components/DateSelection/DateSelection";
import Graphic from "../Graph/Graphic";
import ModuleSelection from "../../components/ModuleSelection/ModuleSelection";
import { FaTimes, FaFilter } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import { messageType } from "../../typeEnum";
import Mensaje from "../../components/Mensajes/Mensaje";
import useSettingsActions from "../hooks/Settings/useSettingsActions";

type selecModule = {
  chipID: string;
  modName: string;
  sensors: (boolean | undefined)[];
};
type dates = { frDate: Date | undefined; toDate: Date | undefined };
type tempLimits = {
  tempLimitInf: number | "";
  tempLimitSup: number | "";
};

type tempRange = {
  minTemp: number | "";
  maxTemp: number | "";
};

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

  const [isCollapseFr, setIsCollapseFr] = useState(true);
  const [isCollapseTo, setIsCollapseTo] = useState(true);

  const [isCollapsePanel, setIsCollapsePanel] = useState(true);
  //LISTA DE MODULOS
  const [modules, setModules] = useState<ModuleFromBD[]>([]);

  //TITLES
  const [titles, setTitles] = useState<sentorTitles>({});

  //LISTA DE TEMPERATURAS POR MODULO COMO KEY DEL JSON
  const [temps, setTemps] = useState<sensorMappingResult | []>([]);

  //LISTA DE TEMPS DE UN SOLO MODULO
  const [modTemps, setModTemps] = useState<MapSensorList[]>([]);

  //MODULO SELECCIONADO EN EL COMBOBOX
  const [selectedModule, setSelectedModule] = useState<selecModule | undefined>(
    undefined
  );

  //TEMP RANGE
  const [yRange, setYRange] = useState<tempRange>({ minTemp: "", maxTemp: "" });

  //SETTINGS
  const { getSettingsBD } = useSettingsActions();
  const [tempLimits, setTempLimits] = useState<tempLimits>({
    tempLimitInf: "",
    tempLimitSup: "",
  });

  //USADO PARA LOS MENSAJES
  const [alert, setAlert] = useState<alert>({ type: undefined, message: "" });

  //LOADING DATA ?
  const [isLoading, setIsLoading] = useState(false);

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

        setTitles(mappingTitles(result));
      })
      .catch((err) => {
        if (err.response && err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        console.log("err", err);
        //Mensaje de error
        setAlert({
          type: messageType.error,
          message: "Error al cargar los modulos",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      });

    //GET SETTINGS FOR THE USER
    let lesshour = 24;
    getSettingsBD()
      .then((res) => {
        let { tempLimitInf, tempLimitSup, hoursLess, minTemp, maxTemp } = res;

        //LIMITE DE TEMPS
        setTempLimits({ tempLimitInf, tempLimitSup });

        //HORAS
        lesshour = hoursLess ? hoursLess : lesshour;

        //TEMP RANGE
        setYRange({ minTemp, maxTemp });
      })
      .catch((err) => {
        setAlert({
          type: messageType.error,
          message: "Error al cargar la configuracion",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .finally(() => {
        //SETEOS DE FECHAS
        if (!(dates.frDate && dates.toDate)) {
          setDates({
            frDate: moment().subtract(lesshour, "hours").toDate(),
            toDate: moment().toDate(),
          });
        }
      });
  }, []);

  // GETTING DATA SENSORS FROM BD
  useEffect(() => {
    if (modules.length < 1) return;
    if (!(dates.frDate && dates.toDate)) return;
    let { frDate, toDate } = dates;
    setIsLoading(true);

    //LLAMADO A LA BD PARA OBETENER LA DATA
    getTempList(frDate, toDate)
      .then(mapTempListFromBd)
      .then((res) => {
        //GUARDADO DE TODA LA DATA => chipID key{ fecha, temps[]}
        setTemps(res);

        if (!selectedModule) {
          //se selecciona por defecto el primer modulo
          let { chipID, sensors, name } = modules[0];

          setModTemps(res[chipID]);
          let sen: (boolean | undefined)[] = [];

          for (let s of sensors) {
            sen.push(s.active ? true : undefined);
          }
          setSelectedModule({
            chipID,
            modName: name,
            sensors: sen,
          });
          return;
        }
        setModTemps(res[selectedModule.chipID]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        //Mensaje de error
        setAlert({
          type: messageType.error,
          message: "Error al cargar los datos",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dates, modules]);

  //MAPPING TITLE
  const mappingTitles = (moddata: ModuleFromBD[]): sentorTitles => {
    let result: sentorTitles = {};

    for (let mod of moddata) {
      let { sensors } = mod;
      for (let index in sensors) {
        let { name } = sensors[index];
        if (!result[mod.chipID]) result[mod.chipID] = [];
        result[mod.chipID][index] = name;
      }
    }

    return result;
  };

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

    let { sensors, chipID, name } = mod;

    setModTemps(temps[chipID]);

    let actives = sensors.map((s) => {
      if (s.active) return true;
      return undefined;
    });

    setSelectedModule({ chipID: value, modName: name, sensors: actives });
  };

  const handleOnChangeSensor = (index: number) => {
    if (!selectedModule) return;

    let { sensors } = selectedModule;
    sensors[index] = !sensors[index];

    setSelectedModule({ ...selectedModule, sensors });
  };

  const handleOnClickCollapse = () => {
    setIsCollapseFr(!isCollapseFr);
  };

  const handleOnClickCollapseTo = () => {
    setIsCollapseTo(!isCollapseTo);
  };

  const handleOnClickCollapsePanel = () => {
    setIsCollapsePanel(!isCollapsePanel);
  };

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div className="container">
        {alert.type ? (
          <Mensaje tipo={alert.type} message={alert.message} />
        ) : (
          <></>
        )}
        <span
          className="action-btn filter-btn"
          onClick={handleOnClickCollapsePanel}
        >
          <FaFilter /> Filtros
        </span>
        <div
          className={`collapsable-panel shadow ${
            isCollapsePanel ? `is-collapsed` : ``
          }`}
        >
          <span
            className="close-panel"
            onClick={() => setIsCollapsePanel(true)}
          >
            <FaTimes />
          </span>
          <div className="row">
            <DateSelection
              frDate={dates.frDate}
              toDate={dates.toDate}
              isCollapseFr={isCollapseFr}
              isCollapseTo={isCollapseTo}
              handleOnClickCollapse={handleOnClickCollapse}
              handleOnChangeFrDate={handleOnChangeFrDate}
              handleOnChangeToDate={handleOnChangeToDate}
              handleOnClickCollapseTo={handleOnClickCollapseTo}
            />
            <ModuleSelection
              moduleList={modules}
              handleOnChangeModule={handleOnChangeModule}
              moduleID={selectedModule?.chipID}
              sensors={selectedModule?.sensors}
              handleOnChangeSensor={handleOnChangeSensor}
            />
          </div>
        </div>
        <div className="row">
          <Graphic
            moduleData={modTemps}
            selectedModule={selectedModule}
            dates={dates}
            tempLimits={tempLimits}
            sensorTitles={titles}
            yRange={yRange}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

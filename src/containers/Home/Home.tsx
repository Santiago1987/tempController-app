import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import useUser from "../../containers/hooks/User/useUser";
import useModuleActions from "../hooks/Module/useModuleActions";
import useSensorActions from "../hooks/Sensor/useSensorActions";
import mapTempListFromBd from "../../utils/mapTempListFromBD";
import { sensorMappingResult } from "../../../types";
import DateSelection from "../../components/DateSelection/DateSelection";
import Graphic from "../Graph/Graphic";

type modules = { chipID: string; name: string }[] | [];
type selecModule = { chipID: string; sensors: boolean[] };

const Home: React.FC = () => {
  const { isLogged } = useUser();
  const navigate = useNavigate();
  const { getModuleList } = useModuleActions();
  const { getTempList } = useSensorActions();

  const [dates, setDates] = useState({
    frDate: moment().subtract(1, "day").format(),
    toDate: moment().format(),
  });

  const [modules, setModules] = useState<modules>([]);
  const [temps, setTemps] = useState<sensorMappingResult | []>([]);
  const [_selectedModule, _setSelectedModule] = useState<
    selecModule | undefined
  >(undefined);

  // CHECK IF USER IS LOGGED
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    //GET LIST OF MODULES
    getModuleList()
      .then((res) => {
        let result = res.map((m) => {
          let { chipID, name } = m;
          return { chipID, name };
        });
        setModules(result);
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          navigate("/login");
          return;
        }
      });
  }, [isLogged]);

  // GETTING DATA SENSORS FROM BD
  useEffect(() => {
    if (modules.length < 1) return;
    let { frDate, toDate } = dates;
    getTempList(frDate, toDate).then(mapTempListFromBd).then(setTemps);
  }, [dates, modules]);

  // DATE FUNCTIONS
  const handleOnChangeFrDate = (date) => {
    setDates({ ...dates, frDate: date });
  };

  const handleOnChangeToDate = (date) => {
    setDates({ ...dates, toDate: date });
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
      <Graphic
        dataComplete={temps}
        selectedModule={{
          chipID: "94D620F7C630",
          sensors: [true, false, false, false, false, false],
        }}
      />
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";

import useUser from "../hooks/User/useUser";
import { useNavigate } from "react-router-dom";

import useSetttingsActions from "../hooks/Settings/useSettingsActions";
import useSettings from "../hooks/Settings/useSettings";
import SettingsComponents from "../../components/Settings/SettingsComponents";
import Loading from "../../components/Loading/Loading";
import { alert } from "../../../types";
import Mensaje from "../../components/Mensajes/Mensaje";
import { messageType } from "../../typeEnum";

type userList = {
  id: string;
  userName: string;
}[];

const Settings = () => {
  //CONTROL DE LOGEO
  const { isLogged, logout, isAdministrator, getUserList } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [userList, setUserList] = useState<userList>([]);
  const {
    settingRedu,
    setHoursLess,
    setTempLimitSup,
    setTempLimitInf,
    setUsers,
    setWasap,
    setEmail,
    setMinTemp,
    setMaxTemp,
  } = useSettings();

  const { getSettingsBD, saveSettingsBD } = useSetttingsActions();

  //USADO PARA LOS MENSAJES
  const [alert, setAlert] = useState<alert>({ type: undefined, message: "" });

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }
    setIsLoading(true);

    getSettingsBD()
      .then((res) => {
        let {
          tempLimitSup,
          tempLimitInf,
          alertUser,
          sendMail,
          sendWasap,
          hoursLess,
          minTemp,
          maxTemp,
        } = res;

        setTempLimitSup(tempLimitSup);
        setTempLimitInf(tempLimitInf);
        setUsers(alertUser);
        setWasap(sendWasap);
        setEmail(sendMail);
        setHoursLess(hoursLess);
        setMinTemp(minTemp);
        setMaxTemp(maxTemp);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        setAlert({
          type: messageType.error,
          message: "Error al cargar la configuracion",
        });

        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      });

    getUserList()
      .then((res) => {
        let list: userList = [];
        for (let us of res) {
          let { userName, id } = us;
          list.push({ userName, id });
        }
        setUserList(list);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        setAlert({
          type: messageType.error,
          message: "No se pudieron obetener los usuarios",
        });

        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value }: { name: string; value: any } = ev.target;

    let formMod = {
      tempSup: setTempLimitSup,
      tempInf: setTempLimitInf,
      hoursLess: setHoursLess,
      wasap: setWasap,
      email: setEmail,
      minTemp: setMinTemp,
      maxTemp: setMaxTemp,
    };
    value = name === "wasap" ? !settingRedu.sendWasap : value;
    value = name === "email" ? !settingRedu.sendMail : value;
    formMod[name](value);
  };

  const handleOnChangeUser = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let { value } = ev.target;
    let { alertUser } = settingRedu;

    if (alertUser.includes(value)) {
      alertUser = alertUser.filter((us) => us !== value);
      console.log("alertUser", alertUser);
      setUsers(alertUser);
      return;
    }

    alertUser.push(value);

    setUsers(alertUser);
  };

  const handleOnSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    saveSettingsBD(settingRedu)
      .then(() => {
        setAlert({
          type: messageType.success,
          message: "Los cambios fueron guardados",
        });

        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .catch((err) => {
        setAlert({
          type: messageType.error,
          message: "Error al guardar los cambios",
        });

        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      });
  };

  return (
    <>
      <div className="main-container container position-relative">
        {isLoading ? <Loading /> : <></>}
        {alert.type ? (
          <Mensaje tipo={alert.type} message={alert.message} />
        ) : (
          <></>
        )}
        <SettingsComponents
          settings={settingRedu}
          userList={userList}
          handleOnChange={handleOnChange}
          handleOnChangeUser={handleOnChangeUser}
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </>
  );
};

export default Settings;

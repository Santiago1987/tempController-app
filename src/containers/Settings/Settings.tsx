import { useEffect, useState } from "react";

import useUser from "../hooks/User/useUser";
import { useNavigate } from "react-router-dom";

import useSetttingsActions from "../hooks/Settings/useSettingsActions";
import useSettings from "../hooks/Settings/useSettings";
import SettingsComponents from "../../components/Settings/SettingsComponents";

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
    setID,
    setTempLimitSup,
    setTempLimitInf,
    setFrDate,
    setToDate,
    setUsers,
  } = useSettings();

  const { getSettingsBD } = useSetttingsActions();

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }
    setIsLoading(true);

    getSettingsBD()
      .then((res) => {
        let { id, tempLimitSup, tempLimitInf, frDate, toDate, alertUser } = res;
        setID(id);
        setTempLimitSup(tempLimitSup);
        setTempLimitInf(tempLimitInf);
        setFrDate(frDate);
        setToDate(toDate);
        setUsers(alertUser);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
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
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = ev.target;

    let formMod = {
      id: setID,
      frdate: setFrDate,
      toDate: setToDate,
      tempSup: setTempLimitSup,
      tempInf: setTempLimitInf,
    };
    formMod[name](value);
  };

  const handleOnChangeUser = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let { value } = ev.target;

    console.log(value);
  };

  const handleOnSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
  };

  return (
    <>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <SettingsComponents
          settings={settingRedu}
          userList={userList}
          handleOnChange={handleOnChange}
          handleOnChangeUser={handleOnChangeUser}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </>
  );
};

export default Settings;

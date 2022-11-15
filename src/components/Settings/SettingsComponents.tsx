import { SettingsInterf } from "../../../types";
import DatePicker from "react-datepicker";

type userList = {
  id: string;
  userName: string;
}[];

type props = {
  settings: SettingsInterf;
  userList: userList;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeUser: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOnSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
};

const SettingsComponents = ({
  settings,
  userList,
  handleOnChange,
  handleOnChangeUser,
  handleOnSubmit,
}: props) => {
  let { id, tempLimitSup, tempLimitInf, frDate, toDate } = settings;

  return (
    <>
      <div className="main-container container">
        <p className="main-title h2">Settings</p>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="id"
            value={id}
            hidden
            onChange={(ev) => {}}
          />
          <div>
            <fieldset>
              <p className="h3">Fechas por default</p>
              <div className="form-group p-3">
                <label htmlFor="frDate">Desde</label>
                <DatePicker
                  id="frDate"
                  name="frdate"
                  selected={frDate ? frDate : new Date()}
                  onChange={handleOnChange}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeIntervals={10}
                  maxDate={toDate ? toDate : new Date()}
                  startDate={frDate ? frDate : new Date()}
                  showTimeSelect
                />
              </div>
              <div className="form-group p-3">
                <label htmlFor="toDate">Hasta</label>
                <DatePicker
                  id="toDate"
                  name="toDate"
                  selected={toDate ? toDate : new Date()}
                  onChange={handleOnChange}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeIntervals={10}
                  maxDate={frDate ? frDate : new Date()}
                  startDate={toDate ? toDate : new Date()}
                  showTimeSelect
                />
              </div>
            </fieldset>
          </div>
          <div>
            <p className="h3">Temperaturas limites</p>
            <div className="form-group p-3">
              <label htmlFor="tempSup">Temperatura máxima</label>
              <input
                id="tempSup"
                className="form-control"
                type="number"
                name="tempSup"
                value={tempLimitSup}
                onChange={handleOnChange}
                placeholder="Limite maximo de temperatura"
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="tempInf">Temperatura minima</label>
              <input
                id="tempInf"
                className="form-control"
                type="number"
                name="tempInf"
                value={tempLimitInf}
                onChange={handleOnChange}
                placeholder="Limite minimo de temperatura"
              />
            </div>
          </div>
          <div>
            <p className="h3">Seleccion de usuarios para las alertas</p>
            <div className="form-group p-3">
              <label htmlFor="modCombo" className="p-2 fw-bold">
                Usuarios
              </label>
              <select
                id="modCombo"
                name="moduleComboBox"
                className="form-select w-50"
                onChange={handleOnChangeUser}
              >
                {userList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.userName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingsComponents;

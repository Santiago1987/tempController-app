import { SettingsInterf } from "../../../types";

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
  let {
    tempLimitSup,
    tempLimitInf,
    hoursLess,
    sendWasap,
    sendMail,
    minTemp,
    maxTemp,
  } = settings;

  return (
    <>
      <p className="main-title h2">Settings</p>
      <div className="mt-2 mx-auto">
        <div className="">
          <form onSubmit={handleOnSubmit}>
            <div>
              <fieldset>
                <p className="h3">Fecha</p>
                <div className="form-floating w-50">
                  <input
                    id="hoursLess"
                    className="form-control shadow-none"
                    type="text"
                    name="hoursLess"
                    value={hoursLess}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="hoursLess">
                    Hs menos con respecto al presente
                  </label>
                </div>
              </fieldset>
            </div>
            <div>
              <fieldset>
                <p className="h3">Temperaturas limites</p>
                <div className="d-flex justify-content-between">
                  <div className="form-floating w-50 me-1">
                    <input
                      id="tempInf"
                      className="form-control shadow-none"
                      type="text"
                      name="tempInf"
                      value={tempLimitInf}
                      onChange={handleOnChange}
                    />
                    <label htmlFor="tempInf">Minima</label>
                  </div>
                  <div className="form-floating w-50 ms-1">
                    <input
                      id="tempSup"
                      className="form-control shadow-none"
                      type="text"
                      name="tempSup"
                      value={tempLimitSup}
                      onChange={handleOnChange}
                    />
                    <label htmlFor="tempSup">Máxima</label>
                  </div>
                </div>
                <p className="h3">Rango de temperaturas</p>
                <div className="d-flex justify-content-between">
                  <div className="form-floating w-50 me-1">
                    <input
                      id="minTemp"
                      className="form-control shadow-none"
                      type="text"
                      name="minTemp"
                      value={minTemp}
                      onChange={handleOnChange}
                    />
                    <label htmlFor="tempSup">Mínima</label>
                  </div>
                  <div className="form-floating w-50 ms-1">
                    <input
                      id="maxTemp"
                      className="form-control shadow-none"
                      type="text"
                      name="maxTemp"
                      value={maxTemp}
                      onChange={handleOnChange}
                    />
                    <label htmlFor="tempInf">Máxima</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div>
              <fieldset>
                <p className="h3">Alertas</p>
                <div className="">
                  <div className="form-check active-check my-2">
                    <input
                      id="wasap"
                      name="wasap"
                      type="checkbox"
                      className="form-check-input"
                      checked={sendWasap}
                      onChange={handleOnChange}
                    />
                    <div className="fake-input"></div>
                    <label className="form-check-label" htmlFor="wasap">
                      WhatsApp
                    </label>
                  </div>
                  <div className="form-check active-check my-2">
                    <input
                      id="email"
                      name="email"
                      type="checkbox"
                      className="form-check-input"
                      checked={sendMail}
                      onChange={handleOnChange}
                    />
                    <div className="fake-input"></div>
                    <label className="form-check-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <div className="form-group w-100">
                    <label htmlFor="modCombo" className="fw-bold">
                      Usuarios
                    </label>
                    <select
                      id="modCombo"
                      name="moduleComboBox"
                      className="form-select shadow-none"
                      onChange={handleOnChangeUser}
                      multiple
                    >
                      {userList.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="btn-submit-container">
              <button type="submit" className="btn submit-btn">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsComponents;

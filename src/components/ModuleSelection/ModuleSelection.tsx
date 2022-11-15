import { ModuleFromBD } from "../../../types";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type props = {
  moduleList: ModuleFromBD[];
  handleOnChangeModule: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  moduleID: string | undefined;
  sensors: (boolean | undefined)[] | undefined;
  handleOnChangeSensor: (index: number) => void;
};

const ModuleSelection = ({
  moduleList,
  handleOnChangeModule,
  moduleID,
  sensors,
  handleOnChangeSensor,
}: props) => {
  const [sensorsNames, setSensorsNames] = useState<string[]>([]);

  useEffect(() => {
    let module = moduleList.find((m) => m.chipID === moduleID);
    if (!module) return;

    let { sensors } = module;

    let senact: string[] = [];
    for (let sen of sensors) {
      if (sen.active) senact.push(sen.name);
    }

    setSensorsNames(senact);
  }, [moduleID]);

  return (
    <>
      <div className="col-lg-12 mt-1">
        <p className="h5 mt-2 px-2">Selección de módulos y sensores</p>
        <div>
          <div className="d-flex flex-wrap align-items-center">
            <span className="select-icon">
              <FaChevronDown />
            </span>
            <select
              id="modCombo"
              name="moduleComboBox"
              className="form-select bg-transparent border-radius-0 border shadow-none"
              onChange={handleOnChangeModule}
            >
              <option disabled>Seleccionar opcion</option>
              {moduleList.map((m) => (
                <option key={m.chipID} value={m.chipID}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center">
            {sensors ? (
              <div>
                <ul className="list-inline row px-2">
                  {sensors.map((sen, index) => {
                    //SENSOR DESACTIVADO
                    if (sen === undefined) return <div key={index}></div>;
                    let name = sensorsNames[index];

                    return (
                      <li key={index} className="col-6 pe-1">
                        <div className="form-check">
                          <input
                            id={`${index}`}
                            type="checkbox"
                            name="moduleSelection"
                            onChange={() => handleOnChangeSensor(index)}
                            checked={sensors[index]}
                            className="form-check-input module-check"
                          />
                          <div className="fake-input"></div>
                          <label
                            className="form-check-label pe-1"
                            htmlFor={`${index}`}
                          >
                            {name !== "" ? name : `Sensor ${index + 1}`}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleSelection;

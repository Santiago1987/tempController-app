import { ModuleFromBD } from "../../../types";
import { useState, useEffect } from "react";

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
      <div className="col shadow bg-white rounded mt-1 ms-1">
        <p className="h4 fw-bold mt-2 px-2">Seleccion de modulos y sensores</p>
        <div>
          <div className="d-flex align-items-center">
            <label htmlFor="modCombo" className="p-2 fw-bold">
              Modulo Seleccionado:
            </label>
            <select
              id="modCombo"
              name="moduleComboBox"
              className="form-select w-50"
              onChange={handleOnChangeModule}
            >
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
                <label className="px-2 fw-bold fs-5">Sensores</label>
                <ul className="list-inline px-2">
                  {sensors.map((sen, index) => {
                    //SENSOR DESACTIVADO
                    if (sen === undefined) return <div key={index}></div>;
                    let name = sensorsNames[index];

                    return (
                      <li key={index} className="list-inline-item pe-1">
                        <div className="form-group">
                          <label
                            className="form-group pe-1"
                            htmlFor={`${index}`}
                          >
                            {name !== "" ? name : `Sensor ${index + 1}`}
                          </label>
                          <input
                            id={`${index}`}
                            type="checkbox"
                            name="moduleSelection"
                            onChange={() => handleOnChangeSensor(index)}
                            checked={sensors[index]}
                            className="form-check-input"
                          />
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

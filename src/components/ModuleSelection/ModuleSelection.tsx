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
      <label>Modulo Seleccionado</label>
      <select name="moduleComboBox" onChange={handleOnChangeModule}>
        {moduleList.map((m) => (
          <option key={m.chipID} value={m.chipID}>
            {m.name}
          </option>
        ))}
      </select>
      {sensors ? (
        <div>
          <label>Sensores</label>
          <ol>
            {sensors.map((sen, index) => {
              //SENSOR DESACTIVADO
              if (sen === undefined) return <div key={index}></div>;
              let name = sensorsNames[index];

              return (
                <li key={index}>
                  <label>{name !== "" ? name : `Sensor ${index + 1}`}</label>
                  <input
                    type="checkbox"
                    name="moduleSelection"
                    onChange={() => handleOnChangeSensor(index)}
                    checked={sensors[index]}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModuleSelection;

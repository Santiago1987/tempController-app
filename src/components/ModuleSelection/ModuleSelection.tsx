import { ModuleFromBD } from "../../../types";

type props = {
  moduleList: ModuleFromBD[];
  handleOnChangeModule: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultModule: ModuleFromBD | undefined;
  handleOnChangeSensor: (index: number) => void;
};

const ModuleSelection = ({
  moduleList,
  handleOnChangeModule,
  defaultModule,
  handleOnChangeSensor,
}: props) => {
  let sensorsList: { name: string; active: boolean }[] = [];

  if (defaultModule) sensorsList = defaultModule.sensors;
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
      <label>Sensores</label>
      <ol>
        {sensorsList.map((sen, index) => {
          let { name, active } = sen;
          if (!active) return <div key={index}></div>;

          return (
            <li key={index}>
              <label>{name !== "" ? name : `Sensor ${index + 1}`}</label>
              <input
                type="checkbox"
                name="moduleSelection"
                onChange={() => handleOnChangeSensor(index)}
              />
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default ModuleSelection;

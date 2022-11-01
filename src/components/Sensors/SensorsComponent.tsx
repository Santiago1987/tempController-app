import { useEffect, useState } from "react";
import { ModuleFromBD } from "../../../types";
import useModuleActions from "../../containers/hooks/Module/useModuleActions";

type props = {
  module: ModuleFromBD;
};

type sensor = {
  name: string;
  active: boolean;
};

const SensorsComponent = ({ module }: props) => {
  let [sensores, setSensores] = useState<sensor[]>([]);

  let [moduleInfo, setModuleInfo] = useState({ name: "", chipID: "" });

  const { updateModuleSensors } = useModuleActions();

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let { name, chipID, sensors } = module;
    setModuleInfo({ name, chipID });
    let sen: sensor[] = [];

    for (let i = 0; i < 6; i++) {
      sen[i] = sensors[i] ? sensors[i] : { name: "", active: false };
    }

    setSensores(sen);
  }, [module]);

  const handleOnChangeSensor = (
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    let auxsens = sensores;

    let { name, value, checked } = ev.target;

    auxsens[index][name] = name === "name" ? value : checked;
    setSensores(auxsens);
    setFlag(!flag);
  };

  const handleClikcOnSave = () => {
    let { chipID } = moduleInfo;
    updateModuleSensors({ chipID, sensors: sensores })
      .then((res) => {
        let { sensors } = res;
        setSensores(sensors);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };

  return (
    <>
      <h3>{`Modulo: ${moduleInfo.name}`}</h3>
      <label>Lista de Sensores</label>
      <ul>
        {sensores.map((s, index) => {
          return (
            <li key={index}>
              <label>{`Sensor ${index + 1}`}</label>
              <input
                type="text"
                value={s.name}
                name="name"
                onChange={(ev) => handleOnChangeSensor(ev, index)}
                placeholder="Nombre del sensor"
              />
              <input
                type="checkbox"
                checked={s.active}
                name="active"
                onChange={(ev) => handleOnChangeSensor(ev, index)}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={handleClikcOnSave}>Guardar los cambios</button>
    </>
  );
};

export default SensorsComponent;

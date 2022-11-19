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

    if (name === "name" && value.length > 20) return;

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
      <div className="shadow bg-white rounded m-2">
        <div className="position-relative p-3">
          <p className="module-title">{`Módulo: ${moduleInfo.name}`}</p>
          <div>
            {sensores.map((s, index) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <div className="form-floating w-75">
                    <input
                      className="form-control shadow-none"
                      type="text"
                      value={s.name}
                      name="name"
                      onChange={(ev) => handleOnChangeSensor(ev, index)}
                      placeholder={`Sensor ${index + 1}`}
                    />
                    <label>{`Sensor ${index + 1}`}</label>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={s.active}
                      name="active"
                      onChange={(ev) => handleOnChangeSensor(ev, index)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              );
            })}
          </div>
          <div className="btn-submit-container sensor-submit">
            <button className="btn submit-btn" onClick={handleClikcOnSave}>
              Guardar los cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SensorsComponent;

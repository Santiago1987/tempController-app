import { ModuleFromBD } from "../../../types";
type module = Omit<ModuleFromBD, "sensors">;

interface props {
  module: module;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  display: boolean;
  handleOnClickEdit: (chipID: string) => void;
  handleOnClickDelete: (chipID: string) => void;
  hideID: boolean;
}

const ModuleComponent = ({
  module,
  display,
  handleOnChange,
  handleOnClickEdit,
  handleOnClickDelete,
  hideID,
}: props) => {
  let { chipID, name, ubication, active } = module;

  return (
    <div hidden={display}>
      <input
        name="chipID"
        type="text"
        value={chipID}
        hidden={hideID}
        onChange={handleOnChange}
      />
      <label>Nombre</label>
      <input name="name" value={name} type="text" onChange={handleOnChange} />
      <label>Ubicacion</label>
      <input
        name="ubication"
        type="text"
        value={ubication}
        onChange={handleOnChange}
      />
      <label>Activo</label>
      <input
        name="active"
        type="checkbox"
        checked={active}
        onChange={handleOnChange}
      />
      <button hidden={!hideID} onClick={() => handleOnClickEdit(chipID)}>
        Editar
      </button>
      <button hidden={!hideID} onClick={() => handleOnClickDelete(chipID)}>
        Delete
      </button>
    </div>
  );
};

export default ModuleComponent;

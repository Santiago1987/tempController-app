import { ModuleFromBD } from "../../../types";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
type module = Omit<ModuleFromBD, "sensors">;

interface props {
  module: module;
  handleOnClickEdit: (chipID: string) => void;
  handleOnClickDelete: (chipID: string) => void;
}

const ModuleComponent = ({
  module,
  handleOnClickEdit,
  handleOnClickDelete,
}: props) => {
  let { chipID, name, ubication, active } = module;

  return (
    <div className="shadow bg-white rounded m-2">
      <div className="position-relative">
        <div className="d-flex justify-content-end position-absolute card-btns-container">
          <button
            type="button"
            className="card-btns"
            onClick={(ev) => handleOnClickEdit(chipID)}
          >
            <FaPencilAlt />
          </button>
          <button
            type="button"
            className="card-btns"
            onClick={() => handleOnClickDelete(chipID)}
          >
            <FaTimes />
          </button>
        </div>
        <input
          name="chipID"
          type="text"
          value={chipID}
          hidden
          onChange={() => {}}
        />
        <div className="p-2">
          <small>Nombre</small>
          <p className="h5">{name} </p>
        </div>
        <div className="p-2">
          <small>Ubicación</small>
          <p className="h5">{ubication} </p>
        </div>
        <div className="p-2">
          <p className={`h5 blinker ${active ? "active" : "inactive"}`}>
            {active ? `Activado` : `Desactivado`}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleComponent;

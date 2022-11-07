import { ModuleFromBD } from "../../../types";
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
      <div className="d-flexbox align-items-center">
        <input
          name="chipID"
          type="text"
          value={chipID}
          hidden
          onChange={() => {}}
        />
        <div className="p-2">
          <p className="h5">{`Nombre: ${name}`} </p>
        </div>
        <div className="p-2">
          <p className="h5">{`Ubicacion: ${ubication}`} </p>
        </div>
        <div className="p-2">
          <p
            className="h5"
            style={active ? { color: "#255c06" } : { color: "#ff3342" }}
          >
            {active ? `El modulo esta activo` : `El modulo esta desactivado`}{" "}
          </p>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={(ev) => handleOnClickEdit(chipID)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => handleOnClickDelete(chipID)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleComponent;

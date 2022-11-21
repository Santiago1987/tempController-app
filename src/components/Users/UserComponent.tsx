import { UserRegisterUpdInterface } from "../../../types";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

interface props {
  user: UserRegisterUpdInterface;
  handleOnClickEdit: (id: string) => void;
  handleOnClickDelete: (id: string) => void;
  handleOnClickChangePass: (id: string) => void;
}

const UserComponent = ({
  user,
  handleOnClickEdit,
  handleOnClickDelete,
  handleOnClickChangePass,
}: props) => {
  let { id, userName, email, telephone } = user;

  return (
    <div className="shadow bg-white rounded m-2">
      <div className="position-relative">
        <div className="d-flex justify-content-end position-absolute card-btns-container">
          <button
            type="button"
            className="card-btns"
            onClick={(ev) => handleOnClickEdit(id)}
          >
            <FaPencilAlt />
          </button>
          <button
            type="button"
            className="card-btns"
            onClick={() => handleOnClickDelete(id)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-2">
          <small>Nombre de usuario</small>
          <p className="h5">{userName} </p>
        </div>
        <div className="p-2">
          <small>Email</small>
          <p className="h5">{email} </p>
        </div>
        <div className="p-2">
          <small>Teléfono</small>
          <p className="h5">{telephone} </p>
        </div>

        <div className="p-2">
          <small className="w-100 d-inline-block">Contraseña</small>
          <a
            className="btn-link h5"
            onClick={() => handleOnClickChangePass(id)}
          >
            Cambiar contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;

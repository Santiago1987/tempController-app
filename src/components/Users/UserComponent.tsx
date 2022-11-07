import { UserRegisterUpdInterface } from "../../../types";

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
    <div>
      <input
        type="text"
        name="id"
        value={id}
        onChange={() => {}}
        hidden
        readOnly
      />
      <label>Nombre de usuario</label>
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={() => {}}
        readOnly
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={() => {}}
        readOnly
      />
      <label>Telefono</label>
      <input
        type="tel"
        name="telephone"
        value={telephone}
        onChange={() => {}}
        readOnly
      />
      <button onClick={() => handleOnClickEdit(id)}>Editar</button>
      <button onClick={() => handleOnClickDelete(id)}>Delete</button>
      <button onClick={() => handleOnClickChangePass(id)}>
        Cambiar contraseña
      </button>
    </div>
  );
};

export default UserComponent;

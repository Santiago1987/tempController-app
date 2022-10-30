import { UserRegisterUpdInterface } from "../../../types";
type props = {
  handleOnClickCancelRegister: () => void;
  handleOnClickSave: () => void;
  handleOnChangeUser: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  userInfo: UserRegisterUpdInterface;
  isRegister: boolean;
};

const UserRegisterUpdComponent = ({
  handleOnClickCancelRegister,
  handleOnClickSave,
  handleOnChangeUser,
  userInfo,
  isRegister,
}: props) => {
  let { id, userName, email, telephone, password } = userInfo;

  return (
    <>
      <button onClick={handleOnClickSave}>Guardar cambios</button>
      <button onClick={handleOnClickCancelRegister}>Cancelar</button>
      <div>
        <input
          type="text"
          name="id"
          value={id}
          onChange={handleOnChangeUser}
          hidden
        />
        <label>Nombre de usuario</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleOnChangeUser}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChangeUser}
        />
        <label>Telefono</label>
        <input
          type="tel"
          name="telephone"
          value={telephone}
          onChange={handleOnChangeUser}
        />
        <div hidden={isRegister}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChangeUser}
          />
        </div>
      </div>
    </>
  );
};

export default UserRegisterUpdComponent;

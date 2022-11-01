type props = {
  passwordOne: string;
  passwordTwo: string;
  handleOnChangePass: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickSavePass: (
    ev: React.FormEvent<HTMLFormElement>,
    passwordOne: string,
    passwordTwo: string
  ) => void;
  handleOnClickCancelPass: () => void;
};

const UserUpdatePassComponent = ({
  passwordOne,
  passwordTwo,
  handleOnChangePass,
  handleOnClickSavePass,
  handleOnClickCancelPass,
}: props) => {
  return (
    <form
      onSubmit={(ev) => handleOnClickSavePass(ev, passwordOne, passwordTwo)}
    >
      <label>Cambio de contraseña</label>
      <input
        type="text"
        name="passwordOne"
        value={passwordOne}
        onChange={handleOnChangePass}
        placeholder="Ingrese la contraseña"
      />
      <input
        type="text"
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleOnChangePass}
        placeholder="Repita la contraseña"
      />
      <button>Guardar cambios</button>
      <button onClick={handleOnClickCancelPass}>Cancelar</button>
    </form>
  );
};

export default UserUpdatePassComponent;

type props = {
  passwordOne: string;
  passwordTwo: string;
  handleOnChangePass: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickSavePass: (passwordOne: string, passwordTwo: string) => void;
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
    <div>
      <label>Contraseña</label>
      <input type="text" name="passwordOne" value={passwordOne} />

      <label>Repetir contraseña</label>
      <input
        type="text"
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleOnChangePass}
      />
      <button onClick={() => handleOnClickSavePass(passwordOne, passwordTwo)}>
        Guardar cambios
      </button>
      <button onClick={handleOnClickCancelPass}>Cancelar</button>
    </div>
  );
};

export default UserUpdatePassComponent;

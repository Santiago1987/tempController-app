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
    <>
      <div className="container main-container">
        <p className="main-title h2">Cambio de contraseña</p>
        <form
          className=""
          onSubmit={(ev) => handleOnClickSavePass(ev, passwordOne, passwordTwo)}
        >
          <div className="form-floating">
            <input
              id="passwordOne"
              className="form-control shadow-none"
              type="text"
              name="passwordOne"
              value={passwordOne}
              onChange={handleOnChangePass}
              placeholder="Ingrese la contraseña"
            />
            <label htmlFor="">Ingrese la contraseña</label>
          </div>
          <div className="form-floating">
            <input
              id="passwordTwo"
              className="form-control"
              type="text"
              name="passwordTwo"
              value={passwordTwo}
              onChange={handleOnChangePass}
              placeholder="Repita la contraseña"
            />
            <label htmlFor="passwordTwo">Repita la contraseña</label>
          </div>
          <div className="btn-submit-container">
            <button type="submit" className="btn submit-btn">
              Guardar
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleOnClickCancelPass}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserUpdatePassComponent;

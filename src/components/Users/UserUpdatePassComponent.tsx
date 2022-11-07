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
      <div className="container">
        <p className="w-50 p-3 mx-auto h2">Cambio de contraseña</p>
        <form
          className="w-50 p-3 mx-auto"
          onSubmit={(ev) => handleOnClickSavePass(ev, passwordOne, passwordTwo)}
        >
          <div>
            <div className="form-group p-3">
              <input
                className="form-control"
                type="text"
                name="passwordOne"
                value={passwordOne}
                onChange={handleOnChangePass}
                placeholder="Ingrese la contraseña"
              />
            </div>
            <div className="form-group p-3">
              <input
                className="form-control"
                type="text"
                name="passwordTwo"
                value={passwordTwo}
                onChange={handleOnChangePass}
                placeholder="Repita la contraseña"
              />
            </div>
            <div className="w-75 p-3 mx-auto">
              <button
                type="submit"
                className="btn btn-primary btn-lg m-1"
                style={{ width: "200px" }}
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-dark btn-lg m-1"
                style={{ width: "200px" }}
                onClick={handleOnClickCancelPass}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserUpdatePassComponent;

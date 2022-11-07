import { UserRegisterUpdInterface } from "../../../types";
type props = {
  handleOnClickCancelRegister: () => void;
  handleOnClickSave: (ev: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleOnChangeUser: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  userInfo: UserRegisterUpdInterface;
  isRegister: boolean;
  title: string;
};

const UserRegisterUpdComponent = ({
  handleOnClickCancelRegister,
  handleOnClickSave,
  handleOnChangeUser,
  userInfo,
  isRegister,
  title,
}: props) => {
  let { id, userName, email, telephone } = userInfo;

  return (
    <>
      <div className="container">
        <p className="w-50 p-3 mx-auto h2">{title}</p>
        <form
          className="w-50 p-3 mx-auto"
          onSubmit={(ev) => handleOnClickSave(ev, id)}
        >
          <div>
            <input
              type="text"
              name="id"
              value={id}
              onChange={handleOnChangeUser}
              hidden
            />
            <div className="form-group p-3">
              <label htmlFor="userName">Nombre de usuario</label>
              <input
                className="form-control"
                id="userName"
                type="text"
                name="userName"
                value={userName}
                onChange={handleOnChangeUser}
                placeholder="ingrese el nombre del usuario"
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="email">
                Email
                <span style={{ fontStyle: "italic" }}>{` (Opcional)`}</span>
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChangeUser}
                placeholder="ingrese un email"
              />
            </div>
            <div className="form-group p-3">
              <label className="form-check-label" htmlFor="telephone">
                Telefono
                <span style={{ fontStyle: "italic" }}>{` (Opcional)`}</span>
              </label>
              <input
                className="form-control"
                id="telephone"
                type="tel"
                name="telephone"
                value={telephone}
                onChange={handleOnChangeUser}
                placeholder="ingrese un numero de telefono"
              />
            </div>
            <div className="form-group p-3" hidden={!isRegister}>
              <label className="form-check-label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={telephone}
                onChange={handleOnChangeUser}
                placeholder="ingrese una contraseña mayor a 8 caracteres"
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
                onClick={handleOnClickCancelRegister}
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

export default UserRegisterUpdComponent;

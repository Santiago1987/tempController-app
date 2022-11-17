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
  let { id, userName, email, telephone, password } = userInfo;

  return (
    <>
      <div className="container main-container">
        <p className="main-title h2">{title}</p>
        <form className="" onSubmit={(ev) => handleOnClickSave(ev, id)}>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleOnChangeUser}
            hidden
          />
          <div className="form-floating">
            <input
              className="form-control shadow-none"
              id="userName"
              type="text"
              name="userName"
              value={userName}
              onChange={handleOnChangeUser}
              placeholder="Nombre de usuario"
            />
            <label htmlFor="userName">Nombre de usuario</label>
          </div>
          <div className="form-floating">
            <input
              id="email"
              className="form-control shadow-none"
              type="email"
              name="email"
              value={email}
              onChange={handleOnChangeUser}
              placeholder="Email (opcional)"
            />
            <label htmlFor="email">
              Email
              <span style={{ fontStyle: "italic" }}>{` (opcional)`}</span>
            </label>
          </div>
          <div className="form-floating">
            <input
              className="form-control shadow-none"
              id="telephone"
              type="tel"
              name="telephone"
              value={telephone}
              onChange={handleOnChangeUser}
              placeholder="Teléfono (opcional)"
            />
            <label className="form-check-label" htmlFor="telephone">
              Teléfono
              <span style={{ fontStyle: "italic" }}>{` (opcional)`}</span>
            </label>
          </div>
          <div className="form-floating" hidden={!isRegister}>
            <input
              className="form-control shadow-none"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleOnChangeUser}
              placeholder="Contraseña mayor a 8 caracteres"
            />
            <label className="form-check-label" htmlFor="password">
              Contraseña mayor a 8 caracteres
            </label>
          </div>
          <div className="btn-submit-container">
            <button type="submit" className="btn submit-btn">
              Guardar
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleOnClickCancelRegister}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegisterUpdComponent;

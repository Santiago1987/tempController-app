type props = {
  handleOnSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  registerModule: {
    chipID: string;
    name: string;
    active: boolean;
    ubication: string;
  };
  title: string;
  isRegister: boolean;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickCancelRegister: () => void;
};

const RegisterEditModuleComponent = ({
  registerModule,
  title,
  isRegister,
  handleOnSubmit,
  handleOnChange,
  handleOnClickCancelRegister,
}: props) => {
  return (
    <>
      <div className="container main-container">
        <p className="h2 main-title">{title}</p>
        <form className="" onSubmit={handleOnSubmit}>
          <div>
            <div hidden={!isRegister} className="form-group">
              <div className="form-floating">
                <input
                  id="chipID"
                  name="chipID"
                  type="text"
                  value={registerModule.chipID}
                  onChange={handleOnChange}
                  className="form-control  shadow-none"
                  placeholder="MAC ID"
                />
                <label htmlFor="chipID">MAC ID</label>
              </div>
            </div>
            <div className="form-floating">
              <input
                className="form-control  shadow-none"
                id="name"
                name="name"
                value={registerModule.name}
                type="text"
                onChange={handleOnChange}
                placeholder="Nombre del módulo"
              />
              <label htmlFor="name">Nombre del módulo</label>
            </div>
            <div className="form-floating">
              <input
                id="ubication"
                name="ubication"
                type="text"
                className="form-control shadow-none"
                value={registerModule.ubication}
                onChange={handleOnChange}
                placeholder="Ubicación del módulo"
              />
              <label htmlFor="ubication">Ubicación del módulo</label>
            </div>
            <div className="form-check active-check p-3">
              <input
                id="active"
                name="active"
                type="checkbox"
                className="form-check-input"
                checked={registerModule.active}
                onChange={handleOnChange}
              />
              <div className="fake-input"></div>
              <label className="form-check-label" htmlFor="active">
                Activo
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
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterEditModuleComponent;

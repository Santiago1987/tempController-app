import { Link } from "react-router-dom";
import useUser from "../../containers/hooks/User/useUser";
import "../../styles/header.css";

const Header = () => {
  const { isLogged, logout } = useUser();

  const handleOnClick = (): string => {
    return "";
  };

  return (
    <header>
      <div className="topnav">
        <div className="brand">
          <h3>C.I.D.I.F</h3>
        </div>
        <div>
          {isLogged ? (
            <div className="nav-button">
              <a onClick={logout}>Logout</a>
            </div>
          ) : (
            <div className="nav-button">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          )}

          <a className="icon" onClick={handleOnClick}>
            <i className="">ICONO</i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

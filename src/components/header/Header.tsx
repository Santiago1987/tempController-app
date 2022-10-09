import { Link } from "react-router-dom";
import useUser from "../../containers/hooks/useUser";
import "../../styles/header.css";

const Header = () => {
  const { isLogged, logout } = useUser();

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <a className="brand">C.I.D.I.F</a>
        <nav className="nav">
          <button
            className="nav_toggle"
            aria-aria-expanded="false"
            type="button"
            aria-label="menu"
          >
            Menu
          </button>
          <ul className="nav_wrapper">
            {isLogged ? (
              <li className="nav_item">
                <a onClick={logout}>Logout</a>
              </li>
            ) : (
              <>
                <li className="nav_item">
                  <Link to="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li className="nav_item">
                  <Link to="/register">
                    <a>Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

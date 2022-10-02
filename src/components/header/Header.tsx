import { Link } from "react-router-dom";
import useUser from "../../containers/hooks/useUser";
import "../../styles/header.css";

const Header = () => {
  const { isLogged, logout } = useUser();

  return (
    <header>
      <div className="header">
        {isLogged ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

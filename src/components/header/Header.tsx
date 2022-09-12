import { Link } from "react-router-dom";
import useUser from "../../containers/hooks/useUser";

const Header = () => {
  const { isLogged, logout } = useUser();

  return (
    <header>
      {isLogged ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;

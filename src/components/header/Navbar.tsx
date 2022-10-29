//import { Link } from "react-router-dom";
import useUser from "../../containers/hooks/User/useUser";
import { useState } from "react";
import {
  Container,
  LogoContainer,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
  Wrapper,
} from "./NavbarStyles";
import {
  FaThermometerHalf,
  FaBars,
  FaDoorOpen,
  FaDoorClosed,
  FaHome,
  FaPenAlt,
  FaTimes,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const Header = () => {
  const [showMobileMenu, setShotMobileMenu] = useState(false);
  const { isLogged, logout } = useUser();

  const handleLogOut = () => {
    setShotMobileMenu(!showMobileMenu);
    logout();
  };

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <LogoContainer>
            <FaThermometerHalf />
            <h3>C.I.D.I.F.</h3>
          </LogoContainer>
          <MobileIcon onClick={() => setShotMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <Menu open={showMobileMenu}>
            {isLogged ? (
              <>
                <MenuItem>
                  <MenuItemLink
                    to="/home"
                    onClick={() => setShotMobileMenu(!showMobileMenu)}
                  >
                    <div>
                      <FaHome />
                      HOME
                    </div>
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="/modules"
                    onClick={() => setShotMobileMenu(!showMobileMenu)}
                  >
                    <div>
                      <FaDoorClosed />
                      MODULOS
                    </div>
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="/users"
                    onClick={() => setShotMobileMenu(!showMobileMenu)}
                  >
                    <div>
                      <FaDoorClosed />
                      USUARIOS
                    </div>
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink to="/login" onClick={handleLogOut}>
                    <div>
                      <FaDoorClosed />
                      LOGOUT
                    </div>
                  </MenuItemLink>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <MenuItemLink
                    to="/login"
                    onClick={() => setShotMobileMenu(!showMobileMenu)}
                  >
                    <div>
                      <FaDoorOpen />
                      LOGIN
                    </div>
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="/register"
                    onClick={() => setShotMobileMenu(!showMobileMenu)}
                  >
                    <div>
                      <FaPenAlt />
                      REGISTER
                    </div>
                  </MenuItemLink>
                </MenuItem>
              </>
            )}
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Header;

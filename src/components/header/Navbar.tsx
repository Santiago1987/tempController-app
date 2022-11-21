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
  LogoLink,
} from "./NavbarStyles";
import {
  FaThermometerHalf,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaMicrochip,
  FaUsers,
  FaBroadcastTower,
  FaCog,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const Header = () => {
  const [showMobileMenu, setShotMobileMenu] = useState(false);
  const { isLogged, logout, isAdministrator } = useUser();

  const handleLogOut = () => {
    setShotMobileMenu(!showMobileMenu);
    logout();
  };

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <LogoLink to="/home">
            <LogoContainer>
              <FaThermometerHalf />
              <h3>C.I.D.I.F.</h3>
            </LogoContainer>
          </LogoLink>
          <MobileIcon onClick={() => setShotMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <Menu open={showMobileMenu}>
            {isLogged ? (
              <>
                {isAdministrator === "true" ? (
                  <>
                    <MenuItem>
                      <MenuItemLink
                        to="/modules"
                        onClick={() => setShotMobileMenu(!showMobileMenu)}
                      >
                        <div>
                          <FaMicrochip />
                          MÓDULOS
                        </div>
                      </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemLink
                        to="/users"
                        onClick={() => setShotMobileMenu(!showMobileMenu)}
                      >
                        <div>
                          <FaUsers />
                          USUARIOS
                        </div>
                      </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemLink
                        to="/sensors"
                        onClick={() => setShotMobileMenu(!showMobileMenu)}
                      >
                        <div>
                          <FaBroadcastTower />
                          SENSORES
                        </div>
                      </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemLink
                        to="/settings"
                        onClick={() => setShotMobileMenu(!showMobileMenu)}
                      >
                        <div>
                          <FaCog />
                          CONFIGURACIONES
                        </div>
                      </MenuItemLink>
                    </MenuItem>
                  </>
                ) : (
                  <></>
                )}

                <MenuItem>
                  <MenuItemLink to="/login" onClick={handleLogOut}>
                    <div>
                      <FaSignOutAlt />
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
                      <FaSignInAlt />
                      LOGIN
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

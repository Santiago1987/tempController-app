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
  FaDoorOpen,
  FaDoorClosed,
  FaTimes,
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
          <LogoLink
            to="/home"
            onClick={() => setShotMobileMenu(!showMobileMenu)}
          >
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
                      <MenuItemLink
                        to="/sensors"
                        onClick={() => setShotMobileMenu(!showMobileMenu)}
                      >
                        <div>
                          <FaDoorClosed />
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
                          <FaDoorClosed />
                          SETTINGS
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
              </>
            )}
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Header;

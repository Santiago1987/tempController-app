import React from "react";
import {
  Container,
  Form,
  Input,
  LoginLogo,
  LoginTitle,
  Wrapper,
  WrapperInput,
  SpanInput,
  ButtonContainner,
  Button,
} from "./LoginComponentSyles";
import { FaThermometerHalf } from "react-icons/fa";
import Mensaje from "../Mensajes/Mensaje";
import { messageType } from "../../typeEnum";

type Props = {
  logValues: { username: string; password: string };
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  hasLoadingError: string;
};

const LogingComponent = ({
  logValues,
  handleLogin,
  handleOnChange,
  hasLoadingError,
}: Props) => {
  return (
    <Container>
      {hasLoadingError !== "" ? (
        <Mensaje tipo={messageType.error} message={hasLoadingError} />
      ) : (
        <></>
      )}
      <Wrapper>
        <Form onSubmit={handleLogin}>
          <LoginLogo>
            <FaThermometerHalf />
          </LoginLogo>
          <LoginTitle>Log in</LoginTitle>
          <div>
            <WrapperInput>
              <Input
                type="text"
                value={logValues.username}
                name="Username"
                placeholder="Nombre de usuario"
                onChange={handleOnChange}
              />
              <SpanInput></SpanInput>
            </WrapperInput>
            <WrapperInput>
              <Input
                type="password"
                value={logValues.password}
                name="Password"
                placeholder="Contraseña"
                onChange={handleOnChange}
              />
            </WrapperInput>
          </div>
          <ButtonContainner>
            <Button>Login</Button>
          </ButtonContainner>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LogingComponent;

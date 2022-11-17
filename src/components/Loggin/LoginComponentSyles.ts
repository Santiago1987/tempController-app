import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
`;

export const Wrapper = styled.div`
  max-width: 500px;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 55px 37px;
  margin: auto;
  background-color: #23394d;
  margin-top: 1rem;
  height: 700px;

  @media screen and (max-width: 960px) {
    width: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const LoginLogo = styled.span`
  font-size: 50px;
  color: #23394d;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #79ade8;
  margin: 0 auto;
`;

export const LoginTitle = styled.span`
  font-size: 30px;
  color: #fff;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  display: block;
  font-family: "RobotoCondensed-Bold", sans-serif;
`;

export const WrapperInput = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 2px solid rgba(255, 255, 255, 0.24);
  margin-bottom: 30px;
`;

export const Input = styled.input`
  font-family: "RobotoCondensed-Regular", sans-serif;
  font-size: 20px;
  color: #fff;
  line-height: 1.2;
  display: block;
  width: 100%;
  height: 45px;
  background: 0 0;
  outline: none;
  border: none;
  overflow: visible;

  &::placeholder {
    color: #fff;
  }
`;

export const SpanInput = styled.span`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  &::after {
    font-size: 22px;
    color: #fff;
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: 6px;
    left: 0;
    padding-left: 5px;
    transition: 0.5s all ease;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    transition: 0.5s all ease;
    background: #fff;
  }
`;

export const ButtonContainner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  font-size: 24px;
  color: #23394d;
  line-height: 1.2;
  padding: 0 30px;
  min-width: 120px;
  height: 50px;
  border-radius: 25px;
  position: relative;
  z-index: 1;
  transition: 0.5 all ease;
  background: #79ade8;
  cursor: pointer;
  font-family: "RobotoCondensed-Bold", sans-serif;
  text-transform: uppercase;
`;

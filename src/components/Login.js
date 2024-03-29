import { useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";

import { openClientSession } from "../services/MyWalletAPI";
import FormsStyle from "../common/FormsStyle";
import Logo from "../common/Logo";
import Button from "../common/Button";
import StyledLink from "../common/StyledLink";

export default function Login() {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  function showPassword() {
    {
      isShown ? setIsShown(false) : setIsShown(true);
    }
  }

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function sendLogin(e) {
    e.preventDefault();
    setIsDisable(true);

    try {
      const response = await openClientSession(inputData);

      localStorage.setItem("UserToken", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      setIsDisable(false);
      console.log(error);
      alert(error.response.data.details[0]);
    }
  }

  return (
    <>
      <Wrapper>
        <Logo />
        <FormsStyle isDisable={isDisable} onSubmit={sendLogin}>
          <input
            required
            type="email"
            name="email"
            placeholder="E-mail"
            disabled={isDisable}
            onChange={handleForm}
            value={inputData.email}
          />
          <input
            required
            type={isShown ? "text" : "password"}
            name="password"
            placeholder="Senha"
            disabled={isDisable}
            onChange={handleForm}
            value={inputData.password}
          />
          <EyeIcon>
            {isShown ? (
              <BsEye size="25px" onClick={showPassword} />
            ) : (
              <BsEyeSlash size="25px" onClick={showPassword} />
            )}
          </EyeIcon>
          <Button type="submit" isDisable={isDisable}>
            Entrar
          </Button>
        </FormsStyle>
        <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  justify-content: center;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 3.5%;
  top: 100px;
`;

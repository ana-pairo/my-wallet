import styled from "styled-components";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Logo from "../common/Logo";
import FormsStyle from "../common/FormsStyle";
import Button from "../common/Button";
import StyledLink from "../common/StyledLink";

export default function Register() {
  const navigate = useNavigate();

  const [warningMessage, setWarningMessage] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function checkPassword(e) {
    const confirmPassword = e.target.value;
    if (confirmPassword != 0 && confirmPassword !== inputData.password) {
      setWarningMessage("As senhas não coincidem");
    } else {
      setWarningMessage("");
    }
  }

  function showPassword() {
    {
      isShown ? setIsShown(false) : setIsShown(true);
    }
  }

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function sendRegister(e) {
    e.preventDefault();
    setIsDisable(true);
    setWaiting(true);
    navigate("/");
    /*
    MANDAR PARA API
   */
  }

  return (
    <>
      <Wrapper>
        <Logo />
        <FormsStyle isDisable={isDisable} onSubmit={sendRegister}>
          <input
            required
            type="text"
            name="name"
            placeholder="Nome"
            disabled={isDisable}
            onChange={handleForm}
            value={inputData.name}
          />
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
          <input
            required
            type="password"
            placeholder="Confirme a senha"
            onKeyUp={checkPassword}
            disabled={isDisable}
          />
          {warningMessage !== "" ? (
            <Message>
              <MdError style={{ color: "red" }} size="30px" />
              <p>{warningMessage}</p>
            </Message>
          ) : (
            ""
          )}

          <Button
            type="submit"
            isDisable={isDisable}
            disabled={warningMessage !== "" ? "true" : ""}
            waiting={waiting}
            setWaiting={setWaiting}
          >
            Cadastrar
          </Button>
        </FormsStyle>
        <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
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

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px 3px;

  p {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    font-style: italic;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 3.5%;
  top: 172px;
`;

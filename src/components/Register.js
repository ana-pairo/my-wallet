import styled from "styled-components";
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { VscClose, VscCheck } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

import { createClient } from "../services/MyWalletAPI";
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
  const [passwordLength, setPasswordLength] = useState(false);
  const [containsNumbers, setContainsNumbers] = useState(false);
  const [containsUpperCase, setContainsUpperCase] = useState(false);
  const [containsSymbols, setContainsSymbols] = useState(false);

  function confirmPassword(e) {
    const password = e.target.value;
    if (password !== 0 && password !== inputData.password) {
      setWarningMessage("As senhas não coincidem");
    } else {
      setWarningMessage("");
    }
  }

  function validatePassword(e) {
    const value = e.target.value;
    setPasswordLength(value.length > 4);
    setContainsNumbers(value.match(/\d+/) !== null);
    setContainsUpperCase(value.match(/[A-Z]/) !== null);
    setContainsSymbols(value.match(/[^A-Z a-z0-9]/) !== null);
  }

  function showPassword() {
    {
      isShown ? setIsShown(false) : setIsShown(true);
    }
  }

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function sendRegister(e) {
    e.preventDefault();

    if (
      passwordLength &&
      containsNumbers &&
      containsUpperCase &&
      containsSymbols
    ) {
      setIsDisable(true);
      setWaiting(true);

      try {
        await createClient(inputData);
        navigate("/");
      } catch (error) {
        setIsDisable(false);
        console.log(error);
        alert(error.response.data.details[0]);
      }
    }
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
            onChange={(e) => {
              handleForm(e);
              validatePassword(e);
            }}
            value={inputData.password}
          />
          <EyeIcon>
            {isShown ? (
              <BsEye size="25px" onClick={showPassword} />
            ) : (
              <BsEyeSlash size="25px" onClick={showPassword} />
            )}
          </EyeIcon>

          <PasswordValidation margin={inputData.password.length > 0}>
            {inputData.password.length > 0 ? (
              <>
                <div>
                  {passwordLength ? (
                    <VscCheck style={{ color: "#00FC7E" }} size="27px" />
                  ) : (
                    <VscClose style={{ color: "#FC0000" }} size="27px" />
                  )}
                  <p>Possui mais de 4 caracteres</p>
                </div>
                <div>
                  {containsNumbers ? (
                    <VscCheck style={{ color: "#00FC7E" }} size="27px" />
                  ) : (
                    <VscClose style={{ color: "#FC0000" }} size="27px" />
                  )}
                  <p>Possui números</p>
                </div>
                <div>
                  {containsUpperCase ? (
                    <VscCheck style={{ color: "#00FC7E" }} size="27px" />
                  ) : (
                    <VscClose style={{ color: "#FC0000" }} size="27px" />
                  )}
                  <p>Possui letra maiúscula</p>
                </div>
                <div>
                  {containsSymbols ? (
                    <VscCheck style={{ color: "#00FC7E" }} size="27px" />
                  ) : (
                    <VscClose style={{ color: "#FC0000" }} size="27px" />
                  )}
                  <p>Possui símbolos</p>
                </div>
              </>
            ) : (
              ""
            )}
          </PasswordValidation>

          <input
            required
            type="password"
            placeholder="Confirme a senha"
            onKeyUp={confirmPassword}
            disabled={isDisable}
          />
          {warningMessage !== "" ? (
            <Message>
              <VscClose style={{ color: "#FC0000" }} size="30px" />
              <p>{warningMessage}</p>
            </Message>
          ) : (
            ""
          )}

          <Button
            type="submit"
            isDisable={isDisable}
            disabled={warningMessage !== "" ? true : ""}
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
    margin-left: 5px;
    font-size: 20px;
    color: #ffffff;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 3.5%;
  top: 172px;
`;

const PasswordValidation = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => (props.margin ? " 10px 0 10px 3px" : "")};
  font-size: 20px;
  font-weight: 400;
  color: white;

  div {
    margin-top: 5px;
    display: flex;
    align-items: center;
  }

  p {
    margin-left: 5px;
  }
`;

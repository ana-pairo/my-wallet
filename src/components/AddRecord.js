import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import CurrencyInput from "react-currency-masked-input";

import FormsStyle from "../common/FormsStyle";
import Header from "../common/Header";
import Button from "../common/Button";
import TokenContext from "../contexts/TokenContext";
import { insertNewTransaction } from "../services/MyWalletAPI";

export default function AddRecord({ type }) {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    date: dayjs(new Date()).format("DD/MM"),
    description: "",
    amount: "",
    type,
  });

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function sendStatement(e) {
    e.preventDefault();
    setIsDisable(true);

    try {
      const response = await insertNewTransaction({ inputData, token });

      console.log(response.data);

      navigate("/home");
    } catch (error) {
      setIsDisable(false);
      alert(error.response.data);
    }
  }

  return (
    <Wrapper>
      <Header>{type === "deposit" ? "Nova entrada" : "Nova saída"}</Header>
      <FormsStyle isDisable={isDisable} onSubmit={sendStatement}>
        <CurrencyInput
          required
          type="number"
          name="amount"
          step="0.01"
          min="0.01"
          max="999999.99"
          placeholder="Valor"
          disabled={isDisable}
          onChange={handleForm}
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Descrição"
          disabled={isDisable}
          onChange={handleForm}
        />
        <Button>
          {type === "deposit" ? "Salvar entrada" : "Salvar saída"}{" "}
        </Button>
      </FormsStyle>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  font-family: "Raleway", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    position: relative;
    top: 12%;
  }
`;

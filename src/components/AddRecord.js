import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import IntlCurrencyInput from "react-intl-currency-input";

import FormsStyle from "../common/FormsStyle";
import Header from "../common/Header";
import Button from "../common/Button";
import { insertNewTransaction } from "../services/MyWalletAPI";

export default function AddRecord({ type }) {
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    date: dayjs(new Date()).format("DD/MM"),
    description: "",
    amount: "0.00",
    type,
  });

  useEffect(() => {
    if (localStorage.getItem("UserToken") === null) {
      alert("Sessão expirada, por favor faça login novamente");
      navigate("/");
    }
  }, []);
  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  function handleAmount(e, value) {
    e.preventDefault();
    setInputData({ ...inputData, amount: value.toFixed(2) });
  }

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function sendStatement(e) {
    e.preventDefault();
    setIsDisable(true);
    const token = JSON.parse(localStorage.getItem("UserToken"));

    try {
      await insertNewTransaction({ inputData, token });

      navigate("/home");
    } catch (error) {
      setIsDisable(false);
      alert(error.response.data.details[0]);
    }
  }

  return (
    <Wrapper>
      <Header>{type === "deposit" ? "Nova entrada" : "Nova saída"}</Header>
      <FormsStyle isDisable={isDisable} onSubmit={sendStatement}>
        <IntlCurrencyInput
          required
          currency="BRL"
          config={currencyConfig}
          disabled={isDisable}
          onChange={handleAmount}
          value={parseFloat(inputData.amount)}
          max={parseFloat("999999.99")}
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Descrição"
          disabled={isDisable}
          onChange={handleForm}
        />
        <Button type="submit">
          {type === "deposit" ? "Salvar entrada" : "Salvar saída"}{" "}
        </Button>
      </FormsStyle>
      <Cancel
        onClick={() => {
          navigate("/home");
        }}
      >
        <Button>Cancelar</Button>
      </Cancel>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  font-family: "Raleway", sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    position: relative;
    top: 12%;
  }
`;

const Cancel = styled.div`
  width: 85%;
  max-width: 600px;
  position: relative;
  top: 11%;
`;

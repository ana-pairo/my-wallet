import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import FormsStyle from "../common/FormsStyle";
import Header from "../common/Header";
import Button from "../common/Button";

export default function AddRecord({ type }) {
  const [isDisable, setIsDisable] = useState(false);

  return (
    <Wrapper>
      <Header>{type === "deposit" ? "Nova entrada" : "Nova saída"}</Header>
      <FormsStyle>
        <input
          required
          type="number"
          name="quantity"
          step="0.01"
          min="0.01"
          max="999999.99"
          placeholder="Valor"
          disabled={isDisable}
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Descrição"
          disabled={isDisable}
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

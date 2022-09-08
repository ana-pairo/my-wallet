import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import styled from "styled-components";
import dayjs from "dayjs";

import { getUserData, deleteSession } from "../services/MyWalletAPI";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import Header from "../common/Header";

export default function Home() {
  const { token } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const teste = true;

  useEffect(() => {
    if (!token) {
      alert("Sessão expirada, por favor faça login novamente");
      navigate("/");
    } else {
      getUserData(token)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  async function logOut() {
    if (window.confirm("Deseja realmente encerrar sua sessão?")) {
      try {
        const response = await deleteSession(token);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Wrapper>
      {user.length === 0 ? (
        <ThreeCircles
          height="150"
          width="150"
          color="rgb(163, 40, 214, 1)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      ) : (
        <>
          <Header>
            <div>Olá, {user}</div>
            <RiLogoutBoxRLine size="30px" onClick={logOut} />
          </Header>
          <Records>
            {teste ? (
              <>
                <Statements>
                  <Statment>
                    <Date>31/07</Date>
                    <Description>
                      Picole na praia da bhia na ferias de meio do ano
                    </Description>
                    <Price>31,80</Price>
                  </Statment>
                  <Statment>
                    <Date>02/08</Date>
                    <Description>Churrasco na lage</Description>
                    <Price>100,00</Price>
                  </Statment>
                </Statements>
                <Balance>
                  SALDO <div>2548,45</div>
                </Balance>
              </>
            ) : (
              <Message>
                Statement with Withdrawals and deposits Não há registros de
                entrada ou saída
              </Message>
            )}
          </Records>
          <Buttons>
            <IoAddCircleOutline
              color="#ffffff"
              size="25px"
              style={{ position: "absolute", top: "6%", left: "2%" }}
            />
            <IoRemoveCircleOutline
              color="#ffffff"
              size="25px"
              style={{ position: "absolute", top: "6%", left: "55%" }}
            />
            <button>Nova entrada</button>
            <button>Nova saida</button>
          </Buttons>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: "Raleway", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Records = styled.div`
  height: 69%;
  width: 85%;
  max-width: 600px;
  display: flex;
  position: absolute;
  top: 10%;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #868686;
  border-radius: 5px;
  margin-bottom: 13px;
  /* font-family: "Raleway", sans-serif; */
`;

const Message = styled.div`
  width: 55%;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Statements = styled.div`
  width: 95%;
  height: 85%;
  overflow-y: scroll;
`;

const Statment = styled.div`
  width: 100%;
  resize: vertical;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Date = styled.div`
  width: 18%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  color: #c6c6c6;
`;

const Description = styled.div`
  width: 62%;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  color: #000000;
  resize: vertical;
`;

const Price = styled.div`
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #c70000;
`;

const Balance = styled.div`
  width: 95%;
  height: 8%;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  div {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: right;
    color: #03ac00;
  }
`;

const Buttons = styled.div`
  width: 85%;
  max-width: 600px;
  height: 17%;
  display: flex;
  position: absolute;
  top: 79%;
  margin-top: 13px;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #a328d6;
    width: 47%;
    height: 100%;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    display: flex;
    outline: none;
    border: none;
    color: #ffffff;
    align-items: flex-end;
    justify-content: left;
    text-align: left;
    padding: 0 0 9px 10px;
    padding-right: 40%;
  }
`;

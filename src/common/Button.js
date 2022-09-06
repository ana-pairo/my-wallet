import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Button({ children, isDisable, disabled, waiting }) {
  return (
    <ButtonWrapper waiting={waiting} disabled={disabled} isDisable={isDisable}>
      {waiting && isDisable ? (
        <ThreeDots
          height="20"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
        />
      ) : (
        children
      )}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  width: 100%;
  text-decoration: none;
  border: none;
  background-color: #a328d6;
  opacity: ${(props) => (props.isDisable ? 0.7 : 1)};
  border-radius: 5px;
  height: 46px;
  font-size: 20px;
  line-height: 23px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: #a328d6;
  margin-top: 15px;
`;

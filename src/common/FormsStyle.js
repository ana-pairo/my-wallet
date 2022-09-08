import styled from "styled-components";

const FormsStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  position: relative;
  max-width: 600px;

  input {
    height: 58px;
    text-decoration: none;
    background-color: #ffffff;
    opacity: ${(props) => (props.isDisable ? 0.8 : 1)};
    border-radius: 5px;
    border: none;
    margin-top: 13px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    padding-left: 15px;
    padding-right: 60px;
    outline: none;
  }

  input::placeholder {
    color: #000000;
    opacity: ${(props) => (props.isDisable ? 0.5 : 1)};
  }
`;

export default FormsStyle;

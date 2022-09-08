import styled from "styled-components";

const Header = styled.div`
  width: 85%;
  height: 10%;
  max-width: 600px;
  display: flex;
  position: absolute;
  top: 0;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  font-weight: 700;
  line-height: 30px;
  color: #ffffff;

  div {
    max-height: 40px;
    width: 80%;
    overflow-x: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default Header;

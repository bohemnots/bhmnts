import styled from "styled-components";

interface HeaderProps {}

const Header = styled.header<HeaderProps>`
  transition: all 0.5s;
  padding-top: ${(props) => (props.hidden ? "0" : "10%")};
`;

export default Header;

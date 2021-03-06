import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { useAppContext } from "../context";
import { AuthView } from "./AuthView";

export const MainLayout = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  min-height: 100vh;
`;

const View = styled.div`
  max-width: 800px;
  margin: auto;

  @media only screen and (max-width: 600px) {
    max-width: unset;
    margin: 12px;
  }
`;

const SubTitle = styled.div`
  width: 100%;
  text-align: center;

  a {
    color: white;
    text-align: center;
    font-size: 8pt;
  }

  &:visited {
    color: white;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 11pt;
  padding: 12px;
`;

export const HeaderItem = styled.span`
  margin: 12px;

  & a,
  & a:visited {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
  }
`;

const LinkA = styled.a`
  font-size: 11pt;
  color: white;
  cursor: pointer;
  &:visited {
    color: white;
  }
`;

const Title = styled.div`
  font-size: 14pt;
  text-align: center;
`;

interface FestLayoutProps {
  showSignIn?: boolean;
  className?: string;
}

export const FestLayout: React.FC<FestLayoutProps> = (props) => {
  const ctx = useAppContext();

  return (
    <Container className={props.className}>
      <Header>
        <HeaderItem>
          <LinkA onClick={() => ctx.setLang("hy")}>HY</LinkA> /{" "}
          <LinkA onClick={() => ctx.setLang("en")}>EN</LinkA>
        </HeaderItem>
        <HeaderItem>
          {props.showSignIn ? <AuthView /> : <Link href="/">GO TO RADIO</Link>}
        </HeaderItem>
      </Header>
      <View>
        <Title>{"SEPTEMBER 23-27"}</Title>
        <Title>{"Composers' Union, Dilijan"}</Title>
        <SubTitle>
          <Link href="/fest">https://bohemnotsradio.com/fest</Link>
        </SubTitle>
        {props.children}
      </View>
    </Container>
  );
};

import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";

import { useAppContext } from "../hooks";

export const MainLayout = styled.div`
  min-width: 100vw;
  min-height: 60vh;
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

const HeaderItem = styled.span``;

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

export const FestLayout = (props) => {
  const ctx = useAppContext();

  useEffect(() => {
    ctx.setShowFooter(false);
    ctx.setShowHeader(false);
  });

  return (
    <Container className={props.className}>
      <Header>
        <HeaderItem>
          <LinkA onClick={() => ctx.setLang("hy")}>HY</LinkA> /{" "}
          <LinkA onClick={() => ctx.setLang("en")}>EN</LinkA>
        </HeaderItem>
        <HeaderItem>
          <Link href="/">GO TO RADIO</Link>
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

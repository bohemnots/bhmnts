import Link from "next/dist/client/link";
import React from "react";
import styled from "styled-components";

const linkStyle = { color: "white", cursor: "pointer" };
const smallTextStyle = {
  fontSize: "0.6em",
  position: "relative",
  top: "-14px",
};
const purpleColor = "#8800ff";
const P = styled.p`
  font-size: 1.6em;
  color: ${purpleColor};
  @media (max-width: 768px) {
    font-size: 1.6em;
  }
`;
const Heading = styled.p`
  font-size: 2em;
  color: ${purpleColor};
  @media (max-width: 768px) {
    font-size: 3em;
  }
`;
const CenteredWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  place-items: center;
  color: ${purpleColor};
  text-align: center;
  margin-top: 10vh;
  @media (max-width: 768px) {
    margin-top: 1vh;
  }
`;
const Container = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: start;
`;

const SmallText = (props) => {
  return (
    <span style={{ ...smallTextStyle, ...props.style }}>{props.text}</span>
  );
};
const NextPageLink = () => {
  return (
    <Link href="karnaval/ticket">
      <span style={linkStyle}>
        <h2>See More</h2>
      </span>
    </Link>
  );
};
const Lineup = (props) => {
  return (
    <Container>
      <CenteredWrapper className={props.className}>
        <Heading style={{ color: purpleColor, marginBottom: "0.1em" }}>
          Composers&apos; Union Dilijan <br />
          SEPTEMBER 2-4
        </Heading>
        <p style={{ fontSize: "1em" }}>
          Fairy tale is calling <br />
          For two days radio will be streamed from the hall named after
          Beethoven <br />
          We will have radio shows <br />
          concerts, live sessions & screenings <br />
          Program will be updated regularly
        </p>
        <P>
          VHSound & Ensemble <br />
          dk.tsk
          <SmallText text={" / session"} style={{ top: "unset" }} />
          <br />
          NODE . Diezel Tea
          <br />
          F.I.X
          <br />
          S-pichka
          <br />
          LSD Sound-Out Club
          <br />
          mu.viz
          <br />
          <SmallText text={"[audio+visual]"} />
        </P>
        <br />
        <br />
        <NextPageLink></NextPageLink>
      </CenteredWrapper>
    </Container>
  );
};

export default Lineup;

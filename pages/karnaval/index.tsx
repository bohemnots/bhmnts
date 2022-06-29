import Link from "next/dist/client/link";
import React from "react";
import styled from "styled-components";

const linkStyle = { color: "white", cursor: "pointer" };
const smallTextStyle = { fontSize: "0.6em" };
const purpleColor = "#8800ff";
const P = styled.p`
  font-size: 2em;
  color: ${purpleColor};
`;
const CenteredWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  place-items: center;
  color: ${purpleColor};
  text-align: center;
`;
const Container = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const SmallText = (props) => {
  return <span style={smallTextStyle}>{props.text}</span>;
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
        <P style={{ color: purpleColor }}>
          Composers&apos; Union Dilijan <br />
          SEPTEMBER 2-4
        </P>
        <p style={{ fontSize: "1em" }}>
          For two days radio will be streamed from the hall named after
          Beethoven <br />
          We will have radio shows, broadcasts, live sessions, screenings <br />
          Program will be updated regularly
        </p>
        <P>
          dk.tsk <SmallText text={"[session]"} /> . VHSound & Ensemble . Diezel
          Tea
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

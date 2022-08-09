import Link from "next/dist/client/link";
import Head from "next/head";
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
    font-size: 1.5em;
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
    <Link href="heqiatne_kanchum/ticket">
      <span style={linkStyle}>
        <h2>See More</h2>
      </span>
    </Link>
  );
};
const Lineup = (props) => {
  return (
    <Container>
      <Head>
        <title>Հեքիաթն է կանչում</title>
        <meta property="og:type" content="music.radio_station"></meta>
        <meta property="og:title" content="Հեքիաթն է կանչում" key="title" />
        <meta
          property="og:description"
          content='"fairy tale is calling" is a diversified art and music festival.'
          key="desciription"
        />
        <meta
          property="og:image"
          content="https://bohemnotsradio.com/images/og-image.jpg"
        ></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta
          property="og:image:secure_url"
          content="https://bohemnotsradio.com/images/og-image.jpg"
        ></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta
          property="og:url"
          content="https://bohemnotsradio.com/heqiatne_kanchum"
        ></meta>
        <meta property="fb:app_id" content="617494228985895"></meta>
      </Head>
      <CenteredWrapper className={props.className}>
        <Heading style={{ color: purpleColor, marginBottom: "0.1em" }}>
          Composers&apos; Union Dilijan <br />
          SEPTEMBER 2-3
        </Heading>
        <p style={{ fontSize: "1em" }}>
          Fairy tale is calling <br />
          For two days radio will be streamed from the hall named after
          Beethoven <br />
          We will have radio shows <br />
          dance music, concerts
          <br /> live sessions & screenings <br />
        </p>
        <P>
          VHSound & Ensemble <br />
          dk.tsk
          <SmallText text={" / session"} style={{ top: "unset" }} />
          <br />
          NODE . Diezel Tea
          <br />
          F.I.X.
          <br />
          S-pichka
          <br />
          LSD Sound-Out Club
          <br />
          mu.viz
          <br />
          <SmallText text={"[audio+visual]"} />
          <br />
          ON Y VA <br />
          grigor.simonyan <br />
          yozemal <br />
          Mycotrophic <br />
          sevu <br />
        </P>
        <br />
        <br />
        <NextPageLink></NextPageLink>
      </CenteredWrapper>
    </Container>
  );
};

export default Lineup;

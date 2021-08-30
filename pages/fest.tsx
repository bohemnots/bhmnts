import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { FestLayout } from "../components/Layout";
import { useAppContext } from "../hooks";

const View = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 20px;

  @media only screen and (max-width: 600px) {
    max-width: unset;
    margin: 0;
    margin-top: 20px;
  }
`;

const P = styled.p`
  font-size: 11pt;
  text-align: center;
  margin: 0;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const BuyButton = styled.div`
  text-align: center;

  & .disabled img {
    filter: grayscale(100%);
  }

  a {
    border-radius: 16px;
    text-decoration: none;
    cursor: default;
  }

  img {
    width: 250px;
  }
`;

export default function FestDesc(props) {
  const ctx = useAppContext();

  ctx.setShowFooter(false);
  ctx.setShowHeader(false);

  return (
    <FestLayout className={props.className}>
      <Head>
        <meta
          name="description"
          content="Hi dear… On the 23, 24, 25, 26 of September we are planning to organize a festival In the creative house of Dilijan Composers' Union. There are multigenre projects, bands and artists involved in the line up. To make the festival real, we do not want to ask for any sponsorship, because we want to be truthful to our manifest and keep our freedom."
        ></meta>
        <meta property="og:title" content="Bohemnots Radio ◼︎"></meta>
        <meta
          property="og:image"
          content="https://bohemnotsradio.com/images/composers.jpg"
        ></meta>
        <meta
          property="og:image:secure_url"
          content="https://bohemnotsradio.com/images/composers.jpg"
        ></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta
          property="og:description"
          content="Hi dear… On the 23, 24, 25, 26 of September we are planning to organize a festival In the creative house of Dilijan Composers' Union. There are multigenre projects, bands and artists involved in the line up. To make the festival real, we do not want to ask for any sponsorship, because we want to be truthful to our manifest and keep our freedom."
        ></meta>
        <meta property="og:type" content="music.radio_station"></meta>
        <meta property="og:url" content="https://bohemnotsradio.com/"></meta>
        <meta property="fb:app_id" content="617494228985895"></meta>
        <title> Bohemnots Radio &FilledSmallSquare;&#xFE0E; - Home</title>
      </Head>
      <View>
        {(screen.width < 600 ? textMobile : text).map((t, index) => (
          <P key={index}>
            {t}
            <br />
          </P>
        ))}
      </View>
      <BuyButton>
        <a href="javascript:void()" className="disabled">
          <Image
            src="/ticket-soon.png"
            alt={"Ticket Soon"}
            width="250"
            height="95"
          />
        </a>
      </BuyButton>
    </FestLayout>
  );
}

const text = [
  `TmbaTa Orchestra . Sona Yengibaryan . Kay Khachatryan . Mar Margaryan . Lucy Khanyan collective`,
  `mveq . OOBX . Ben Wheeler . Anna Vahrami . symptom . Tsomak . Olle Holmberg . Vanane`,
  `Auratoric . teenage error . Scott McCulloch . shiz . M A R G R E T . Vazgen . NODE . Mila . Is . cast coverts . Liqers`,
  `VHSound collective . Rozen Tal . Hov . La Koté . Jrimurmur`,
  `Eko & Vinda Folio`,
  `KamavoSian . Pupylike . s<3vu . Chemical Wedding . Tøtal . holly ƒ . Dave N.A.`,
  `missteikk . Kogeno . YOSSARIAN . Merouj . otar . Taya . sardaryans . ÉLÉKTRA . inky . Lexs Plath`,
  `长amunts . Ru Bee . Dav . Joseph Zakarian . GFRND`,
];

const textMobile = [
  `TmbaTa Orchestra`,
  `Sona Yengibaryan . Kay Khachatryan`,
  `Mar Margaryan`,
  `Lucy Khanyan collective`,
  `mveq . OOBX . Ben Wheeler`,
  `Anna Vahrami . symptom . Tsomak`,
  `Olle Holmberg . La Koté . teenage error`,
  `Scott McCulloch`,
  `M A R G R E T`,
  `Vazgen . NODE . Mila . Is . cast coverts`,
  `Liqers . Vanane . shiz`,
  `VHSound collective`,
  `Rozen Tal . Hov . Auratoric `,
  `Jrimurmur`,
  `Eko & Vinda Folio`,
  `KamavoSian . Pupylike . s<3vu`,
  `Chemical Wedding`,
  `Tøtal . holly ƒ . Dave N.A.`,
  `missteikk . Kogeno . Merouj`,
  `YOSSARIAN`,
  `Dav . otar . Taya . sardaryans . inky`,
  `ÉLÉKTRA `,
  `Lexs Plath . 长amunts . Ru Bee`,
  `Joseph Zakarian`,
  `GFRND`,
];

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { FestLayout } from "../components/Layout";
import { useAppContext } from "../context";

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
  cursor: pointer;

  & .disabled img {
    filter: grayscale(100%);
  }

  a {
    border-radius: 16px;
    text-decoration: none;
  }

  img {
    width: 250px;
  }
`;

export default function FestDesc(props) {
  return (
    <FestLayout className={props.className}>
      <Head>
        <meta
          name="description"
          content="From September 23 to 27, at the Creative House of Composers' Union after Edward Mirzoyan in Dilijan"
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
          content="From September 23 to 27, at the Creative House of Composers' Union after Edward Mirzoyan in Dilijan"
        ></meta>
        <meta property="og:type" content="music.radio_station"></meta>
        <meta
          property="og:url"
          content="https://bohemnotsradio.com/fest"
        ></meta>
        <meta property="fb:app_id" content="617494228985895"></meta>
        <title>Bohemnots Radio</title>
      </Head>
      <View>
        {typeof screen === "object" &&
          (screen.width < 600 ? textMobile : text).map((t, index) => (
            <P key={index}>
              {t}
              <br />
            </P>
          ))}
      </View>
      <BuyButton>
        <Link href="/buy" passHref>
          <Image
            src="/buy-ticket.png"
            alt={"Ticket Soon"}
            width="250"
            height="95"
          />
        </Link>
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
  `missteikk . Kogeno . YOSSARIAN . Merouj . otar . Taya . sardaryans . ÉLÉKTRA . inky . Lex Palth`,
  `长amunts . Ru Bee . DAV . Joseph Zakarian . GFRND`,
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
  `DAV . otar . Taya . sardaryans . inky`,
  `ÉLÉKTRA `,
  `Lex Palth . 长amunts . Ru Bee`,
  `Joseph Zakarian`,
  `GFRND`,
];

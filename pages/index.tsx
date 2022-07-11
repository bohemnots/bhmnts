import { Howl } from "howler";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Footer from "../components/Footer";
import { Player, PlayerMeta } from "../components/Player";
import { Loading, Pause, Play } from "../components/svg";
import { Text1, Text2 } from "../components/Text";
import { HOST_URL } from "../config";
import { METADATA, useLiveInfo } from "../context";

export async function getServerSideProps() {
  const response = await fetch(`${HOST_URL}${METADATA.URL}`);
  const meta = await response.json();
  return {
    props: {
      meta: meta || {},
    },
  };
}

export default function PlayerPage(props) {
  const { meta } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [art, setArt] = React.useState(null);
  const { info } = useLiveInfo();

  const updateBackground = useCallback((imgUrl) => {
    const body = document?.getElementsByTagName("body")[0];
    if (!body) {
      return;
    }
    const newUrl = imgUrl ? `url("${imgUrl}")` : "";
    if (newUrl && body.style.backgroundImage !== newUrl) {
      body.style.backgroundImage = newUrl;
    } else if (!imgUrl) {
      body.style.backgroundImage = "";
    }
  }, []);

  useEffect(() => {
    if (meta && meta.imgUrl !== art) {
      setArt(meta.imgUrl);
      updateBackground(meta.imgUrl);
    }
  }, [setArt, meta, updateBackground, art]);

  const t1 = meta ? meta.text1 || info?.tracks?.current?.name : "";
  const t2 = meta ? meta.text2 : "";

  const link = meta ? meta.link : "";
  const linkTitle = meta ? meta.linkTitle : "";
  const linkColor = meta ? meta.linkColor : "";
  const linkBackground = meta ? meta.linkBackground : "";

  const t1Color = meta.t1Color || "";
  const t1Background = meta.t1Background || "";
  const t2Color = meta.t2Color || "";
  const t2Background = meta.t2Background || "";
  const actionColor = meta.actionColor || "none"; // to hide icon until color available
  const size = parseFloat(meta.size || "10"); // to hide icon until color available

  const audio = useMemo(() => {
    return new Howl({
      src: meta.streamUrl,
      html5: true,
      autoplay: true,
    });
  }, [meta.streamUrl]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      // eslint-disable-next-line
      // @ts-ignore
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t1,
        artwork: [
          {
            src: "https://bohemnotsradio.com/favicon.ico",
            type: "image/x-icon",
          },
        ],
      });
    }
  }, [t1]);

  useEffect(() => {
    audio.on("stop", () => {
      setIsLoading(false);
      setIsPlaying(false);
    });
    audio.on("loaderror", () => {
      setIsLoading(false);
    });
    audio.on("playerror", () => {
      setIsLoading(false);
    });
    audio.on("play", () => {
      setIsLoading(false);
      setIsPlaying(true);
    });

    return () => audio.off();
  }, [audio]);

  const play = () => {
    setIsLoading(true);
    audio.play();
  };
  const pause = () => {
    audio.stop();
  };

  return (
    <>
      <Player>
        <Head>
          <meta
            name="description"
            content="Bohemnots Radio is an online independent radio station, based in Yerevan, Armenia: broadcast, podcast, radio shows, live events and 24 hour mixed music."
          ></meta>
          <meta property="og:title" content="Bohemnots Radio ◼︎"></meta>
          <meta
            property="og:image"
            content={
              meta.imgUrl || "https://bohemnotsradio.com/images/og-image.jpg"
            }
          ></meta>
          <meta
            property="og:image:secure_url"
            content={
              meta.imgUrl || "https://bohemnotsradio.com/images/og-image.jpg"
            }
          ></meta>
          <meta property="og:image:width" content="300"></meta>
          <meta
            property="og:description"
            content="Bohemnots Radio is an online independent radio station, based in Yerevan, Armenia: broadcast, podcast, radio shows, live events and 24 hour mixed music."
            key="desciription"
          ></meta>
          <meta property="og:type" content="music.radio_station"></meta>
          <meta property="og:url" content="https://bohemnotsradio.com/"></meta>
          <meta property="fb:app_id" content="617494228985895"></meta>
          <meta property="fb:og:updated_time" content={meta.updatedAt}></meta>
          <title>Bohemnots Radio</title>
        </Head>
        <div
          className="icon"
          style={{ width: `${size}rem`, height: `${size / 2}rem` }}
          onClick={isPlaying ? pause : play}
        >
          {isLoading ? (
            <Loading color={actionColor} />
          ) : isPlaying ? (
            <Pause style={{}} color={actionColor} />
          ) : (
            <Play style={{}} color={actionColor} />
          )}
        </div>
        <PlayerMeta>
          <Text1 style={{ color: t1Color, backgroundColor: t1Background }}>
            <div className="m m1">{t1}</div>
          </Text1>
          <Text2 style={{ color: t2Color, backgroundColor: t2Background }}>
            <div>{t2}</div>
          </Text2>
          {link ? (
            <Text2>
              <a
                style={{
                  color: linkColor,
                  backgroundColor: linkBackground || "transparent",
                }}
                target="_blank"
                rel="noopener noreferrer"
                href={link}
              >
                {linkTitle || link}
              </a>
            </Text2>
          ) : null}
        </PlayerMeta>
      </Player>
      <Footer />
    </>
  );
}

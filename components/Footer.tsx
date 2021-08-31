import {
  faFacebookF,
  faInstagram,
  faSoundcloud,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const rel = "noopener noreferrer";
const target = "_blank";

const fb = "https://www.facebook.com/bohemnotsradio/";
const ig = "https://www.instagram.com/bohemnotsradio/";
const tw = "https://twitter.com/bohemnotsradio";
const sc = "https://soundcloud.com/bohemnotsradio";
const pt = "https://www.patreon.com/bohemnotsradio";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 0 0 auto;
  text-align: right;

  .donate {
    vertical-align: sub;
    padding-right: 20px;
  }

  & ul {
    padding: 0;
    margin: 0;
  }

  & li {
    display: inline-block;
    font-size: 24px;
    padding: 10px;
  }

  & i {
    color: #fff;
  }

  .dark & {
    color: #000;
  }

  .light & {
    color: #fff;
  }
`;

export default function Footer() {
  return (
    <Nav>
      <ul>
        <li style={{ display: "none" }}>
          <a className={"donate"} href={pt} target={target} rel={rel}>
            <Image
              src="/images/donate.svg"
              width="60"
              height="60"
              alt="donate"
            />
          </a>
        </li>
        <li>
          <a href={fb} target={target} rel={rel}>
            <FontAwesomeIcon icon={faFacebookF} color="#fff"></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href={ig} target={target} rel={rel}>
            <FontAwesomeIcon icon={faInstagram} color="#fff"></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href={tw} target={target} rel={rel}>
            <FontAwesomeIcon icon={faTwitter} color="#fff"></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href={sc} target={target} rel={rel}>
            <FontAwesomeIcon icon={faSoundcloud} color="#fff"></FontAwesomeIcon>
          </a>
        </li>
      </ul>
    </Nav>
  );
}

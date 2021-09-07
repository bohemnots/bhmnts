import React from "react";
import styled from "styled-components";

import { FestLayout } from "../components/Layout";
import { useAppContext } from "../context";

const P = styled.p`
  font-size: 14px;
`;

const About = (props) => {
  const ctx = useAppContext();

  return (
    <FestLayout className={props.className}>
      <P>
        Բոհեմնոց ռադիոն օնլայն, անկախ ռադիոկայան է՝ հիմնված Երևանում, 2019
        թ․-ին։ Ռադիոկայանը իր գործունեությունը ծավալում է բացառապես
        նվիրատվությունների և միջոցառումներից ստացված հասույթի միջոցով, անկախ
        մնալով ցանկացած հովանավորչական կազմակերպություններից: Ռադիոյի ձևաչափերն
        են․ ուղիղ եթերներ, փոդքասթներ, ռադիո շոուներ, լայվ միջոցառումներ։
        <br />
        <br />
        <br />
        Bohemnots radio is an online, independent radio station, based in
        Yerevan, in 2019. The radio station operates exclusively through
        proceeds from donations and events, independent of any sponsoring
        organizations. Radio formats are live broadcasts, podcasts, radio shows,
        live events.
      </P>
    </FestLayout>
  );
};

export default About;

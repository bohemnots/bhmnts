/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

const purpleColor = "#8800ff";
const P = styled.p`
  font-size: 1.6em;
  color: ${purpleColor};
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

const Price = (props) => {
  // const [, setIsLoading] = useState(false);

  return (
    <Container>
      <CenteredWrapper className={props.className}>
        <div>
          <Heading>
            Composers&apos; Union Dilijan <br />
            SEPTEMBER 2-3
          </Heading>
          <P style={{ marginBottom: "5px", fontSize: "1.3em" }}>
            TICKET 5000amd + FREE BUS <br />
            buy online from{" > "}
            <a
              style={{ color: purpleColor }}
              href="https://ticketon.am/events/fairytaleiscalling"
              target="_blank"
              rel="noopener noreferrer"
            >
              ticketon.am
            </a>
            <br />
            {/* or book here */}
          </P>
          <br />
        </div>

        <div>
          <div style={{ width: "200px" }}>
            <img
              style={{ width: "100%" }}
              src="/images/karnaval-icons.png"
              alt=""
            />
          </div>
          <P style={{ marginBottom: "5px", fontSize: "1em" }}>
            zapisnots@gmail.com
          </P>
        </div>
      </CenteredWrapper>
    </Container>
  );
};

export default Price;

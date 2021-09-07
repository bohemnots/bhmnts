import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { HeaderItem } from "../../components/Layout";
import { useAppContext } from "../../context";
import { ICheckout } from "../../mongo";

const Container = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  min-height: 100vh;
`;

const View = styled.div`
  max-width: 500px;
  margin: auto;

  @media only screen and (max-width: 600px) {
    max-width: unset;
    margin: 12px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 11pt;
`;

const Link = styled.a`
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
  color: white;
  margin-bottom: 20px;
`;

const Info = styled.div`
  color: white;
`;

const Red = styled.div`
  color: red;
`;

const Green = styled.div`
  color: green;
`;

const Photo = styled.img`
  max-width: 100%;
  height: 80vh;
  object-fit: contain;
`;

export default function Ticket(props) {
  const router = useRouter();
  const { checkoutId } = router.query || {};
  const [checkout, setCheckout] = useState<ICheckout | null>(null);
  const ctx = useAppContext();

  useEffect(() => {
    if (!checkoutId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/checkouts/${checkoutId}`, {
        // @ts-ignore
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      const data = await response.json();
      setCheckout(data.data);
    })();
  }, [checkoutId]);

  const status = useMemo(() => {
    if (!checkout) {
      return "";
    }
    if (checkout.status === "success") {
      return <Pending checkout={checkout} />;
    }
    if (checkout.status === "approved") {
      return <Approved checkout={checkout} />;
    }
    if (checkout.status === "rejected") {
      return <Rejected />;
    }
    return <Failed />;
  }, [checkout]);

  if (!checkout) {
    return null;
  }

  return (
    <Container className={props.className}>
      <input id="myInput" hidden></input>
      <Header>
        <HeaderItem>
          <Link onClick={() => ctx.setLang("hy")}>HY</Link> /{" "}
          <Link onClick={() => ctx.setLang("en")}>EN</Link>
        </HeaderItem>
        <HeaderItem>
          <Link href="/">GO TO RADIO</Link>
        </HeaderItem>
      </Header>
      <View>
        {status}
        <Info>{`Name: ${checkout.name}`}</Info>
        <Info>{`Surname: ${checkout.surname}`}</Info>
        <Info>{`Email: ${checkout.email}`}</Info>
        <Photo
          src={`https://fra1.digitaloceanspaces.com/bohemnots/checkouts/${checkout._id}/photo.jpg`}
        />
      </View>
    </Container>
  );
}

interface IStatusProps {
  checkout?: ICheckout;
}

const Pending: React.FC<IStatusProps> = ({ checkout }) => (
  <Title>
    {`Your payment verified. We will review your request and send you an email to "${checkout?.email}".`}
  </Title>
);

const Approved: React.FC<IStatusProps> = () => (
  <Title>
    <Green>{`Your request have been approved, please check you email for QR code`}</Green>
  </Title>
);

const Rejected: React.FC<IStatusProps> = () => (
  <Title>
    <Red>{`Your request have been rejected`}</Red>
  </Title>
);

const Failed: React.FC<IStatusProps> = () => (
  <>
    <Title>
      <Red>
        {`Failed to verify your payment. Please check you balance or contact
  us for more details.`}
      </Red>
      <div>
        <a href="mailto:bohemnotsradio@gmail.com">bohemnotsradio@gmail.com</a>
      </div>
      <div>
        <a href="tel:+37493055838">+37493055838</a>
      </div>
    </Title>
  </>
);

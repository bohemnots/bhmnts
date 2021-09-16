import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { HeaderItem } from "../../../components/Layout";
import { useAppContext } from "../../../context";
import { ICheckout } from "../../../mongo";

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

const InfoLine = styled.div`
  color: white;
`;

const Photo = styled.img`
  margin: auto;
  max-height: 60vh;
  max-width: 100vw;
  object-fit: contain;
`;

const Input = styled.input`
  &[type="text"] {
    width: 100%;
  }
`;

export const CheckoutReview = (props) => {
  const route = useRouter();
  const { checkoutId } = route.query || {};
  const [checkout, setCheckout] = useState<ICheckout | null>(null);
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const ctx = useAppContext();

  useEffect(() => {
    (async () => {
      if (!checkoutId) {
        return;
      }
      const response = await fetch(`/api/checkouts/${checkoutId}`, {
        // @ts-ignore
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      const data = await response.json();
      setCheckout(data.data);
    })();
  }, [checkoutId]);

  const update = useCallback(
    async (status) => {
      if (!checkout) {
        throw new Error(`checkout is missing`);
      }
      const response = await fetch(`/api/checkouts/${checkout._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, password, notes }),
      });
      if (response.status === 200) {
        location.href = `/tickets/${checkout._id}`;
      } else {
        const feed = await response.json();
        const msg = feed.message || feed;
        const str = typeof msg === "string" ? msg : JSON.stringify(msg);
        if (msg) {
          alert(str);
        }
      }
      location.reload();
    },
    [checkout, password, notes]
  );

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
        <InfoLine>{`Email: ${checkout.email}`}</InfoLine>
        <InfoLine>{`Name: ${checkout.name}`}</InfoLine>
        <InfoLine>{`Surname: ${checkout.surname}`}</InfoLine>
        <InfoLine>{`Status: ${checkout.status}`}</InfoLine>
        <Photo
          src={`https://fra1.digitaloceanspaces.com/bohemnots/checkouts/${checkout._id}/photo.jpg`}
        />
        <div>
          <textarea
            placeholder="Notes to add in the email, for example rejection reason"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {checkout.status === "success" ? (
            <>
              <button onClick={() => update("approved")}>Approve</button>
              <button onClick={() => update("rejected")}>Reject</button>
            </>
          ) : null}
          {checkout.status === "approved" ? (
            <button onClick={() => update("refunded")}>Refund</button>
          ) : null}
        </div>
      </View>
    </Container>
  );
};

export default CheckoutReview;

import { FestLayout } from "components/Layout";
import { ICheckout } from "mongo";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const View = styled.div`
  max-width: 500px;
  margin: auto;

  @media only screen and (max-width: 600px) {
    max-width: unset;
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

export const CheckoutReview = (props) => {
  const session = useSession({ required: false });
  const route = useRouter();
  const { checkoutId } = route.query || {};
  const [checkout, setCheckout] = useState<ICheckout | null>(null);
  const [notes, setNotes] = useState("");

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
        body: JSON.stringify({ status, notes }),
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
    [checkout, notes]
  );

  if (!checkout) {
    return null;
  }

  return (
    <FestLayout showSignIn className={props.className}>
      {session.data?.user ? (
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
      ) : null}
    </FestLayout>
  );
};

export default CheckoutReview;

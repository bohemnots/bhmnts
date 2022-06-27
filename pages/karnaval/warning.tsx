import Link from "next/dist/client/link";
import React from "react";
import styled from "styled-components";

const linkStyle = { color: 'white' }

const P = styled.p`
  font-size: 14px;
  color: purple;
`;
const CenteredWrapper = styled.div`
    max-width:500px;
    margin:0 auto;
    display:grid;
    place-items:center;
`

const NextPageLink = () => {
    return (
        <Link href="registration"><span style={linkStyle}>NEXT</span></Link>
    )
}
const Warning = (props) => {
    return (
        <CenteredWrapper className={props.className}>
            <h1>WARNING</h1><br /><br />
            <P>If the dress code is not passed, the ticket is non-refundable,<br />
                The ticket includes Yerevan - Dilijan and vice versa, several times a day.
            </P><br /><br />
            <NextPageLink />
        </CenteredWrapper>
    );
};

export default Warning;

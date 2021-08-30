import styled from "styled-components";

const Text = styled.div`
  overflow: hidden;
  width: 250px;
  text-align: center;
`;

export const Text1 = styled(Text)`
  font-size: 20px;
  font-weight: bold;

  .dark & {
    background-color: #000;
    color: #fff;
  }

  .light & {
    background-color: #fff;
    color: #000;
  }
`;

export const Text2 = styled(Text)`
  font-size: 16px;
  font-weight: bold;

  .dark & {
    color: #000;
  }

  .light & {
    color: #fff;
  }
`;

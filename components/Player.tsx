import styled from "styled-components";

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & {
    width: 10rem;
    height: 5rem;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 10px auto;
  }

  .m {
    white-space: nowrap;
    position: relative;
  }

  .m1 {
    -moz-animation: marquee 10s linear infinite;
    -webkit-animation: marquee 10s linear infinite;
    animation: marquee 10s linear infinite;
  }

  .m2 {
    -moz-animation: marquee 10s linear reverse infinite;
    -webkit-animation: marquee 10s linear reverse infinite;
    animation: marquee 10s linear reverse infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export const PlayerMeta = styled.div`
  align-self: center;
`;

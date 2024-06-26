import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000021;
  z-index: 3;
`;

export const LoaderSpinnerWrapper = styled.div`
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoaderSpinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

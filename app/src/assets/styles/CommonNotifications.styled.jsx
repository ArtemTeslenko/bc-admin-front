import styled from "styled-components";

export const NotificationDanger = styled.span`
  position: fixed;
  display: block;
  bottom: 40px;
  right: 40px;
  padding: 20px 30px;
  font-size: 28px;
  font-weight: 500;
  background-color: #9e3c32;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.75);
  animation: zoom 1s alternate infinite ease-in-out;
  z-index: 3;

  @keyframes zoom {
    100% {
      transform: scale(1.1);
    }
  }
`;

export const NotificationSuccess = styled.span`
  position: fixed;
  display: block;
  bottom: 40px;
  right: 40px;
  padding: 20px 30px;
  font-size: 28px;
  font-weight: 500;
  background-color: #3b9e32;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.75);
  animation: zoom 1s alternate infinite ease-in-out;
  z-index: 3;

  @keyframes zoom {
    100% {
      transform: scale(1.1);
    }
  }
`;

import styled from "styled-components";

export const PdfWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export const InputResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 1fr;
  gap: 10px;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const InputResultInfo = styled.p`
  font-size: 16px;
`;

export const InputResultAttantion = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #9e3c32;
`;

// export const NotificationDanger = styled.span`
//   position: fixed;
//   display: block;
//   bottom: 40px;
//   right: 40px;
//   padding: 20px 30px;
//   font-size: 28px;
//   font-weight: 500;
//   background-color: #9e3c32;
//   color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.75);
//   animation: zoom 1s alternate infinite ease-in-out;
//   z-index: 3;

//   @keyframes zoom {
//     100% {
//       transform: scale(1.1);
//     }
//   }
// `;

// export const NotificationSuccess = styled.span`
//   position: fixed;
//   display: block;
//   bottom: 40px;
//   right: 40px;
//   padding: 20px 30px;
//   font-size: 28px;
//   font-weight: 500;
//   background-color: #3b9e32;
//   color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.75);
//   animation: zoom 1s alternate infinite ease-in-out;
//   z-index: 3;

//   @keyframes zoom {
//     100% {
//       transform: scale(1.1);
//     }
//   }
// `;

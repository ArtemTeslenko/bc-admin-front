import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  align-items: center;
  background-color: #0526DF; 
  width: 1280px;
  height: 1770px; 
  border-radius: 50px;
  }
`;

export const Title = styled.h1 `
box-sizing: border-box;
margin-top: 120px;
margin-botton:50px;
margin-right: 150px;
margin-left: 150px;
font-size: 70px;
font-weight: 400;
line-height: 75px;
text-align: left;
color: #F4F2ED;
`

export const TradeMark = styled.span `
font-size: 70px;
font-weight: 400;
line-height: 75px;
margin-right: 20px;
text-align: left;
color: #F4F2ED;
`

export const ContainerBritish = styled.div `
display: flex;
flex-direction: row;
align-items: center;
width: 970px;
margin-top: 50px;
`

export const BritishLogo = styled.h2 `
font-family: Hofisem;
font-size: 76.8px;
font-weight: 400;
line-height: 117.12px;
text-align: left;
color: #FF6F2E;
`

export const ContainerInfo = styled.div `
width: 970px;
height: 1050px;
background-color: #F4F2ED; 
border-radius: 50px;
margin-top: 25px;
margin-bottom: 50px; 
`

export const ContainerInfoTitle = styled.h3 `
font-family: Museo Sans Cyrl;
font-size: 40px;
font-weight: 700;
line-height: 48px;
color: #FF6F2E;
margin-bottom: 35px;
`

export const SectionInfo = styled.section `
margin-top: 90px;
margin-left: 75px;

&:first-child {
  margin-top: 50px;
}
&:last-child {
  margin-bottom: 50px;
}
`

export const LabelInfo = styled.label `
font-family: Museo Sans Cyrl;
font-size: 23px;
font-weight: 400;
line-height: 33px;
letter-spacing: 0.01em;
color: #0526DF;
`

export const ContainerContacts = styled.div `
width: 970px;
height: 135px;
`

export const ContactUs = styled.h4 `
font-family: Museo Sans Cyrl;
font-size: 40px;
font-weight: 700;
line-height: 48px;
margin-bottom: 15px;
color: #FF6F2E;
`

export const Link = styled.a `
font-family: Museo Sans Cyrl;
font-size: 23px;
font-weight: 700;
line-height: 30px;
letter-spacing: 0.01em;
color: #F4F2ED;
text-decoration: none;
padding-right: 54px;
cursor: pointer;

&:last-child {
  margin-right: 0;
}
`

export const DetailsInfo = styled.h5 `
font-family: Museo Sans Cyrl;
font-size: 11px;
font-weight: 400;
line-height: 75px;
color: #fff;
`
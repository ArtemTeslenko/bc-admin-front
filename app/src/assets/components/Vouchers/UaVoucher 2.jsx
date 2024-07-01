import { BritishLogo, Container, ContainerBritish, ContainerInfo, ContainerInfoTitle, Title, TradeMark, SectionInfo, LabelInfo, ContactUs, ContainerContacts, Link, DetailsInfo, DynamicFieldName, DynamicNumber, EmailText } from "./Voucher.styled"
import logo from "../../images/LogoBritishTransparent.png"


export const UaVoucher = () => {
  return (
    <Container>
      <Title>Путівка на відпочинок та мовний практикум від</Title>
      <ContainerBritish>
        <TradeMark>TM</TradeMark>
        <BritishLogo src={logo} alt="British Camp Logo"></BritishLogo>
        {/* <BritishLogo>British Camp</BritishLogo> */}
      </ContainerBritish>
      <ContainerInfo>
        <SectionInfo>
          <ContainerInfoTitle>Інформація про учасника:</ContainerInfoTitle>
          <div style={{ marginBottom: "15px" }}>
            <LabelInfo htmlFor="name">Прізвище, імя, по-батькові:</LabelInfo>
            <DynamicFieldName id="voucherStudentName">Завєдєєва Дарина Миколаївна</DynamicFieldName>
          </div>
          <div>
            <LabelInfo htmlFor="dateOfBirth">Дата Народження:</LabelInfo>
            <DynamicNumber id="dateOfDay">10</DynamicNumber>
            <DynamicNumber id="dateOfMounth">05</DynamicNumber>
            <DynamicNumber id="dateOfYear">2024</DynamicNumber>
          </div>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Інформація про Замовника:</ContainerInfoTitle>
          <LabelInfo htmlFor="name">Призвіще імя по-батькові:</LabelInfo>
          <DynamicFieldName id="voucherParentName">Завєдєєва Дарина Миколаївна</DynamicFieldName>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Адреса отримання послуг:</ContainerInfoTitle>
          <div style={{ marginBottom: "15px" }}>
            <LabelInfo htmlFor="field">Поле:</LabelInfo>
            <DynamicFieldName id="voucherFieldFirst">Завєдєєва Дарина Миколаївна</DynamicFieldName>
          </div>
          <LabelInfo htmlFor="field">Поле:</LabelInfo>
          <DynamicFieldName id="voucherStudentSecond">Завєдєєва Дарина Миколаївна</DynamicFieldName>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Період надання послуг:</ContainerInfoTitle>
          <div style={{ marginBottom: "35px" }}>
            <LabelInfo htmlFor="text">Дата початку <br />  перебування:</LabelInfo>
            <DynamicNumber id="dateOfStartDay">10</DynamicNumber>
            <DynamicNumber id="dateOfStartMounth">05</DynamicNumber>
            <DynamicNumber id="dateOfStartYear">2024</DynamicNumber>
          </div>
          <div>
            <LabelInfo htmlFor="text">Дата завершення <br /> перебування:</LabelInfo>
            <DynamicNumber id="dateOfFinishDay">10</DynamicNumber>
            <DynamicNumber id="dateOfFinishMounth">05</DynamicNumber>
            <DynamicNumber id="dateOfFinishYear">2024</DynamicNumber>
          </div>
        </SectionInfo>
      </ContainerInfo>
      <ContainerContacts>
        <ContactUs>Контактна інформація:</ContactUs>
        <nav>
          <ul style={{ display: "flex" }}>
            <li>
              <Link href="+38 073 946 7973">Номер телефону: +38 073 946 7973</Link>
            </li>
            <li style={{ display: "flex" }}>
              <EmailText>Email:</EmailText>
              <Link href="mailto:hello@british.camp">hello@british.camp</Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/">INSTAGRAM</Link>
            </li>
          </ul>
        </nav>
        <DetailsInfo>*Путівка набуває чинності після сплати рахунку Замовником</DetailsInfo>
      </ContainerContacts>
    </Container>
  )
}

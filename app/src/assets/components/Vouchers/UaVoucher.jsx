import { BritishLogo, Container, ContainerBritish, ContainerInfo, ContainerInfoTitle, Title, TradeMark, SectionInfo, LabelInfo, ContactUs, ContainerContacts, Link, DetailsInfo } from "./Voucher.styled"


export const UaVoucher = () => {
  return (
    <Container>
      <Title>Путівка на відпочинок та мовний практикум від</Title>
      <ContainerBritish>
        <TradeMark>TM</TradeMark>
        <BritishLogo>British Camp</BritishLogo>
      </ContainerBritish>
      <ContainerInfo>
        <SectionInfo>
          <ContainerInfoTitle>Інформація про учасника:</ContainerInfoTitle>
          <div>
            <LabelInfo htmlFor="name">Прізвище, імя, по-батькові:</LabelInfo>
            <input type="text" placeholder="Призвіще імя по-батькові`"></input>
          </div>
          <div>
            <LabelInfo htmlFor="dateOfBirth">Дата Народження:</LabelInfo>
            <input type="date"></input>
          </div>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Інформація про Замовника:</ContainerInfoTitle>
          <LabelInfo htmlFor="name">Призвіще імя по-батькові:</LabelInfo>
            <input type="text" placeholder="Призвіще імя по-батькові`"></input>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Адреса отримання послуг:</ContainerInfoTitle>
          <div>
          <LabelInfo htmlFor="field">Поле</LabelInfo>
            <input type="text" placeholder="Поле"></input>
          </div>
            <LabelInfo htmlFor="field">Поле</LabelInfo>
            <input type="text" placeholder="Поле"></input>
        </SectionInfo>
        <SectionInfo>
          <ContainerInfoTitle>Період надання послуг:</ContainerInfoTitle>
          <div>
            <LabelInfo htmlFor="text">Дата початку <br/>  перебування:</LabelInfo>
            <input type="date"></input>
          </div>
          <div>
          <LabelInfo htmlFor="text">Дата завершення <br/> перебування:</LabelInfo>
            <input type="date"></input>
          </div>
        </SectionInfo>
      </ContainerInfo>
      <ContainerContacts>
        <ContactUs>Контактна інформація:</ContactUs>
        <nav>
          <ul style={{display:"flex"}}>
            <li>
              <Link href="+38 073 946 7973">Номер телефону: +38 073 946 7973</Link>
            </li>
            <li>
            <Link href="mailto:hello@british.camp">Email:hello@british.camp</Link>
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

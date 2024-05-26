export const Student = ({ student }) => {
  const {
    _id,
    name,
    surname,
    middlename,
    client,
    paymentAgreement,
    comment,
    service,
  } = student;

  return (
    <>
      <p>{_id}</p>
      <p>{name}</p>
      <p>{surname}</p>
      <p>{middlename}</p>
      <p>{client.gender}</p>
      <p>{client.dateOfBirth}</p>
      <p>{client.studentStatus}</p>
      <p>{client.manager}</p>
      <p>{paymentAgreement.firstPaymentDate}</p>
      <p>{paymentAgreement.sale}</p>
      <p>{comment}</p>
      <p>{service.manager}</p>
      <p>{service.accommodationComent}</p>
      <p>{service.passport}</p>
    </>
  );
};

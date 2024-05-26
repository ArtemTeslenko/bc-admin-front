export const User = ({ user }) => {
  const { _id, name, email } = user;

  return (
    <>
      {user && (
        <>
          <p>{_id}</p>
          <p>{name}</p>
          <p>{email}</p>
        </>
      )}
    </>
  );
};

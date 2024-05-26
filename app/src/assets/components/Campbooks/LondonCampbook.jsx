export const LondonCampbook = (props) => {
  return (
    <div style={{ backgroundColor: "green", padding: "20px" }}>
      <div style={{ fontSize: "30px", marginBottom: "10px" }}>British Camp</div>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>Camp Book</div>
      <div style={{ float: "right" }}>03.01 - 09.01</div>
      <img
        src="https://www.akc.org/wp-content/uploads/2017/08/dog_nose_dry_hero-800x576.jpg"
        alt="nose"
      />
      <div style={{ display: "flex" }}>
        <div>
          <div>Mountain location</div>
          <div>{props.name}</div>
          <div>Group</div>
        </div>
        <div>
          <div>link</div>
          <div>link</div>
          <div>link</div>
        </div>
      </div>
    </div>
  );
};

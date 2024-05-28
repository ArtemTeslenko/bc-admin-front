import image from "../../images/dog_nose_dry_hero-800x576.webp";

export const LondonCampbook = (props) => {
  return (
    <div style={{ backgroundColor: "green", padding: "20px" }}>
      <div style={{ fontSize: "30px", marginBottom: "10px" }}>British Camp</div>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>Camp Book</div>
      <div style={{ float: "right" }}>03.01 - 09.01</div>
      <img src={image} alt="nose" />
      <div style={{ display: "flex" }}>
        <div>
          <div>Mountain location</div>
          <div>{props.name}</div>
          <div>Group</div>
        </div>
        <div>
          <div>link 1</div>
          <div>link 2</div>
          <div>link 3</div>
        </div>
      </div>
    </div>
  );
};

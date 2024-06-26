export const LondonVoucher = (props) => {
  return (
    <div style={{ backgroundColor: "#b6f9ee", padding: "20px" }}>
      <div style={{ fontSize: "30px", marginBottom: "20px" }}>British Camp</div>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>Voucher</div>
      <div style={{ float: "right" }}>03.01 - 09.01</div>
      {/* <img src={image} alt="nose" /> */}
      <div style={{ display: "flex" }}>
        <div>
          <div>Mountain location</div>
          <div>{props.name}</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              id="firstImageContainer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                overflow: "hidden",
                width: "300px",
                height: "300px",
              }}
            ></div>
            <div
              id="secondImageContainer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                overflow: "hidden",
                width: "300px",
                height: "300px",
              }}
            ></div>
          </div>

          <div>Group</div>
        </div>
        <div>
          <div>qwe</div>
          <div>asd</div>
          <div>zxc</div>
          <div>123</div>
        </div>
      </div>
    </div>
  );
};

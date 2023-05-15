import React from "react";
import Pin from "../../components/Pin/Pin";
function Linhas() {
  return (
    <div style={styles.pin_container}>
      {" "}
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
      <Pin size="medium" />
      <Pin size="large" />
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 360px)",
    gridAutoRows: "10px",
    justifyContent: 'center',
  },
};

export default Linhas;

import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die_face" style={styles} onClick={props.holdDice}>
      <p className="die_number">{props.value}</p>
    </div>
  );
}

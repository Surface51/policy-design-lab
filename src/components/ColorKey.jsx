import React from "react";
import { scaleQuantize } from "d3-scale";

const ColorKey = ({ domain, range, width, height, title }) => {
  // Create a quantize scale with the specified domain and range
  const colorScale = scaleQuantize().domain(domain).range(range);

  // Generate color boxes
  const colorBoxes = range.map((val, index) => (
    <div
      key={index}
      style={{
        backgroundColor: val.hex,
        width: "100%",
        height: `${height}px`,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 5px",
        color: val.fontColor,
      }}
      className="color-box"
    >
      {val.label}
    </div>
  ));

  // Add an undefined color (grey)
  colorBoxes.push(
    <div
      key="undefined"
      style={{
        backgroundColor: "grey",
        width: "100%",
        height: `${height}px`,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 5px",
      }}
      className="color-box"
    >
      Undefined
    </div>
  );

  return (
    <div className="color-key-container">
      <div className="color-key-title">{title}</div>
      <div className="color-key" style={{ width: `120px` }}>
        {colorBoxes}
      </div>
    </div>
  );
};

// Default Props
ColorKey.defaultProps = {
  domain: [0, 100],
  range: [
    { hex: "#D9ED92", label: "$0 - $10", fontColor: "inherit" },
    { hex: "#B5E48C", label: "$10 - $20", fontColor: "inherit" },
    { hex: "#99D98C", label: "$20 - $30", fontColor: "inherit" },
    { hex: "#76C893", label: "$30 - $40", fontColor: "inherit" },
    { hex: "#52B69A", label: "$40 - $50", fontColor: "inherit" },
    { hex: "#34A0A4", label: "$50 - $60", fontColor: "inherit" },
    { hex: "#168AAD", label: "$60 - $70", fontColor: "inherit" },
    { hex: "#1A759F", label: "$70 - $80", fontColor: "#FFF" },
    { hex: "#1E6091", label: "$80 - $90", fontColor: "#FFF" },
    { hex: "#184E77", label: "$90 - $100", fontColor: "#FFF" },
  ],
  width: 150,
  height: 30,
};

export default ColorKey;

import { memo } from "react";
import { Geography } from "react-simple-maps";

const State = ({ stateGeoData }) => {
  return (
    <Geography
      key={stateGeoData.rsmKey}
      geography={stateGeoData}
      className="state"
      style={{
        default: {
          fill: "transparent",
          stroke: "#000",
          strokeWidth: 0.75,
          outline: "none",
        },
        hover: {
          fill: "#000",
          fillOpacity: 0.2,
          stroke: "#000",
          strokeWidth: 0.75,
          outline: "none",
        },
        pressed: {
          fill: "#000",
          outline: "none",
        },
      }}
    />
  );
};

export default memo(State);

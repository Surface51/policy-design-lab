import { memo } from "react";
import { Geography } from "react-simple-maps";

const stateOptions = [
  { label: "All States", value: "all" },
  { label: "Alabama", value: "AL" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
  { label: "Louisiana", value: "LA" },
  { label: "Rhode Island", value: "RI" },
  { label: "Alaska", value: "AK" },
];

const State = ({ stateGeoData, setState }) => {
  return (
    <Geography
      key={stateGeoData.rsmKey}
      geography={stateGeoData}
      className="state"
      onClick={() => {
        const found_state = stateOptions.find((s) => s.label === stateGeoData.properties.name);
        setState(found_state.value);
      }}
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

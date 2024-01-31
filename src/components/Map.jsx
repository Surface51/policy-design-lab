import { useEffect, useState } from "react";
import MapControls from "./MapControls";
import MapDisplay from "./MapDisplay";
import ReactToolTip from "react-tooltip";

const Map = ({ setCropImageName }) => {
  const [year, setYear] = useState(2014);
  const [cropTypes, setCropTypes] = useState([]);
  const [crop, setCrop] = useState("");
  const [stateTypes, setStateTypes] = useState([]);
  const [state, setState] = useState("all");
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <section className="map-container container">
      <MapControls
        crop={crop}
        cropTypes={cropTypes}
        setCrop={setCrop}
        setState={setState}
        setYear={setYear}
        state={state}
        stateTypes={stateTypes}
        setCropImageName={setCropImageName}
        year={year}
      />
      <hr />
      <MapDisplay
        crop={crop}
        setStateTypes={setStateTypes}
        setCropTypes={setCropTypes}
        state={state}
        setState={setState}
        year={year}
        setTooltipContent={setTooltipContent}
      />
      <ReactToolTip>{tooltipContent}</ReactToolTip>
      <hr />
    </section>
  );
};

export default Map;

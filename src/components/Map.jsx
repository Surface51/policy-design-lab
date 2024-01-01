import { useState } from "react";
import MapControls from "./MapControls";
import MapDisplay from "./MapDisplay";
const Map = () => {
  const [year, setYear] = useState(2014);
  const [cropTypes, setCropTypes] = useState([]);
  const [crop, setCrop] = useState("");
  const [stateTypes, setStateTypes] = useState([]);
  const [state, setState] = useState("");

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
        year={year}
      />
      <hr />
      <MapDisplay
        crop={crop}
        setStateTypes={setStateTypes}
        setCropTypes={setCropTypes}
        state={state}
        year={year}
      />
      <hr />
    </section>
  );
};

export default Map;

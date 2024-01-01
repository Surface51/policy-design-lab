import { useEffect, useState } from "react";
import MapControls from "./MapControls";
import MapDisplay from "./MapDisplay";
const Map = () => {
  const [year, setYear] = useState(2014);

  return (
    <section className="map-container container">
      <MapControls year={year} setYear={setYear} />
      <hr />
      <MapDisplay year={year} />
      <hr />
    </section>
  );
};

export default Map;

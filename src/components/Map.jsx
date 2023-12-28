import MapControls from "./MapControls";
import MapDisplay from "./MapDisplay";
const Map = () => {
  return (
    <section className="map-container container">
      <MapControls />
      <hr />
      <MapDisplay />
      <hr />
    </section>
  );
};

export default Map;

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "react-dropdown-select";

const MapControls = () => {
  const options = [
    { value: 1, label: "one" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
  ];
  const defaultOption = options[0];
  return (
    <div className="controls-container">
      <div className="input-group">
        <div className="input-label">YEAR: 2014</div>
        <Slider></Slider>
      </div>
      <div className="input-group">
        <div className="input-label">STATE</div>
        <Select options={options} value={defaultOption} />
      </div>
      <div className="input-group">
        <div className="input-label">CROP TYPE</div>
        <Select options={options} value={defaultOption} />
      </div>
    </div>
  );
};

export default MapControls;

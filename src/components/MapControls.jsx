import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "react-dropdown-select";

const MapControls = ({
  crop,
  cropTypes,
  setCrop,
  setState,
  setYear,
  state,
  stateTypes,
  year,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const cropOptions = [
    { value: "corn", label: "Corn" },
    { value: "soybeans", label: "Soybeans" },
  ];

  const tempStateOptions = [
    { value: "IL", label: "Illinois" },
    { value: "IA", label: "Iowa" },
  ];

  const marks = {
    2014: "2014",
    2015: "2015",
    2016: "2016",
    2017: "2017",
    2018: "2018",
    2019: "2019",
    2020: "2020",
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setYear((prevYear) => {
          if (prevYear >= 2020) {
            // Stop playing when the slider reaches its end value
            setIsPlaying(false);
            return prevYear;
          } else {
            return prevYear + 1;
          }
        });
      }, 1200);

      // Clear the interval when the component is unmounted or when isPlaying becomes false
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="controls-container">
      <div className="input-group play-controls">
        <button
          className="btn-play"
          onClick={() => setIsPlaying(true)}
          disabled={isPlaying}
        >
          <div className="sr-only">Play</div>
        </button>
        <button
          className="btn-stop"
          onClick={() => setIsPlaying(false)}
          disabled={!isPlaying}
        >
          <div className="sr-only">Pause</div>
        </button>
      </div>
      <div className="input-group date-selector">
        <div className="input-label">YEAR: 2014</div>
        <Slider
          marks={marks}
          step={null}
          defaultValue={2014}
          min={2014}
          max={2020}
          onChange={(value) => {
            if (!isPlaying) {
              setYear(value);
            }
          }}
          value={year}
        />
      </div>
      <div className="input-group dropdown">
        <div className="input-label">STATE</div>
        <Select options={stateTypes != [] ? stateTypes : tempStateOptions} values={[tempStateOptions[0]]} />
      </div>
      <div className="input-group dropdown">
        <div className="input-label">CROP TYPE</div>
        <Select options={cropOptions} values={[cropOptions[0]]} />
      </div>
    </div>
  );
};

export default MapControls;

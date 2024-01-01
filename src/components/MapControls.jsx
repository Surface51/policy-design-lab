import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "react-dropdown-select";

const MapControls = ({ crop, setCrop, setState, setYear, state, year }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const cropOptions = [
    { label: "Barley", value: "Barley" },
    { label: "Canola", value: "Canola" },
    { label: "Chickpeas_Large", value: "Chickpeas_Large" },
    { label: "Chickpeas_Small", value: "Chickpeas_Small" },
    { label: "Corn", value: "Corn" },
    { label: "Crambe", value: "Crambe" },
    { label: "Dry Peas", value: "Dry Peas" },
    { label: "Flaxseed", value: "Flaxseed" },
    { label: "Grain Sorghum", value: "Grain Sorghum" },
    { label: "Lentils", value: "Lentils" },
    { label: "Mustard Seed", value: "Mustard Seed" },
    { label: "Oats", value: "Oats" },
    { label: "Peanuts", value: "Peanuts" },
    { label: "Rapeseed", value: "Rapeseed" },
    { label: "Rice_Long Grain", value: "Rice_Long Grain" },
    { label: "Rice_Med/Short Grain", value: "Rice_Med/Short Grain" },
    { label: "Rice_Temperate Japonica", value: "Rice_Temperate Japonica" },
    { label: "Safflower", value: "Safflower" },
    { label: "Seed Cotton", value: "Seed Cotton" },
    { label: "Sesame Seed", value: "Sesame Seed" },
    { label: "Soybeans", value: "Soybeans" },
    { label: "Sunflower Seed", value: "Sunflower Seed" },
    { label: "Wheat", value: "Wheat" },
  ];

  const stateOptions = [
    { label: "Alabama", value: "Alabama" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "Alaska", value: "Alaska" },
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
        <Select
          options={stateOptions}
          values={[stateOptions[0]]}
          onChange={(value) => {
            setState(value[0].value);
          }}
        />
      </div>
      <div className="input-group dropdown">
        <div className="input-label">CROP TYPE</div>
        <Select
          options={cropOptions}
          values={[cropOptions[0]]}
          onChange={(value) => {
            setCrop(value[0].value);
          }}
        />
      </div>
    </div>
  );
};

export default MapControls;

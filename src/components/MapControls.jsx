import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "react-dropdown-select";

const MapControls = ({
  crop,
  setCrop,
  setCropImageName,
  setState,
  setYear,
  state,
  year,
  setPaymentType
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const paymentOptions = [
    { label: "ARCCO Payment", value: "arc" },
    { label: "ARCCO Adjusted Payment", value: "adj_arc" },
    { label: "EARCCO Payment", value: "new_arc" },
  ];

  const cropOptions = [
    { label: "Barley", value: "Barley" },
    { label: "Canola", value: "Canola" },
    { label: "Chickpeas Large", value: "Chickpeas_Large" },
    { label: "Chickpeas Small", value: "Chickpeas_Small" },
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
    { label: "Long grain rice", value: "Rice_Long Grain" },
    { label: "Short grain rice", value: "Rice_Med/Short Grain" },
    { label: "Temperate Rice", value: "Rice_Temperate Japonica" },
    { label: "Safflower", value: "Safflower" },
    { label: "Seed Cotton", value: "Seed Cotton" },
    { label: "Sesame Seed", value: "Sesame Seed" },
    { label: "Soybeans", value: "Soybeans" },
    { label: "Sunflower Seed", value: "Sunflower Seed" },
    { label: "Wheat", value: "Wheat" },
  ];

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

  const marks = {
    2014: "2014",
    2015: "2015",
    2016: "2016",
    2017: "2017",
    2018: "2018",
    2019: "2019",
    2020: "2020",
    2021: "2021",
  };

  const intervalTime = 1200;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setYear((prevYear) => {
          if (prevYear >= 2021) {
            // Stop playing when the slider reaches its end value
            setIsPlaying(false);
            return prevYear;
          } else {
            return prevYear + 1;
          }
        });
      }, intervalTime);

      // Clear the interval when the component is unmounted or when isPlaying becomes false
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    setCrop(cropOptions[4].value);
  }, []);

  useEffect(() => {
    setCropImageName(crop);
  }, [crop]);

  return (
    <div className="controls">
      <div className="controls-container top-group">
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
          <div className="input-label">YEAR: {year}</div>
          <Slider
            marks={marks}
            step={null}
            defaultValue={2014}
            min={2014}
            max={2021}
            onChange={(value) => {
              if (!isPlaying) {
                setYear(value);
              }
            }}
            value={year}
          />
        </div>
      </div>
      <div className="controls-container bottom-group">
        <div className="input-group dropdown">
          <div className="input-label">STATE</div>
          <Select
            options={stateOptions}
            values={[
              {
                value: state,
                label: stateOptions.find((s) => s.value === state).label,
              },
            ]}
            onChange={(value) => {
              setState(value[0].value);
            }}
          />
        </div>
        <div className="input-group dropdown">
          <div className="input-label">CROP TYPE</div>
          <Select
            options={cropOptions}
            values={[cropOptions[4]]}
            onChange={(value) => {
              setCrop(value[0].value);
            }}
          />
        </div>
        <div className="input-group dropdown">
          <div className="input-label">PAYMENT TYPE</div>
          <Select
            options={paymentOptions}
            values={[
              {
                value: "arc",
                label: "ARCCO Payment",
              },
            ]}
            onChange={(value) => {
              setPaymentType(value[0].value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapControls;

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "react-dropdown-select";

const MapControls = ({ setYear }) => {
  const cropOptions = [
    { value: "corn", label: "Corn" },
    { value: "soybeans", label: "Soybeans" },
  ];

  const tempStateOptions = [
    { value: "IL", label: "Illinois" },
    { value: "IA", label: "Iowa" },
  ];

  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
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

  return (
    <div className="controls-container">
      <div className="input-group play-controls">
        <button className="btn-play">
          <div className="sr-only">Play</div>
        </button>
        <button className="btn-stop">
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
          onChangeComplete={(value) => setYear(value)}
        />
      </div>
      <div className="input-group dropdown">
        <div className="input-label">STATE</div>
        <Select options={tempStateOptions} values={[tempStateOptions[0]]} />
      </div>
      <div className="input-group dropdown">
        <div className="input-label">CROP TYPE</div>
        <Select options={cropOptions} values={[cropOptions[0]]} />
      </div>
    </div>
  );
};

export default MapControls;

import { useEffect, useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
} from "react-simple-maps";
import { csv, json } from "d3-fetch";
import { geoCentroid } from "d3-geo";

// State data for fetching fips codes
import allStates from "../data/allstates.json";

// Custom components
import County from "./County";
import State from "./State";

const MapDisplay = ({ year, crop, state, setTooltipContent }) => {
  const [data, setData] = useState([]);
  const [stateGeo, setStateGeo] = useState([]);
  const [geo, setGeo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [yearData, setYearData] = useState({});
  const [center, setCenter] = useState([-96, 37.8]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [stateGeoData, setStateGeoData] = useState([]);

  useEffect(() => {
    json("json/counties-10m.json").then((data) => {
      setGeo(data);
      console.log("Geo county data loaded!");
    });
  }, []);

  useEffect(() => {
    json("json/states-10m.json").then((data) => {
      setStateGeo(data);
      console.log("Geo state data loaded!");
    });
  }, []);

  useEffect(() => {
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
    const promises = years.map((year) =>
      csv(`csv/all_${year}.csv`).then((data) => {
        return data;
      })
    );
    Promise.all(promises).then((results) => {
      // Create an object with the year as the key and the data as the value
      results = results.reduce((acc, result, index) => {
        acc[years[index]] = result;
        return acc;
      }, {});

      setYearData({
        ...yearData,
        ...results,
      });

      setData(results[year]);
      setLoaded(true);
      console.log("Yearly data loaded!");
    });
  }, []);

  useEffect(() => {
    // Wait for the data to be fetched
    if (!loaded) return;
    setData(yearData[year]);
  }, [year]);

  useEffect(() => {
    if (!loaded) return;
    if (crop === "") {
      return;
    }
  }, [crop, loaded]);

  useEffect(() => {
    if (!stateGeoData || !state) {
      return;
    }

    if (state === "all") {
      setCenter([-96, 37.8]);
      setZoomLevel(1);
      return;
    }

    const geoID = allStates.find((s) => s.id === state);
    const geo = stateGeoData.find((s) => s.id === geoID.val);

    if (geo) {
      const centroid = geoCentroid(geo);
      setCenter(centroid);
      setZoomLevel(3);
    }
  }, [stateGeoData, state]);

  return (
    <div data-tip="" data-html={true} className="map-wrapper">
      <div className="key">
        <div className="key-title">ARC-CO Adjusted Payment Rate</div>
        <div className="key-colors"></div>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-zoom-out"
          onClick={() => setZoomLevel(zoomLevel - 0.5)}
          disabled={zoomLevel <= 1}
        >
          <div className="sr-only">Zoom Out</div>
        </button>
        <button
          className="btn btn-zoom-in"
          onClick={() => setZoomLevel(zoomLevel + 0.5)}
          disabled={zoomLevel >= 3}
        >
          <div className="sr-only">Zoom In</div>
        </button>
      </div>
      <ComposableMap projection="geoAlbersUsa" className="map-display">
        <ZoomableGroup
          center={center}
          zoom={zoomLevel}
          onMoveEnd={(zoom) => {
            setCenter(zoom.coordinates);
            setZoomLevel(zoom.zoom);
          }}
        >
          <Geographies geography={geo} borders={"#fff"}>
            {({ geographies }) => {
              return geographies.map((g) => {
                return (
                  <County
                    countyGeoData={g}
                    setTooltipContent={setTooltipContent}
                    data={data}
                    crop={crop}
                    state={state}
                  />
                );
              });
            }}
          </Geographies>
          <Geographies
            geography={stateGeo}
            style={zoomLevel < 2 ? { display: "block" } : { display: "none" }}
          >
            {({ geographies }) => {
              setStateGeoData(geographies);
              return geographies.map((geo) => (
                <State stateGeoData={geo} />
              ));
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapDisplay);

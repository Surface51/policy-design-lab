import { useEffect, useState, memo } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import { csv, json } from "d3-fetch";
import { geoCentroid } from "d3-geo";

// State data for fetching fips codes
import allStates from "../data/allstates.json";

// Custom components
import County from "./County";
import State from "./State";
import ColorKey from "./ColorKey";

const MapDisplay = ({
  year,
  crop,
  state,
  setState,
  setTooltipContent,
  paymentType,
}) => {
  const [data, setData] = useState([]);
  const [stateGeo, setStateGeo] = useState([]);
  const [geo, setGeo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [yearData, setYearData] = useState({});
  const [center, setCenter] = useState([-96, 37.8]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [stateGeoData, setStateGeoData] = useState([]);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);
  const translatePadding = 50;

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
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
    const promises = years.map((year) =>
      csv(`csv/crop-data-${year}.csv`).then((data) => {
        return data.reduce((acc, row) => {
          // Use the 'fips' field as the key
          // ensure that fips key is 5 digits, if not add leading 0s
          row.fips = row.fips.padStart(5, "0");
          acc[`${row.fips}-${row.crop}`] = row;
          return acc;
        }, {});
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

  useEffect(() => {
    const handleResize = () => {
      const mapElement = document.getElementById("map-display");
      if (mapElement) {
        const rect = mapElement.getBoundingClientRect();
        setMapWidth(rect.width);
        setMapHeight(rect.height);

        // console.log(`Map width: ${rect.width}, Map height: ${rect.height}`);
      }
    };

    handleResize(); // Initial resize

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log({ mapWidth, mapHeight });
  }, [mapHeight, mapWidth]);

  return (
    <div data-tip="" data-html={true} className="map-wrapper">
      <ColorKey title={"Payment Scale"} />
      <div className="btn-group">
        <button
          className="btn btn-zoom-out"
          onClick={() => setZoomLevel(zoomLevel - 0.5)}
          disabled={zoomLevel <= 1}
          title="Zoom Out"
        >
          <div className="sr-only">Zoom Out</div>
        </button>
        <button
          className="btn btn-zoom-in"
          onClick={() => {
            setZoomLevel(zoomLevel + 0.5);
          }}
          disabled={zoomLevel >= 3}
          title="Zoom In"
        >
          <div className="sr-only">Zoom In</div>
        </button>
        {state !== "all" && (
          <button
            className="btn btn-exit-state"
            onClick={() => {
              setState("all");
            }}
            disabled={state === "all"}
            title="Exit State"
          >
            <div className="sr-only">Stop</div>
          </button>
        )}
      </div>
      <ComposableMap
        projection="geoAlbersUsa"
        className="map-display"
        id="map-display"
      >
        <ZoomableGroup
          center={center}
          zoom={zoomLevel}
          onMoveEnd={(incomingZoomEvent) => {
            const [x, y] = incomingZoomEvent.coordinates;

            // Sensible bounds for the map
            const [minX, minY] = [-140, 26];
            const [maxX, maxY] = [-70, 70];

            // Ensure the center is within the bounds of the map
            const [newX, newY] = [
              x < minX ? minX : x > maxX ? maxX : x,
              y < minY ? minY : y > maxY ? maxY : y,
            ];

            setCenter([newX, newY]);
            setZoomLevel(incomingZoomEvent.zoom);
            // console.log(incomingZoomEvent.coordinates, [newX, newY]);
          }}
          filterZoomEvent={(d3Event) => {
            return d3Event.type !== "wheel" && !("ontouchstart" in window);
          }}
          translateExtent={[
            [-translatePadding, -translatePadding],
            [
              mapWidth * 0.75 + translatePadding,
              mapHeight * 0.9 + translatePadding,
            ],
          ]}
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
                    year={year}
                    key={g.rsmKey}
                    paymentType={paymentType}
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
                <State
                  stateGeoData={geo}
                  setState={setState}
                  key={geo.rsmKey}
                />
              ));
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapDisplay);

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv, json } from "d3-fetch";

const colorScale = scaleQuantize()
  .domain([0, 100])
  .range([
    "#D9ED92",
    "#B5E48C",
    "#99D98C",
    "#76C893",
    "#52B69A",
    "#34A0A4",
    "#168AAD",
    "#1A759F",
    "#1E6091",
    "#184E77",
  ]);

const MapDisplay = ({ year }) => {
  const [data, setData] = useState([]);
  const [stateGeo, setStateGeo] = useState([]);
  const [geo, setGeo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const benchmark_ratio = 0.86;
  const [yearData, setYearData] = useState({});

  useEffect(() => {
    console.log("json/counties-10m.json");
    json("json/counties-10m.json").then((data) => {
      setGeo(data);
    });
  }, []);

  useEffect(() => {
    console.log("json/states-10m.json");
    json("json/states-10m.json").then((data) => {
      setStateGeo(data);
    });
  }, []);

  useEffect(() => {
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
    const promises = years.map((year) =>
      csv(`csv/all_${year}.csv`).then((data) => data)
    );
    Promise.all(promises).then((results) => {
      // Create an object with the year as the key and the data as the value
      results = results.reduce((acc, result, index) => {
        acc[years[index]] = result;
        return acc;
      }, {});
      console.log("Fetched everything!", results);
      setYearData({
        ...yearData,
        ...results,
      });
      console.log("Initial data!", results[year]);
      setData(results[year]);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Wait for the data to be fetched
    if (!loaded) return;
    console.log("Changing data!", yearData[year]);
    setData(yearData[year]);
  }, [year]);

  useEffect(() => {
    console.log("Year data changed!", yearData);
  }, [yearData]);

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geo} borders={"#fff"}>
            {({ geographies }) => {
              // let top_geos = geographies.filter((g) => {
              //   const cur = data.find((s) => s.fips === g.id);
              //   let arc_pay = 0;

              //   if (cur) {
              //     const benchmark_rev = cur.bchmk * cur.bchmk_prc;
              //     const guarantee = benchmark_rev * benchmark_ratio;
              //     const max_pay = benchmark_rev * 0.1;
              //     const act_rev = cur.act_yld * cur.nat_prc;
              //     const form = Math.max(guarantee - act_rev, 0);
              //     arc_pay = Math.min(max_pay, form);
              //   }

              //   return arc_pay > 0;
              // });

              // let bottom_geos = geographies.filter((g) => {
              //   const cur = data.find((s) => s.FIPS === g.id);
              //   let arc_pay = 0;

              //   if (cur) {
              //     const benchmark_rev = cur.bchmk * cur.bchmk_prc;
              //     const guarantee = benchmark_rev * benchmark_ratio;
              //     const max_pay = benchmark_rev * 0.1;
              //     const act_rev = cur.act_yld * cur.nat_prc;
              //     const form = Math.max(guarantee - act_rev, 0);
              //     arc_pay = Math.min(max_pay, form);
              //   }

              //   return arc_pay == 0;
              // });

              // const results = bottom_geos.concat(top_geos);

              return geographies.map((g) => {
                const cur = data.find((s) => s.fips === g.id);

                let arc_pay = null;
                let found = true;

                if (cur) {
                  const benchmark_rev = cur.bchmk * cur.bchmk_prc;
                  // console.log({ benchmark_rev });
                  const guarantee = benchmark_rev * benchmark_ratio;
                  const max_pay = benchmark_rev * 0.1;
                  const act_rev = cur.act_yld * cur.nat_prc;
                  const form = Math.max(guarantee - act_rev, 0);
                  arc_pay = Math.min(max_pay, form);
                  // const state = g.id.substring(0, 2);
                  // Relavent Fips Codes | IL - 17 | IA - 19
                }

                return (
                  <Geography
                    key={g.rsmKey}
                    geography={g}
                    fill={
                      found && arc_pay > 0 ? colorScale(arc_pay) : "#F2F2F2"
                    }
                    stroke={found && arc_pay > 0 ? "#000" : "#FFF"}
                    style={{
                      default: {
                        fill:
                          found && arc_pay > 0
                            ? colorScale(arc_pay)
                            : "#F2F2F2",
                        stroke:
                          found && arc_pay > 0 ? "#000" : "rgb(72, 72, 72)",
                        strokeWidth: found && arc_pay > 0 ? 0.5 : 0.1,
                        outline: "none",
                      },
                      hover: {
                        fill: "#000",
                        stroke: "#000",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: "yellow",
                        stroke: "#000",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                  />
                );
              });
            }}
          </Geographies>
          <Geographies
            geography={stateGeo}
            style={{ position: "absolute", top: 0 }}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "transparent",
                      stroke: "#000",
                      strokeWidth: 0.5,
                      outline: "red",
                    },
                    hover: {
                      fill: "#000",
                      fillOpacity: 0.2,
                      stroke: "#000",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#000",
                      stroke: "#000",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapDisplay;

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

const MapDisplay = () => {
  const [data, setData] = useState([]);
  const [stateGeo, setStateGeo] = useState([]);
  const [geo, setGeo] = useState([]);
  const benchmark_ratio = 0.86;

  useEffect(() => {
    json("json/counties-10m.json").then((data) => {
      setGeo(data);
    });
    json("json/states-10m.json").then((data) => {
      setStateGeo(data);
    });
    csv("csv/all_2014.csv").then((counties) => {
      setData(counties);
    });
  }, []);

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
                      strokeWidth: 0.75,
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

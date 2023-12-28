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
  const [geo, setGeo] = useState([]);
  const [stateGeo, setStateGeo] = useState([]);
  const benchmark_ratio = 0.86;

  useEffect(() => {
    json("json/new-geo-states.json").then((data) => {
      setGeo(data);
    });
    csv("/Book1.2020.corn.csv").then((counties) => {
      setData(counties);
    });
  }, []);

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geo} borders={"#fff"}>
            {({ geographies }) => {
              let top_geos = geographies.filter((g) => {
                const cur = data.find((s) => s.FIPS === g.id);
                let arc_pay = 0;

                if (cur) {
                  const benchmark_rev = cur.benchmark * cur.benchmark_price;
                  const guarantee = benchmark_rev * benchmark_ratio;
                  const max_pay = benchmark_rev * 0.1;
                  const act_rev = cur.act_yield * cur.natl_price;
                  const form = Math.max(guarantee - act_rev, 0);
                  arc_pay = Math.min(max_pay, form);
                }

                return arc_pay > 0;
              });

              let bottom_geos = geographies.filter((g) => {
                const cur = data.find((s) => s.FIPS === g.id);
                let arc_pay = 0;

                if (cur) {
                  const benchmark_rev = cur.benchmark * cur.benchmark_price;
                  const guarantee = benchmark_rev * benchmark_ratio;
                  const max_pay = benchmark_rev * 0.1;
                  const act_rev = cur.act_yield * cur.natl_price;
                  const form = Math.max(guarantee - act_rev, 0);
                  arc_pay = Math.min(max_pay, form);
                }

                return arc_pay == 0;
              });

              const results = bottom_geos.concat(top_geos);

              return results.map((g) => {
                const cur = data.find((s) => s.FIPS === g.id);
                let arc_pay = null;

                if (cur) {
                  const FIPS = cur.FIPS;
                  const benchmark_rev = cur.benchmark * cur.benchmark_price;
                  const guarantee = benchmark_rev * benchmark_ratio;
                  const max_pay = benchmark_rev * 0.1;
                  const act_rev = cur.act_yield * cur.natl_price;
                  const form = Math.max(guarantee - act_rev, 0);
                  arc_pay = Math.min(max_pay, form);

                  const state = g.id.substring(0, 2);
                  var found = state === "17" || state === "19";
                }

                // Relavent Fips Codes
                // Ill - 17
                // Iowa - 19
                // Wisconsin - 55

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
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapDisplay;

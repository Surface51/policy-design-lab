import { renderToStaticMarkup } from "react-dom/server";
import { Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import allStates from "../data/allstates.json";

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

const benchmark_ratio = 0.86;

const County = ({ countyGeoData, setTooltipContent, data, crop, state, year }) => {
  const updateTooltip = ({ countyName, arcPay, dataPresent }) => {
    let content = (
      <div className="tooltip-container">
        <div className="tooltip-header">{countyName}</div>
        {dataPresent ? (
          <div className="tooltip-body">
            <p className="year">
              <b>Year:</b> {year}
            </p>
            <p className="payment">
              <b>ARC-CO Adjusted Payment Rate: </b>
              {arcPay}
            </p>
          </div>
        ) : (
          <div className="tooltip-body">No Data Available</div>
        )}
      </div>
    );
    setTooltipContent(renderToStaticMarkup(content));
  };

  const cur = data.find((s) => s.fips === countyGeoData.id);

  let arc_pay = null;
  let found = false;

  if (cur && cur.crop === crop) {
    if (cur.crop !== crop) {
      found = false;
    } else {
      const benchmark_rev = cur.bchmk * cur.bchmk_prc;
      const guarantee = benchmark_rev * benchmark_ratio;
      const max_pay = benchmark_rev * 0.1;
      const act_rev = cur.act_yld * cur.nat_prc;
      const form = Math.max(guarantee - act_rev, 0);
      arc_pay = Math.min(max_pay, form);
      found = true;
    }
  }

  return (
    <Geography
      key={countyGeoData.rsmKey}
      className="county"
      geography={countyGeoData}
      fill={found && arc_pay >= 0 ? colorScale(arc_pay) : "#F2F2F2"}
      onMouseEnter={() => {
        if (
          state === "all" ||
          allStates.some(
            (s) =>
              s.id === state && s.val == Math.floor(countyGeoData.id / 1000)
          )
        ) {
          updateTooltip(
            found
              ? {
                  countyName: countyGeoData.properties.name,
                  arcPay: `$${arc_pay.toFixed(2)}`,
                  dataPresent: true,
                }
              : {
                  countyName: countyGeoData.properties.name,
                  arcPay: "N/A",
                  dataPresent: false,
                }
          );
        }
      }}
      onMouseLeave={() => {
        setTooltipContent("");
      }}
      stroke={found && arc_pay >= 0 ? "#000" : "#FFF"}
      style={
        state === "all" ||
        allStates.some(
          (s) => s.id === state && s.val == Math.floor(countyGeoData.id / 1000)
        )
          ? {
              default: {
                fill: found && arc_pay >= 0 ? colorScale(arc_pay) : "#F2F2F2",
                stroke: found && arc_pay >= 0 ? "#000" : "rgb(72, 72, 72)",
                strokeWidth: found && arc_pay >= 0 ? 0.2 : 0.2,
                outline: "none",
              },
              hover: {
                stroke: "#000",
                strokeWidth: 0.5,
                outline: "none",
              },
              pressed: {
                stroke: "#000",
                strokeWidth: 0.5,
                outline: "none",
              },
            }
          : {
              default: {
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0.1,
                outline: "none",
              },
              hover: {
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0.5,
                outline: "none",
              },
              pressed: {
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0.5,
                outline: "none",
              },
            }
      }
    />
  );
};

export default County;
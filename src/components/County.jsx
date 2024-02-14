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

const County = ({
  countyGeoData,
  setTooltipContent,
  data,
  crop,
  state,
  year,
  paymentType,
}) => {
  const updateTooltip = ({
    countyName,
    value,
    diff,
    arcTitle,
    dataPresent,
  }) => {
    let content = (
      <div className="tooltip-container">
        <div className="tooltip-header">{countyName}</div>
        {dataPresent ? (
          <div className="tooltip-body">
            <p className="year">
              <b>Year:</b> {year}
            </p>
            <p className="payment">
              <b>{arcTitle}:&nbsp;</b>${value}
            </p>
            {diff ? (
              <div className="diff">
                <p>
                  <b>ARC-CO Payment:&nbsp;</b>${diff}
                </p>
                <p>
                  <b>Difference: </b>{" "}
                  <span className="color-primary">
                    ${(value - diff).toFixed(2)}
                  </span>
                </p>
              </div>
            ) : (
              <> </>
            )}
          </div>
        ) : (
          <div className="tooltip-body">No Data Available</div>
        )}
      </div>
    );
    setTooltipContent(renderToStaticMarkup(content));
  };

  const cur = data[`${countyGeoData.id}-${crop}`];

  let arc_pay = null;
  let new_arc_pay = null;
  let adj_arc_pay = null;
  let found = false;

  if (cur && cur.crop === crop) {
    arc_pay = Number(cur.arc_pay).toFixed(2);
    new_arc_pay = Number(cur.new_arc_pay).toFixed(2);
    adj_arc_pay = Number(cur.adj_arc_pay).toFixed(2);

    if (paymentType === "arc") {
      // arc_pay = arc_pay;
    } else if (paymentType === "new_arc") {
      arc_pay = new_arc_pay;
    } else if (paymentType === "adj_arc") {
      arc_pay = adj_arc_pay;
    }

    found = true;
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
                  value: arc_pay,
                  diff:
                    paymentType === "new_arc" || paymentType === "adj_arc"
                      ? Number(cur.arc_pay).toFixed(2)
                      : false,
                  arcTitle:
                    paymentType === "new_arc"
                      ? "New ARC-CO Payment"
                      : paymentType === "adj_arc"
                      ? "Adjusted ARC-CO Payment"
                      : "ARC-CO Payment",
                  dataPresent: true,
                }
              : {
                  countyName: countyGeoData.properties.name,
                  arcPay: "N/A",
                  newArcPay: false,
                  arcTitle: false,
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

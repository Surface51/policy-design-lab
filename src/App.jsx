import Map from "./components/Map";
import { useEffect, useState } from "react";

const cropImages = {
  Barley: "barley.webp",
  Canola: "canola.webp",
  Rapeseed: "canola.webp",
  "Chickpeas_Large": "chickpeas.webp",
  "Chickpeas_Small": "chickpeas.webp",
  Corn: "corn.webp",
  "Seed Cotton": "cotton.webp",
  Crambe: "crambe.webp",
  Flaxseed: "flaxseed.webp",
  Lentils: "lentil.webp",
  "Mustard Seed": "mustard.webp",
  Oats: "oats.webp",
  "Dry Peas": "pea.webp",
  Peanuts: "peanuts.webp",
  "Rice_Long Grain": "rice.webp",
  "Rice_Med/Short Grain": "rice.webp",
  "Rice_Temperate Japonica": "rice.webp",
  Safflower: "safflower.webp",
  "Sesame Seed": "sesame.webp",
  "Grain Sorghum": "sorghum.webp",
  Soybeans: "soybean.webp",
  "Sunflower Seed": "sunflower.webp",
  Wheat: "wheat.webp",
};

function App() {
  const [cropImageName, setCropImageName] = useState("Corn");

  useEffect(() => {
    // Update background image of .page-header
    const pageHeader = document.querySelector(".page-header");
    pageHeader.style.backgroundImage = `url(images/background-images/${cropImages[cropImageName]})`;
  }, [cropImageName]);

  return (
    <main>
      <section className="page-header"></section>
      <section className="introduction container">
        <div className="title-container">
          <h2 className="color-primary">Adjusted ARC-CO Payments by County</h2>
          <h3>Map Visualization</h3>
        </div>
        <div className="content-container">
          <b>The value of visualization.</b> The data visualizations below
          provide a proof of concept showcasing how
          <b> modeling and research can be applied to policy innovations.</b>
          Specifically, these visuals offer insight into changes to a particular
          farm payment program—the Agriculture Risk Coverage, county coverage
          option (ARC-CO). By choosing a year, state, and crop, you can swiftly
          see the results of changes to ARC-CO. The visualization will then
          provide a comparison of how these changes in policy affect payments to
          farmers. The results offer a clearer understanding of how policy
          changes can impact farm economics, conservation, and more.
        </div>
      </section>
      <Map setCropImageName={setCropImageName}/>
      <section className="importance container">
        <div className="title-container">
          <h3 className="color-primary">Why is this important?</h3>
        </div>
        <div className="content-container">
          Data visualization can help you make better, more informed policy
          decisions. You can more easily see important information, analyze
          granular concrete data, and implement policies according to what works
          best for a specific area.
        </div>
      </section>
    </main>
  );
}

export default App;

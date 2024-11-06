import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
import {
  ArcgisHome,
  ArcgisMap,
  ArcgisZoom,
  ArcgisCoordinateConversion,
} from "@arcgis/map-components-react";
import {
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteShell,
} from "@esri/calcite-components-react";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
import type MapView from "@arcgis/core/views/MapView";
import { useState } from "react";
import "./App.css";
import SimpleCoordinateConversion from "./components/SimpleCoordinateConversion";
import useCoordinateConversionViewModel from "./components/useCoordinateConversionViewModel";

// Load all map assets
defineMapElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets",
});

// Load all Calcite assets
defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.13.2/assets",
});

function App() {
  // State management
  const [mapView, setMapView] = useState<MapView>();

  const handleViewReady = (event: CustomEvent<void>) => {
    // Change state
    const mapEl = event.target as HTMLArcgisMapElement;
    setMapView(mapEl.view);
  };

  const { coordinateConversionViewModel } =
    useCoordinateConversionViewModel(mapView);

  // COMPOSITION OF COMPONENTS
  return (
    <CalciteShell>
      <CalciteNavigation navigation-action slot="header" id="nav">
        <CalciteNavigationLogo
          icon="clustering"
          slot="logo"
          heading="Custom hooks and using Calcite components"
          description="Esri European Developer Summit 2024"
        ></CalciteNavigationLogo>
      </CalciteNavigation>
      <ArcgisMap
        itemId="05e015c5f0314db9a487a9b46cb37eca"
        popupDisabled
        onArcgisViewReadyChange={handleViewReady}
      >
        {/* INCLUDE HOME, ZOOM AND COORDINATECONVERSION COMPONENTS */}
        <ArcgisHome position="top-left"></ArcgisHome>
        <ArcgisZoom position="top-left"></ArcgisZoom>
        <ArcgisCoordinateConversion position="bottom-left"></ArcgisCoordinateConversion>
        {coordinateConversionViewModel && (
          <SimpleCoordinateConversion
            vm={coordinateConversionViewModel}
          ></SimpleCoordinateConversion>
        )}
      </ArcgisMap>
    </CalciteShell>
  );
}

export default App;

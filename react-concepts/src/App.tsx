import { ArcgisMapCustomEvent } from "@arcgis/map-components";
import {
  CalciteButton,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteNotice,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-notice";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import React from "react";
import "./App.css";
import Coordinates from "./components/Coordinates";
import MyMap from "./components/Map";

function App() {
  // State management
  const [itemId, setItemId] = React.useState("");
  const [working, setWorking] = React.useState<boolean>();
  const [viewLoaded, setViewLoaded] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState<__esri.Point>();

  const handleViewButtonClick = () => {
    // Sets the map itemId
    setWorking(true);
    setItemId("05e015c5f0314db9a487a9b46cb37eca");
  };

  const handleViewClick = (
    event: ArcgisMapCustomEvent<__esri.ViewClickEvent>
  ) => {
    // Change state coordinates
    setCoordinates(event.detail.mapPoint);
  };

  const handleViewReady = () => {
    // Change state
    setViewLoaded(true);
    setWorking(false);
  };

  // COMPOSITION OF COMPONENTS
  return (
    <CalciteShell>
      <CalciteNavigation navigation-action slot="header" id="nav">
        <CalciteNavigationLogo
          icon="clustering"
          slot="logo"
          heading="React Concepts"
          description="Esri European Developer Summit 2024"
        ></CalciteNavigationLogo>
      </CalciteNavigation>
      <CalciteShellPanel slot="panel-start">
        <CalcitePanel heading="Map Controls" className="options-container">
          {/* CONDITIONAL RENDER BUTTON OR NOTICE */}
          {!viewLoaded ? (
            <CalciteButton
              loading={working}
              disabled={working}
              onClick={handleViewButtonClick}
            >
              Set Map
            </CalciteButton>
          ) : (
            <CalciteNotice open className="action-label">
              <div slot="message">Click the map to see coordinates</div>
            </CalciteNotice>
          )}

          {/* CONDITIONAL RENDER THE COORDINATES */}
          {coordinates && (
            <>
              {/* CUSTOM REACT COMPONENT FOR COORDINATES */}
              <Coordinates
                className="coordinates"
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
              />
            </>
          )}
        </CalcitePanel>
      </CalciteShellPanel>
      {/* CUSTOM REACT COMPONENT FOR THE MAP */}
      <CalcitePanel heading="Map">
        <MyMap
          itemId={itemId}
          onViewReady={handleViewReady}
          onViewClick={handleViewClick}
        />
      </CalcitePanel>
    </CalciteShell>
  );
}

export default App;

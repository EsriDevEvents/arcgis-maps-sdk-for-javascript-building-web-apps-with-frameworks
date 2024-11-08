import { ArcgisMapCustomEvent } from "@arcgis/map-components";
import {
  ArcgisHome,
  ArcgisMap,
  ArcgisZoom,
} from "@arcgis/map-components-react";
import "@arcgis/map-components/dist/components/arcgis-home";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import { CalciteAlert } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-alert";
import React from "react";
import "./Map.css";

interface MapProps {
  // Props
  itemId: string;
  // Callbacks
  onViewReady: () => void;
  onViewClick: (event: ArcgisMapCustomEvent<__esri.ViewClickEvent>) => void;
}

/**
 * Custom component to display a map
 */
export default function Map(props: MapProps) {
  const { itemId, onViewReady, onViewClick } = props;
  const [viewReady, setViewReady] = React.useState(false);

  const handleViewReady = () => {
    setViewReady(true);
    onViewReady();
  };

  return (
    <div className="container">
      {/* CONDITIONAL RENDER THE MAP */}
      {itemId && (
        <ArcgisMap
          itemId={itemId}
          popupDisabled
          onArcgisViewReadyChange={handleViewReady}
          onArcgisViewClick={onViewClick}
        >
          {/* INCLUDE HOME AND ZOOM COMPONENTS */}
          <ArcgisHome position="top-left"></ArcgisHome>
          <ArcgisZoom position="top-left"></ArcgisZoom>
        </ArcgisMap>
      )}

      {/* RENDER ALERT WHEN MAP NOT READY */}
      <CalciteAlert
        open={!viewReady}
        icon="effects"
        placement="bottom-end"
        label={""}
      >
        <div slot="title">React Concepts</div>
        <div slot="message">Map has not yet been loaded!</div>
      </CalciteAlert>
    </div>
  );
}

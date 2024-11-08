import {
  CalciteAction,
  CalciteActionBar,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteNotice,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
import "./App.css";

// Load all Calcite assets
defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.13.2/assets",
});

function App() {
  return (
    <CalciteShell>

      {/* Navigation in header slot */}
      <CalciteNavigation slot="header" navigation-action id="nav">
        <CalciteNavigationLogo
          icon="clustering"
          slot="logo"
          heading="Calcite layout - header slot"
          description="Esri European Developer Summit 2024"
        ></CalciteNavigationLogo>
      </CalciteNavigation>

      {/* Panel in panel-start slot */}
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        id="shell-panel-start"
      >
        {/* action bar in the action-bar slot of the panel */}
        <CalciteActionBar slot="action-bar">
          <CalciteAction text="Save" icon="save" indicator></CalciteAction>
          <CalciteAction active icon="map" text="Map"></CalciteAction>
          <CalciteAction icon="layer" text="Layer"></CalciteAction>
        </CalciteActionBar>
        <CalcitePanel
          heading="panel-start"
          description="Slot name"
          id="panel-start"
        >
          <CalciteNotice width="full" open>
            <div slot="title">Panel start</div>
          </CalciteNotice>
        </CalcitePanel>
      </CalciteShellPanel>

      {/* This is the panel at thend in the panel-end slot, position=end indicated that the action bar moves to the other side */}
      <CalciteShellPanel slot="panel-end" position="end" id="shell-panel-end">
        <CalciteActionBar slot="action-bar">
          <CalciteAction text="Save" icon="save" indicator></CalciteAction>
          <CalciteAction active icon="map" text="Map"></CalciteAction>
          <CalciteAction icon="layer" text="Layer"></CalciteAction>
        </CalciteActionBar>
        <CalcitePanel
          heading="panel-end"
          description="Slot name"
          id="panel-end"
        >
          <CalciteNotice width="full" open>
            <div slot="title">Panel end</div>
          </CalciteNotice>
        </CalcitePanel>
      </CalciteShellPanel>

      {/* Another panel in the panel-top slot, horizontal layout */}
      <CalciteShellPanel
        slot="panel-top"
        id="shell-panel-top"
        layout="horizontal"
      >
        <CalcitePanel heading="panel-top" description="Slot name">
          <CalciteNotice width="full" open>
            <div slot="title">Panel top</div>
          </CalciteNotice>
        </CalcitePanel>
      </CalciteShellPanel>

      {/* This is the bottom panel */}
      <CalciteShellPanel
        slot="panel-bottom"
        position="start"
        id="shell-panel-bottom"
        layout="horizontal"
      >
        <CalcitePanel
          heading="panel-bottom"
          description="Slot name"
          id="panel-bottom"
        >
          <CalciteNotice width="full" open>
            <div slot="title">Panel bottom</div>
          </CalciteNotice>
        </CalcitePanel>
      </CalciteShellPanel>

      {/* And the default panel, often used for the map */}
      <CalcitePanel
        heading="default / unnamed"
        description="Slot name"
        class="calcite-mode-dark"
      >
        <CalciteNotice width="full" open>
          <div slot="title">Default content</div>
        </CalciteNotice>
      </CalcitePanel>

      <div slot="footer"><h3>Footer slot</h3></div>
    </CalciteShell>
  );
}

export default App;

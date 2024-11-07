import CoordinateConversionViewModel from "@arcgis/core/widgets/CoordinateConversion/CoordinateConversionViewModel";
import Conversion from "@arcgis/core/widgets/CoordinateConversion/support/Conversion.js";
import { CalciteButton, CalciteInlineEditable, CalciteInput, CalciteOption, CalciteSelect, CalciteTooltip } from "@esri/calcite-components-react";
import { useEffect, useState } from "react";
import useActiveFormat from "./useActiveFormat";
import useActiveDisplayCoordinate from "./useActiveDisplayCoordinate";
import "./SimpleCoordinateConversion.css";

interface SimpleCoordinateConversionProps {
  vm: CoordinateConversionViewModel;
}

/**
 * Custom component to display map lat/lon coordinates
 */
export default function SimpleCoordinateConversion(props: SimpleCoordinateConversionProps) {
  const [mode, setMode] = useState("live");

  const { vm } = props;

  useEffect(() => {
    mode === "live" ? (vm.mode = "live") : (vm.mode = "capture");
  }, [mode, vm]);

  const activeFormat = useActiveFormat(vm);
  const { activeDisplayCoordinate } = useActiveDisplayCoordinate(vm);

  async function reverseConvert(value: string) {
    try {
      if (activeFormat) {
        const point = await vm.reverseConvert(value, activeFormat);
        vm.view.goTo(point);
      }
    } catch (e) {
      // Swallow errors
      console.debug(e);
    }
  }

  return (
    <div className="simple-coordinate-conversion">
      <CalciteButton
        id="simple-coordinate-change-mode"
        iconStart={mode === "live" ? "pin-tear" : "pin-tear-f"}
        appearance={mode === "live" ? "outline-fill" : "solid"}
        kind="neutral"
        scale="s"
        onClick={() => {
          mode === "live" ? setMode("capture") : setMode("live");
        }}
      />
      <CalciteTooltip referenceElement="simple-coordinate-change-mode">
        {mode === "live" ? "Show live position on mouse move" : "Capture position on mouse click"}
      </CalciteTooltip>
      <CalciteSelect
        class="simple-coordinate-conversion-select"
        id="simple-coordinate-select"
        label="select"
        onCalciteSelectChange={(e) => {
          const f = vm.formats.find((format) => format.name === e.target.value);
          const newConversion = new Conversion({ format: f });
          vm.conversions.removeAt(0);
          vm.conversions.add(newConversion, 0);
        }}
      >
        {vm.formats.map((format) => {
          return (
            <CalciteOption key={format.name} value={format.name} selected={format.name === activeFormat?.name ? true : undefined}>
              {format.name.toLocaleUpperCase()}
            </CalciteOption>
          );
        })}
      </CalciteSelect>
      <CalciteTooltip referenceElement="simple-coordinate-select">{activeFormat?.label}</CalciteTooltip>
      <CalciteInlineEditable
        id="simple-coordinate-editable"
        className="simple-coordinate-editable"
        controls
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            reverseConvert((e.target as HTMLCalciteInputElement).value);
          }
        }}
        onCalciteInlineEditableEditConfirm={(e) => {
          reverseConvert((e.target as unknown as HTMLCalciteInputElement).value);
        }}
      >
        <CalciteInput id="simple-coordinate-input" placeholder="Click on map" value={activeDisplayCoordinate}>
          {activeDisplayCoordinate}
        </CalciteInput>
      </CalciteInlineEditable>
      <CalciteTooltip referenceElement="simple-coordinate-editable">Enter coordinate</CalciteTooltip>
    </div>
  );
}

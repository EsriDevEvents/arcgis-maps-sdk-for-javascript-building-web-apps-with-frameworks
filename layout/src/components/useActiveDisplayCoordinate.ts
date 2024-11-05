import { useEffect, useState } from "react";
import { watch } from "@arcgis/core/core/reactiveUtils";
import CoordinateConversionViewModel from "@arcgis/core/widgets/CoordinateConversion/CoordinateConversionViewModel";

const useActiveDisplayCoordinate = (vm: CoordinateConversionViewModel) => {
  const [activeDisplayCoordinate, setActiveDisplayCoordinate] = useState("");

  useEffect(() => {
    const handle = watch(
      () => vm?.conversions?.getItemAt(0)?.displayCoordinate,
      (displayCoordinate) =>
        setActiveDisplayCoordinate(displayCoordinate ?? ""),
      { initial: true }
    );

    return function cleanUp() {
      handle?.remove();
    };
  }, [vm]);

  return { activeDisplayCoordinate };
};

export default useActiveDisplayCoordinate;

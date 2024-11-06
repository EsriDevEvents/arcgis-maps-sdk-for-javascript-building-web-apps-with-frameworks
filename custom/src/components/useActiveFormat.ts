import { useEffect, useState } from "react";
import { watch } from "@arcgis/core/core/reactiveUtils";
import CoordinateConversionViewModel from "@arcgis/core/widgets/CoordinateConversion/CoordinateConversionViewModel";
import Format from "@arcgis/core/widgets/CoordinateConversion/support/Format.js";

const useActiveFormat = (vm: CoordinateConversionViewModel) => {
  const [activeFormat, setActiveFormat] = useState<Format>();

  useEffect(() => {
    // Watch for changes on the format of the first conversion
    const handle = watch(
      () => vm?.conversions?.getItemAt(0)?.format,
      (format) => setActiveFormat(format),
      { initial: true }
    );

    // Cleanup
    return function cleanUp() {
      handle?.remove();
    };
  }, [vm]);

  return { activeFormat };
};

export default useActiveFormat;

import CoordinateConversionViewModel from "@arcgis/core/widgets/CoordinateConversion/CoordinateConversionViewModel";

const useActiveFormat = (vm: CoordinateConversionViewModel) => {
  return vm?.conversions?.getItemAt(0)?.format;
};

export default useActiveFormat;

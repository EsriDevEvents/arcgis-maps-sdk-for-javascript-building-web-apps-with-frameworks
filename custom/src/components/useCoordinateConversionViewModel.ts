import CoordinateConversionViewModel from "@arcgis/core/widgets/CoordinateConversion/CoordinateConversionViewModel";
import type MapView from "@arcgis/core/views/MapView";
import * as coordinateFormatter from "@arcgis/core/geometry/coordinateFormatter.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import Point from "@arcgis/core/geometry/Point.js";

const useCoordinateConversionViewModel = (mapView: MapView | undefined) => {
  const vm = new CoordinateConversionViewModel({ view: mapView });

  // Set current conversion to MGRS
  // @ts-expect-error: The JS API can autocast this
  vm.conversions = ["mgrs"];

  // Remove some formats
  const toRemove = vm.formats.filter((format) => format.name === "basemap" || format.name === "usng" || format.name === "xy");
  vm.formats.removeMany(toRemove);

  // Format "dd" to 3 decimals
  const ddFormat = vm.formats.find((format) => format.name === "dd");
  ddFormat.conversionInfo = {
    convert(point) {
      const returnPoint = point.spatialReference.isWGS84 ? point : (webMercatorUtils.webMercatorToGeographic(point) as Point);
      const formattedCoordinates = coordinateFormatter.toLatitudeLongitude(returnPoint, "dd", 3);

      return {
        location: point,
        coordinate: formattedCoordinates,
      };
    },
  };

  // Add lavel to "dd"
  ddFormat.label = "Decimal Degrees (DD.DDD)";

  // Format "ddm" to 3 decimals
  const ddmFormat = vm.formats.find((format) => format.name === "ddm");
  ddmFormat.conversionInfo = {
    convert(point) {
      const returnPoint = point.spatialReference.isWGS84 ? point : (webMercatorUtils.webMercatorToGeographic(point) as Point);
      const formattedCoordinates = coordinateFormatter.toLatitudeLongitude(returnPoint, "ddm", 3);

      return {
        location: point,
        coordinate: formattedCoordinates,
      };
    },
  };

  // Change format name and lavel
  ddmFormat.name = "DM";
  ddmFormat.label = "Decimal Minute Degrees (DD MM.MMM)";

  // Format "dms" to 2 decimals
  const dmsFormat = vm.formats.find((format) => format.name === "dms");
  dmsFormat.conversionInfo = {
    convert(point) {
      const returnPoint = point.spatialReference.isWGS84 ? point : (webMercatorUtils.webMercatorToGeographic(point) as Point);
      const formattedCoordinates = coordinateFormatter.toLatitudeLongitude(returnPoint, "dms", 2);

      return {
        location: point,
        coordinate: formattedCoordinates,
      };
    },
  };

  // Change some more labels
  dmsFormat.label = "Degrees (DD MM SS)";
  const utmFormat = vm.formats.find((format) => format.name === "utm");
  utmFormat.label = "UTM";
  const mgrsFormat = vm.formats.find((format) => format.name === "mgrs");
  mgrsFormat.label = "MGRS";

  return vm;
};

export default useCoordinateConversionViewModel;

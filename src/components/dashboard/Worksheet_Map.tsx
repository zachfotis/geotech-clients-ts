import { useEffect, useState } from 'react';
import { useWorksheetContext } from '../../context/auth/WorksheetContext';
import Map, { MapEnum, MapType } from '../common/Map';

function Worksheet_Map() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [userZoom, setUserZoom] = useState(15);
  const [userMapType, setUserMapType] = useState<MapType>('satellite');
  const [reloadMap, setReloadMap] = useState(false); // [ADDED] This is a hack to force the map to reload when the position changes
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();

  const checkIfPositionEqualsCoordinates = () => {
    // Convert to decimal degrees
    const f =
      worksheetInfo.wellLocation.coordinatesWGS84.f.degrees +
      worksheetInfo.wellLocation.coordinatesWGS84.f.minutes / 60 +
      worksheetInfo.wellLocation.coordinatesWGS84.f.seconds / 3600;
    const l =
      worksheetInfo.wellLocation.coordinatesWGS84.l.degrees +
      worksheetInfo.wellLocation.coordinatesWGS84.l.minutes / 60 +
      worksheetInfo.wellLocation.coordinatesWGS84.l.seconds / 3600;

    if (f === position[0] && l === position[1]) return true;

    return false;
  };

  useEffect(() => {
    const changePosition = () => {
      // Convert to decimal degrees
      const f =
        worksheetInfo.wellLocation.coordinatesWGS84.f.degrees +
        worksheetInfo.wellLocation.coordinatesWGS84.f.minutes / 60 +
        worksheetInfo.wellLocation.coordinatesWGS84.f.seconds / 3600;
      const l =
        worksheetInfo.wellLocation.coordinatesWGS84.l.degrees +
        worksheetInfo.wellLocation.coordinatesWGS84.l.minutes / 60 +
        worksheetInfo.wellLocation.coordinatesWGS84.l.seconds / 3600;

      if (
        worksheetInfo.wellLocation.coordinatesWGS84.f.degrees &&
        worksheetInfo.wellLocation.coordinatesWGS84.f.minutes &&
        worksheetInfo.wellLocation.coordinatesWGS84.f.seconds &&
        worksheetInfo.wellLocation.coordinatesWGS84.l.degrees &&
        worksheetInfo.wellLocation.coordinatesWGS84.l.minutes &&
        worksheetInfo.wellLocation.coordinatesWGS84.l.seconds
      ) {
        setPosition([f, l]);
      } else {
        setPosition([0, 0]);
      }
    };

    if (checkIfPositionEqualsCoordinates()) return;

    setReloadMap(true);
    const timeout = setTimeout(() => {
      changePosition();
      setReloadMap(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [worksheetInfo.wellLocation.coordinatesWGS84]);

  useEffect(() => {
    // Convert position to degrees, minutes, seconds
    const setMarkerPositionToCoordinates = () => {
      const f = position[0];
      const l = position[1];

      const fDegrees = Math.floor(f);
      const fMinutes = Math.floor((f - fDegrees) * 60);
      const fSeconds = Math.round(((f - fDegrees) * 60 - fMinutes) * 60 * 10) / 10; // Round to 1 decimal

      const lDegrees = Math.floor(l);
      const lMinutes = Math.floor((l - lDegrees) * 60);
      const lSeconds = Math.round(((l - lDegrees) * 60 - lMinutes) * 60 * 10) / 10; // Round to 1 decimal

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_DEGREES',
        payload: fDegrees,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_MINUTES',
        payload: fMinutes,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_SECONDS',
        payload: fSeconds,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_DEGREES',
        payload: lDegrees,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_MINUTES',
        payload: lMinutes,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_SECONDS',
        payload: lSeconds,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_Y',
        payload: 0,
      });

      worksheetInfoDispatch({
        type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_X',
        payload: 0,
      });
    };

    if (checkIfPositionEqualsCoordinates()) return;

    if (
      worksheetInfo.wellLocation.coordinatesWGS84.f.degrees &&
      worksheetInfo.wellLocation.coordinatesWGS84.f.minutes &&
      worksheetInfo.wellLocation.coordinatesWGS84.f.seconds &&
      worksheetInfo.wellLocation.coordinatesWGS84.l.degrees &&
      worksheetInfo.wellLocation.coordinatesWGS84.l.minutes &&
      worksheetInfo.wellLocation.coordinatesWGS84.l.seconds
    ) {
      setMarkerPositionToCoordinates();
    }
  }, [position]);

  return (
    <section className="relative w-[450px] h-[500px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Προεπισκόπηση Τοποθεσίας Γεώτρησης</h1>
      {!reloadMap && position[0] !== 0 && position[1] !== 0 ? (
        <>
          <select
            className="w-full select select-bordered select-sm"
            id="company-select"
            value={userMapType}
            onChange={(e) => {
              // Check if e.target.value is a valid map type
              if (e.target.value in MapEnum) {
                const mapType = e.target.value as keyof typeof MapEnum;
                setUserMapType(mapType);
              }
            }}
          >
            {Object.keys(MapEnum).map((map) => (
              <option key={map} value={map}>
                {map.charAt(0).toUpperCase() + map.slice(1)}
              </option>
            ))}
          </select>
          <Map
            position={position}
            setPosition={setPosition}
            userZoom={userZoom}
            setUserZoom={setUserZoom}
            mapType={userMapType}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="text-gray-400">Map</p>
          <p className="text-gray-400">No location selected</p>
        </div>
      )}
    </section>
  );
}

export default Worksheet_Map;

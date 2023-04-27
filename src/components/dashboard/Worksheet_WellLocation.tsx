import { SiConvertio } from 'react-icons/si';
import dataImport from '../../assets/data.json';
import { useWorksheetContext } from '../../context/auth/WorksheetContext';

type DataType = {
  [key: string]: {
    [key: string]: string[];
  };
};

function Worksheet_WellLocation() {
  const { worksheetInfo, worksheetInfoDispatch, handleEGSA87toWGS84, handleWGS84toEGSA87 } = useWorksheetContext();

  const data: DataType = dataImport;

  const labelWidth = 'min-w-[150px]';

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Τοπογραφικά Στοιχεία Γεώτρησης</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-pe">
          <span className="label-text">Π.Ε.:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-pe"
          value={worksheetInfo.wellLocation.pe || 'default'}
          onChange={(e) => {
            // setSelectedPE(e.target.value);
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_PE',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Π.Ε.
          </option>
          {/* get keys from data obj */}
          {Object.keys(data)
            .sort()
            .map((pe) => (
              <option key={pe} value={pe}>
                {pe}
              </option>
            ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-municipality">
          <span className="label-text">Δήμος:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-municipality"
          value={worksheetInfo.wellLocation.municipality || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_MUNICIPALITY',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Δήμος
          </option>
          {worksheetInfo.wellLocation.pe &&
            data.hasOwnProperty(worksheetInfo.wellLocation.pe) &&
            Object.keys(data[worksheetInfo.wellLocation.pe])
              .sort()
              .map((municipality) => (
                <option key={municipality} value={municipality}>
                  {municipality}
                </option>
              ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-dktk">
          <span className="label-text">Δ.Κ./Τ.Κ.:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-dktk"
          value={worksheetInfo.wellLocation.dktk || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_DKTK',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Δ.Κ./Τ.Κ.
          </option>
          {/* get keys from data obj */}
          {worksheetInfo.wellLocation.pe &&
            worksheetInfo.wellLocation.municipality &&
            data.hasOwnProperty(worksheetInfo.wellLocation.pe) &&
            data[worksheetInfo.wellLocation.pe].hasOwnProperty(worksheetInfo.wellLocation.municipality) &&
            data[worksheetInfo.wellLocation.pe][worksheetInfo.wellLocation.municipality].sort().map((dktk) => (
              <option key={dktk} value={dktk}>
                {dktk}
              </option>
            ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-position">
          <span className="label-text">Θέση:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-position"
          type="text"
          value={worksheetInfo?.wellLocation?.position || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_POSITION',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-wgs-f">
          <span className="label-text">W.G.S. 84 (Φ):</span>
        </label>
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-f"
          type="number"
          placeholder="Μοίρες"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.f.degrees || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_DEGREES',
              payload: Number(e.target.value),
            });
          }}
        />
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-f"
          type="number"
          placeholder="Λεπτά"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.f.minutes || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_MINUTES',
              payload: Number(e.target.value),
            });
          }}
        />
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-f"
          type="number"
          placeholder="Δευτερόλεπτα"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.f.seconds || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_SECONDS',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="w-full well-wgs-l">
          <span className="label-text flex justify-start items-center w-full">
            W.G.S. 84 (λ):
            <SiConvertio
              className={`text-lg ml-auto ${
                worksheetInfo.wellLocation.coordinatesWGS84.f.degrees &&
                worksheetInfo.wellLocation.coordinatesWGS84.f.minutes &&
                worksheetInfo.wellLocation.coordinatesWGS84.f.seconds &&
                worksheetInfo.wellLocation.coordinatesWGS84.l.degrees &&
                worksheetInfo.wellLocation.coordinatesWGS84.l.minutes &&
                worksheetInfo.wellLocation.coordinatesWGS84.l.seconds &&
                'text-green-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out'
              }`}
              onClick={handleWGS84toEGSA87}
            />
          </span>
        </label>
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-l"
          type="number"
          placeholder="Μοίρες"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.l.degrees || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_DEGREES',
              payload: Number(e.target.value),
            });
          }}
        />
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-l"
          type="number"
          placeholder="Λεπτά"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.l.minutes || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_MINUTES',
              payload: Number(e.target.value),
            });
          }}
        />
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-wgs-l"
          type="number"
          placeholder="Δευτερόλεπτα"
          value={worksheetInfo?.wellLocation?.coordinatesWGS84.l.seconds || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_SECONDS',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-egsa w-full">
          <span className="label-text flex justify-start items-center w-full">
            Ε.Γ.Σ.Α. 87 (Y, X):
            <SiConvertio
              className={`text-lg ml-auto ${
                worksheetInfo.wellLocation.coordinatesEGSA87.y &&
                worksheetInfo.wellLocation.coordinatesEGSA87.x &&
                'text-green-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out'
              }`}
              onClick={handleEGSA87toWGS84}
            />
          </span>
        </label>
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-egsa"
          type="number"
          placeholder="Μέτρα"
          value={worksheetInfo?.wellLocation?.coordinatesEGSA87.y || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_Y',
              payload: Number(e.target.value),
            });
          }}
        />
        <input
          className="w-full input input-bordered input-sm text-xs"
          id="well-egsa"
          type="number"
          placeholder="Μέτρα"
          value={worksheetInfo?.wellLocation?.coordinatesEGSA87.x || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_X',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-altitude">
          <span className="label-text">Υψόμετρο:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-altitude"
          type="number"
          placeholder="Μέτρα"
          value={worksheetInfo?.wellLocation?.altitude || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_ALTITUDE',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_WellLocation;

import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_WellLocation() {
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();
  const labelWidth = 'min-w-[150px]';
  return (
    <section className="w-[400px] flex flex-col justify-start items-start gap-3">
      <h1 className="text-base font-bold mb-2">Τοπογραφικά Στοιχεία Γεώτρησης:</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-location-dktk">
          <span className="label-text">Δ.Κ./Τ.Κ.:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-location-dktk"
          type="text"
          value={worksheetInfo?.wellLocation?.dktk || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_DKTK',
              payload: e.target.value,
            });
          }}
        />
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
        <label className={`${labelWidth} label`} htmlFor="well-municipality">
          <span className="label-text">Δήμος:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-municipality"
          type="text"
          value={worksheetInfo?.wellLocation?.municipality || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_MUNICIPALITY',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-pe">
          <span className="label-text">Π.Ε.:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-pe"
          type="text"
          value={worksheetInfo?.wellLocation?.pe || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOCATION_PE',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-wgs-f">
          <span className="label-text">
            W.G.S. 84 <strong> (Φ) </strong>:
          </span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
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
          className="w-full input input-bordered input-sm"
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
          className="w-full input input-bordered input-sm"
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
        <label className={`${labelWidth} label`} htmlFor="well-wgs-l">
          <span className="label-text">
            W.G.S. 84 <strong> (λ) </strong>:
          </span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
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
          className="w-full input input-bordered input-sm"
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
          className="w-full input input-bordered input-sm"
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
        <label className={`${labelWidth} label`} htmlFor="well-egsa">
          <span className="label-text">
            Ε.Γ.Σ.Α. 87 <strong> (Y, X) </strong>:
          </span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
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
          className="w-full input input-bordered input-sm"
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

import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_WellFluids() {
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();
  const labelWidth = 'min-w-[170px]';
  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Δεδομένα Ρευστών Γεώτρησης</h1>
      <p className="text-sm font-bold">Σωληνωμένη:</p>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-fluids-completed-water-level">
          <span className="label-text">Στάθμη Νερού:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-fluids-completed-water-level"
          type="number"
          value={worksheetInfo?.wellFluids?.completed?.waterLevel || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_FLUIDS_COMPLETED_WATER_LEVEL',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-fluids-completed-water-cond">
          <span className="label-text">Αγωγιμότητα Νερού:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-fluids-completed-water-cond"
          type="number"
          value={worksheetInfo?.wellFluids?.completed?.waterCond || ''}
          required
          placeholder="μS/cm"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_FLUIDS_COMPLETED_WATER_COND',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <p className="text-sm font-bold">Υπό-ανόρυξη:</p>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-fluids-planned-mud-level">
          <span className="label-text">Στάθμη Πολφού:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-fluids-planned-mud-level"
          type="number"
          value={worksheetInfo?.wellFluids?.planned?.mudLevel || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_FLUIDS_PLANNED_MUD_LEVEL',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-fluids-planned-mud-cond">
          <span className="label-text">Αγωγιμότητα Πολφού:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-fluids-planned-mud-cond"
          type="text"
          value={worksheetInfo?.wellFluids?.planned?.mudCond || ''}
          required
          placeholder="μS/cm"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_FLUIDS_PLANNED_MUD_COND',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-fluids-planned-water-cond">
          <span className="label-text">Αγωγιμότητα Νερού Χρήσης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-fluids-planned-water-cond"
          type="number"
          value={worksheetInfo?.wellFluids?.planned?.waterCond || ''}
          required
          placeholder="μS/cm"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_FLUIDS_PLANNED_WATER_COND',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_WellFluids;

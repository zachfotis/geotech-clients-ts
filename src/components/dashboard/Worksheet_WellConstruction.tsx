import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_WellConstruction() {
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();
  const labelWidth = 'min-w-[170px]';
  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Τεχνικά - Κατεσκευαστικά Στοιχεία Γεώτρησης</h1>
      <p className="text-sm font-bold">Σωληνωμένη:</p>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-completed-tubing-depth">
          <span className="label-text">Βάθος Σωλήνωσης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-completed-tubing-depth"
          type="number"
          value={worksheetInfo?.wellConstruction?.completed?.tubingDepth || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DEPTH',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-completed-tubing-diameter">
          <span className="label-text">Διάμετρος Σωλήνωσης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-completed-tubing-diameter"
          type="text"
          value={worksheetInfo?.wellConstruction?.completed?.tubingDiameter || ''}
          required
          placeholder="Ίντσες"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DIAMETER',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-completed-casing-depth">
          <span className="label-text">Βάθος Περιφραγματικής:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-completed-casing-depth"
          type="number"
          value={worksheetInfo?.wellConstruction?.completed?.casingDepth || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_COMPLETED_CASING_DEPTH',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <p className="text-sm font-bold">Υπό-ανόρυξη:</p>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-planned-drilling-depth">
          <span className="label-text">Βάθος Διάτρησης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-planned-drilling-depth"
          type="number"
          value={worksheetInfo?.wellConstruction?.planned?.drillingDepth || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DEPTH',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-planned-drilling-diameter">
          <span className="label-text">Διάμετρος Διάτρησης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-planned-drilling-diameter"
          type="text"
          value={worksheetInfo?.wellConstruction?.planned?.drillingDiameter || ''}
          required
          placeholder="Ίντσες"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DIAMETER',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-construction-planned-casing-depth">
          <span className="label-text">Βάθος Περιφραγματικής:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-construction-planned-casing-depth"
          type="number"
          value={worksheetInfo?.wellConstruction?.planned?.casingDepth || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_CONSTRUCTION_PLANNED_CASING_DEPTH',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_WellConstruction;

import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_WellLogging() {
  const { worksheetInfo, worksheetInfoDispatch, inventoryData, employees } = useWorksheetContext();

  const labelWidth = 'min-w-[150px]';

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Στοιχεία Γεωφυσικής Καταγραφής</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-logging-type">
          <span className="label-text">Τύπος Καταγραφής:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-logging-type"
          value={worksheetInfo?.wellLogging?.type || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOGGING_TYPE',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Τύπος Καταγραφής
          </option>
          {inventoryData.loggingType.sort().map((loggingType) => (
            <option key={loggingType} value={loggingType}>
              {loggingType}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-logging-probe">
          <span className="label-text">S/N Φωρατή:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-logging-probe"
          value={worksheetInfo?.wellLogging?.probe || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOGGING_PROBE',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Φωρατής
          </option>
          {inventoryData.probes.sort().map((probe) => (
            <option key={probe} value={probe}>
              {probe}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-logging-depth">
          <span className="label-text">Βάθος Μέτρησης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-logging-depth"
          type="number"
          value={worksheetInfo?.wellLogging?.depth || ''}
          required
          placeholder="Μέτρα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOGGING_DEPTH',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-logging-filename">
          <span className="label-text">Όνομα Αρχείου:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-logging-filename"
          type="text"
          value={worksheetInfo?.wellLogging?.filename || ''}
          required
          placeholder="Όνομα Αρχείου"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOGGING_FILENAME',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-logging-responsible">
          <span className="label-text">Υπεύθυνος Μέτρησης:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-logging-responsible"
          value={worksheetInfo?.wellLogging?.responsible || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_WELL_LOGGING_RESPONSIBLE',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Υπεύθυνος
          </option>
          {employees.map((employee) => (
            <option key={employee.userRef} value={employee.userRef}>
              {/* capitalize first */}
              {employee.lastname.charAt(0).toUpperCase() +
                employee.lastname.slice(1) +
                ' ' +
                employee.firstname.charAt(0).toUpperCase() +
                '.'}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default Worksheet_WellLogging;

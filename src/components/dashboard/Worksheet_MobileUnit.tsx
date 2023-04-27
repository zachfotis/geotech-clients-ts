import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_MobileUnit() {
  const { worksheetInfo, worksheetInfoDispatch, inventoryData, employees } = useWorksheetContext();

  const labelWidth = 'min-w-[150px]';

  const isoToIsoLocaleDate = (isoDate: Date) => {
    // check if isoDate is a valid date
    if (isNaN(new Date(isoDate).getTime())) {
      const newDate = new Date();
      newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
      return newDate.toISOString().slice(0, 16);
    }

    const date = new Date(isoDate);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Στοιχεία Κινητού Συνεργείου</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-vehicle">
          <span className="label-text">Όχημα:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-vehicle"
          type="text"
          value={worksheetInfo?.mobileUnit?.vehicle || ''}
          required
          placeholder="Όχημα"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_VEHICLE',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-generator">
          <span className="label-text">Γεννήτρια:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-generator"
          value={worksheetInfo?.mobileUnit?.generator || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_GENERATOR',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Γεννήτρια
          </option>
          {inventoryData.generators.sort().map((generator) => (
            <option key={generator} value={generator}>
              {generator}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-drum">
          <span className="label-text">Βαρούλκο:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-drum"
          value={worksheetInfo?.mobileUnit?.drum || 'default'}
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_DRUM',
              payload: e.target.value,
            });
          }}
        >
          <option disabled value="default">
            Βαρούλκο
          </option>
          {inventoryData.drums.sort().map((drum) => (
            <option key={drum} value={drum}>
              {drum}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-crew">
          <span className="label-text">Προσωπικό:</span>
        </label>
        <select
          className="w-full input input-bordered input-sm h-[150px]"
          id="well-mobile-unit-crew"
          multiple
          value={worksheetInfo?.mobileUnit?.crew || ''}
          onChange={(e) => {
            const selectedEmployees = Array.from(e.target.selectedOptions, (option) => option.value);
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_CREW',
              payload: selectedEmployees,
            });
          }}
        >
          {employees.map((employee) => (
            <option key={employee.userRef} value={employee.userRef}>
              {employee.lastname.charAt(0).toUpperCase() +
                employee.lastname.slice(1) +
                ' ' +
                employee.firstname.charAt(0).toUpperCase() +
                '.'}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-departure">
          <span className="label-text">Αναχώρηση:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-departure"
          type="datetime-local"
          value={
            worksheetInfo?.mobileUnit?.departure
              ? isoToIsoLocaleDate(worksheetInfo?.mobileUnit?.departure)
              : isoToIsoLocaleDate(new Date())
          }
          required
          placeholder="Ημερομηνία"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_DEPARTURE',
              payload: new Date(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-arrival">
          <span className="label-text">Άφιξη:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-arrival"
          type="datetime-local"
          value={
            worksheetInfo?.mobileUnit?.arrival
              ? isoToIsoLocaleDate(worksheetInfo?.mobileUnit?.arrival)
              : isoToIsoLocaleDate(new Date())
          }
          required
          placeholder="Ημερομηνία"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_ARRIVAL',
              payload: new Date(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-start">
          <span className="label-text">Έναρξη:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-start"
          type="datetime-local"
          value={
            worksheetInfo?.mobileUnit?.start
              ? isoToIsoLocaleDate(worksheetInfo?.mobileUnit?.start)
              : isoToIsoLocaleDate(new Date())
          }
          required
          placeholder="Ώρα Έναρξης"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_START',
              payload: new Date(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-end">
          <span className="label-text">Πέρας:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-mobile-unit-end"
          type="datetime-local"
          value={
            worksheetInfo?.mobileUnit?.end
              ? isoToIsoLocaleDate(worksheetInfo?.mobileUnit?.end)
              : isoToIsoLocaleDate(new Date())
          }
          required
          placeholder="Ώρα Περάτωσης"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_END',
              payload: new Date(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-mobile-unit-overnight">
          <span className="label-text">Διανυκτέρευση:</span>
        </label>
        <input
          className="w-[25px] input input-bordered input-sm"
          id="well-mobile-unit-overnight"
          type="checkbox"
          checked={worksheetInfo?.mobileUnit?.overnight || false}
          required
          placeholder="Διανυκτέρευση"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_OVERNIGHT',
              payload: e.target.checked,
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_MobileUnit;

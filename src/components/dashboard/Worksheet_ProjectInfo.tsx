import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_ProjectInfo() {
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();
  const labelWidth = 'min-w-[150px]';
  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Στοιχεία Έργου</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_date">
          <span className="label-text">Ημερομηνία:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_date"
          type="date"
          value={worksheetInfo?.projectInfo?.date.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10)}
          required
          onChange={(e) => {
            // Check if date is valid
            if (isNaN(new Date(e.target.value).getTime())) {
              return;
            }
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_DATE',
              payload: new Date(e.target.value),
            });

            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_DEPARTURE',
              payload: new Date(e.target.value),
            });

            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_ARRIVAL',
              payload: new Date(e.target.value),
            });

            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_START',
              payload: new Date(e.target.value),
            });

            worksheetInfoDispatch({
              type: 'SET_MOBILE_UNIT_END',
              payload: new Date(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_client">
          <span className="label-text">Πελάτης:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_client"
          type="text"
          placeholder="Επωνυμία ή Όνομα Πελάτη"
          value={worksheetInfo?.projectInfo?.client || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_CLIENT',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_project">
          <span className="label-text">Έργο:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_project"
          type="text"
          placeholder="Τίτλος Έργου"
          value={worksheetInfo?.projectInfo?.project || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_PROJECT',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_project_manager">
          <span className="label-text">Ανάδοχος Έργου:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_project_manager"
          type="text"
          placeholder="Επωνυμία ή Όνομα Αναδόχου"
          value={worksheetInfo?.projectInfo?.projectManager || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_PROJECT_MANAGER',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_charge">
          <span className="label-text">Χρέωση Εργασίας:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_charge"
          type="text"
          placeholder="Επωνυμία ή Όνομα"
          value={worksheetInfo?.projectInfo?.charge || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_CHARGE',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="project_info_rig_company">
          <span className="label-text">Εταιρία Γεωτρυπάνου:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="project_info_rig_company"
          type="text"
          placeholder="Επωνυμία ή Όνομα Εταιρίας"
          value={worksheetInfo?.projectInfo?.rigCompany || ''}
          required
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_PROJECT_INFO_RIG_COMPANY',
              payload: e.target.value,
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_ProjectInfo;

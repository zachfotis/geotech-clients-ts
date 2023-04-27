import { useWorksheetContext } from '../../context/auth/WorksheetContext';

function Worksheet_ContactInfo() {
  const { worksheetInfo, worksheetInfoDispatch } = useWorksheetContext();

  const labelWidth = 'min-w-[150px]';

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Στοιχεία Επικοινωνίας</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-contact-info-client">
          <span className="label-text">Τηλ. Πελάτη:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-contact-info-client"
          type="tel"
          value={worksheetInfo?.contactInfo?.client || ''}
          required
          placeholder="Τηλέφωνο Πελάτη"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_CONTACT_INFO_CLIENT',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-contact-info-contractor">
          <span className="label-text">Τηλ. Αναδόχου:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-contact-info-contractor"
          type="tel"
          value={worksheetInfo?.contactInfo?.contractor || ''}
          required
          placeholder="Τηλέφωνο Αναδόχου"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_CONTACT_INFO_CONTRACTOR',
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="well-contact-info-operator">
          <span className="label-text">Τηλ. Χειριστή:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="well-contact-info-operator"
          type="tel"
          value={worksheetInfo?.contactInfo?.operator || ''}
          required
          placeholder="Τηλέφωνο Χειριστή"
          onChange={(e) => {
            worksheetInfoDispatch({
              type: 'SET_CONTACT_INFO_OPERATOR',
              payload: e.target.value,
            });
          }}
        />
      </div>
    </section>
  );
}

export default Worksheet_ContactInfo;

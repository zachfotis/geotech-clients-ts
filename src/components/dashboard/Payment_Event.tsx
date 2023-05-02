import { usePaymentContext } from '../../context/auth/PaymentContext';
import { EventTypeEnum } from '../../types';

function Payment_Event() {
  const { savePaymentToDB, isPaymentSaveOnDB, event, setEvent, saveEventToDB } = usePaymentContext();
  const labelWidth = 'min-w-[120px]';

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Νέο Γεγονός</h1>
      {isPaymentSaveOnDB ? (
        <>
          <div className="w-full flex justify-start items-center gap-5">
            <label className={`${labelWidth} label`} htmlFor="event_date">
              <span className="label-text">Ημερομηνία:</span>
            </label>
            <input
              className="w-full input input-bordered input-sm"
              id="event_date"
              type="date"
              required
              value={event?.eventDate?.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                // Check if date is valid
                if (isNaN(new Date(e.target.value).getTime())) {
                  return;
                }
                setEvent({
                  ...event,
                  eventDate: new Date(e.target.value),
                });
              }}
            />
          </div>
          <div className="w-full flex justify-start items-center gap-5">
            <label className={`${labelWidth} label`} htmlFor="well-pe">
              <span className="label-text">Τύπος</span>
            </label>
            <select
              className="w-full input input-bordered input-sm"
              value={event?.type || 'default'}
              onChange={(e) => {
                setEvent({
                  ...event,
                  type: e.target.value as EventTypeEnum,
                });
              }}
              id="event-type"
            >
              <option disabled value="default">
                Τύπος Γεγονότος
              </option>
              {Object.values(EventTypeEnum).map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-start items-center gap-5">
            <label className={`${labelWidth} label`} htmlFor="event_amount">
              <span className="label-text">Ποσό:</span>
            </label>
            <input
              className="w-full input input-bordered input-sm"
              id="event_amount"
              type="number"
              placeholder="Ευρώ"
              value={event?.amount || ''}
              onChange={(e) => {
                setEvent({
                  ...event,
                  amount: Number(e.target.value),
                });
              }}
              required
            />
          </div>
          <div className="w-full flex justify-start items-center gap-5">
            <label className={`${labelWidth} label`} htmlFor="event_comment">
              <span className="label-text">Σχόλιο:</span>
            </label>
            <textarea
              className="w-full min-h-[100px] input input-bordered input-sm"
              placeholder="Σχόλιο"
              id="event_comment"
              value={event?.comment || ''}
              onChange={(e) => {
                setEvent({
                  ...event,
                  comment: e.target.value,
                });
              }}
              required
            />
          </div>
          <button className="mt-auto btn btn-outline btn-success" onClick={saveEventToDB}>
            Προσθηκη Γεγονοτος
          </button>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="text-gray-400">Η πληρωμή δεν έχει αποθηκευτεί</p>
        </div>
      )}
    </section>
  );
}

export default Payment_Event;

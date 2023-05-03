import ProgressBar from 'react-customizable-progressbar';
import { MdDelete } from 'react-icons/md';
import { usePaymentContext } from '../../context/auth/PaymentContext';

function Payment_Info() {
  const { paymentInfo, paymentInfoDispatch, savePaymentToDB, deletePaymentFromDB } = usePaymentContext();
  const labelWidth = 'min-w-[150px]';

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Στοιχεία Πληρωμής</h1>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="payment_total_amount">
          <span className="label-text">Κόστος Έργου:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="payment_total_amount"
          type="number"
          placeholder="Ευρώ"
          value={paymentInfo?.totalAmount || ''}
          required
          onChange={(e) => {
            paymentInfoDispatch({
              type: 'SET_TOTAL_AMOUNT',
              payload: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="payment_paid_amount">
          <span className="label-text">Πληρωμένο Ποσό:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="payment_paid_amount"
          type="number"
          placeholder="Ευρώ"
          value={paymentInfo?.events.reduce((acc, event) => acc + event.amount, 0) || 0}
          disabled
        />
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <label className={`${labelWidth} label`} htmlFor="payment_pending_amount">
          <span className="label-text">Υπολοιπόμενο Ποσό:</span>
        </label>
        <input
          className="w-full input input-bordered input-sm"
          id="payment_pending_amount"
          type="number"
          placeholder="Ευρώ"
          value={paymentInfo?.totalAmount - paymentInfo?.events.reduce((acc, event) => acc + event.amount, 0) || 0}
          disabled
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <ProgressBar
          className="my-5"
          radius={100}
          progress={
            (paymentInfo?.events.reduce((acc, event) => acc + event.amount, 0) / paymentInfo?.totalAmount) * 100 || 0
          }
          strokeColor={
            (paymentInfo?.events.reduce((acc, event) => acc + event.amount, 0) / paymentInfo?.totalAmount) * 100 >= 100
              ? '#10B981'
              : '#EF4444'
          }
          children={
            <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full gap-2">
              <span className="text-2xl font-bold">
                {paymentInfo?.events.reduce((acc, event) => acc + event.amount, 0) || 0}€
              </span>
              <span className="text-sm font-bold">από {paymentInfo?.totalAmount || 0}€</span>
            </div>
          }
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <button className="mt-auto btn btn-outline btn-success" onClick={savePaymentToDB}>
          Αποθηκευση Στοιχειων
        </button>
        <MdDelete
          className="text-red-400 cursor-pointer text-2xl hover:text-red-500"
          onClick={() => {
            deletePaymentFromDB(paymentInfo.id);
          }}
        />
      </div>
    </section>
  );
}

export default Payment_Info;

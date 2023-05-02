import { format } from 'date-fns';
import { BsPatchQuestion } from 'react-icons/bs';
import { FcAdvance, FcApproval, FcCancel } from 'react-icons/fc';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { TfiReceipt } from 'react-icons/tfi';
import { usePaymentContext } from '../../context/auth/PaymentContext';
import { EventTypeEnum } from '../../types';

function Payment_Timeline() {
  const { paymentInfo } = usePaymentContext();

  return (
    <section className="w-[450px] flex flex-col justify-start items-start gap-3 border p-3 rounded-md shadow-md">
      <h1 className="text-base font-bold mb-2">Χρονολόγιο Γεγονότων</h1>
      {paymentInfo?.events?.length > 0 ? (
        <div className="w-full flex flex-col justify-start items-start gap-5">
          {paymentInfo?.events
            .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
            .map((event, index) => (
              <div key={index} className="w-full flex justify-center items-start gap-5">
                {event.type === EventTypeEnum.PAYMENT && <RiExchangeDollarLine className="text-green-600 text-3xl" />}
                {event.type === EventTypeEnum.ADVANCE && <FcAdvance className="text-blue-600 text-3xl" />}
                {event.type === EventTypeEnum.INVOICE && <TfiReceipt className="text-yellow-600 text-3xl" />}
                {event.type === EventTypeEnum.SETTLEMENT && <FcApproval className="text-violet-600 text-3xl" />}
                {event.type === EventTypeEnum.CANCEL && <FcCancel className="text-red-600 text-3xl" />}
                {event.type === EventTypeEnum.OTHER && <BsPatchQuestion className="text-gray-600 text-3xl" />}

                <div className="w-full">
                  <p className="text-base font-[500]">{event.type + ' - ' + event.amount + '€'}</p>
                  <p className="text-xs text-gray-500 font-[300]">{format(event.eventDate, 'LLLL d, yyyy')}</p>
                  {/* comments */}
                  {event.comment && <p className="text-xs text-gray-700 font-[300]">{event.comment}</p>}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="text-gray-400">Δεν υπάρχουν γεγονότα</p>
        </div>
      )}
    </section>
  );
}

export default Payment_Timeline;

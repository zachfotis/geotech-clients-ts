import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Worksheet } from '../../context/auth/WorksheetContext';
import Map from '../common/Map';

interface ProjectMapProps {
  projectID: number;
}

function Project_Map({ projectID }: ProjectMapProps) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [userZoom, setUserZoom] = useState(12);

  useEffect(() => {
    const fetchWorksheetFromDB = async (projectID: number) => {
      try {
        const db = getFirestore();
        const collectionRef = collection(db, 'worksheets');
        const q1 = where('projectID', '==', projectID);
        const queryRef = query(collectionRef, q1);
        const dataSnap = await getDocs(queryRef);
        const data = dataSnap.docs.map((doc) => doc.data());

        if (data.length > 0 && data[0].projectID) {
          const { wellLocation } = data[0] as Worksheet;
          if (wellLocation) {
            const f1 = wellLocation.coordinatesWGS84.f.degrees;
            const f2 = wellLocation.coordinatesWGS84.f.minutes;
            const f3 = wellLocation.coordinatesWGS84.f.seconds;
            const f = f1 + f2 / 60 + f3 / 3600;
            const l1 = wellLocation.coordinatesWGS84.l.degrees;
            const l2 = wellLocation.coordinatesWGS84.l.minutes;
            const l3 = wellLocation.coordinatesWGS84.l.seconds;
            const l = l1 + l2 / 60 + l3 / 3600;

            setPosition([f, l]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorksheetFromDB(projectID);
  }, []);

  if (!position[0] && !position[1]) return null;

  return (
    <section className="flex-auto w-full lg:w-[380px] min-h-[300px] flex flex-col justify-start items-start gap-5 border border-blue-800 rounded-md shadow-md">
      {position[0] !== 0 && position[1] !== 0 ? (
        <Map position={position} userZoom={userZoom} setUserZoom={setUserZoom} draggable={false} />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="text-gray-400">Map</p>
          <p className="text-gray-400">No available location</p>
        </div>
      )}
    </section>
  );
}

export default Project_Map;

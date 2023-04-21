import { Timestamp, collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useFirebase } from './FirebaseContext';

type WorksheetContextType = {
  worksheetInfo: Worksheet;
  worksheetInfoDispatch: React.Dispatch<WorksheetActions>;
  fetchWorksheetFromDB: (projectIDstring: number) => void;
  saveWorksheetToDB: () => void;
};

export type Worksheet = {
  id: string;
  projectID: number;
  createdAt: Date;
  updatedAt: Date;
  projectInfo: {
    date: Date;
    client: string;
    project: string;
    projectManager: string;
    charge: string;
    rigCompany: string;
  };
  wellLocation: {
    dktk: string;
    position: string;
    municipality: string;
    pe: string;
    coordinatesWGS84: {
      f: {
        degrees: number;
        minutes: number;
        seconds: number;
      };
      l: {
        degrees: number;
        minutes: number;
        seconds: number;
      };
    };
    coordinatesEGSA87: {
      y: number;
      x: number;
    };
    altitude: number;
  };
  wellConstruction: {
    completed: {
      tubingDepth: number;
      tubingDiameter: string;
      casingDepth: number;
    };
    planned: {
      drillingDepth: number;
      drillingDiameter: string;
      casingDepth: number;
    };
  };
};

type WorksheetActions =
  | { type: 'SET_PROJECT_ID'; payload: number }
  | { type: 'RESET_WORKSHEET' }
  | { type: 'SET_WORKSHEET'; payload: Worksheet }
  | { type: 'SET_PROJECT_UPDATE_DATE' }
  | { type: 'SET_PROJECT_INFO_DATE'; payload: Date }
  | { type: 'SET_PROJECT_INFO_CLIENT'; payload: string }
  | { type: 'SET_PROJECT_INFO_PROJECT'; payload: string }
  | { type: 'SET_PROJECT_INFO_PROJECT_MANAGER'; payload: string }
  | { type: 'SET_PROJECT_INFO_CHARGE'; payload: string }
  | { type: 'SET_PROJECT_INFO_RIG_COMPANY'; payload: string }
  | { type: 'SET_WELL_LOCATION_DKTK'; payload: string }
  | { type: 'SET_WELL_LOCATION_POSITION'; payload: string }
  | { type: 'SET_WELL_LOCATION_MUNICIPALITY'; payload: string }
  | { type: 'SET_WELL_LOCATION_PE'; payload: string }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_DEGREES'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_MINUTES'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_F_SECONDS'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_DEGREES'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_MINUTES'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_WGS84_L_SECONDS'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_Y'; payload: number }
  | { type: 'SET_WELL_LOCATION_COORDINATES_EGSA87_X'; payload: number }
  | { type: 'SET_WELL_LOCATION_ALTITUDE'; payload: number }
  | { type: 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DEPTH'; payload: number }
  | { type: 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DIAMETER'; payload: string }
  | { type: 'SET_WELL_CONSTRUCTION_COMPLETED_CASING_DEPTH'; payload: number }
  | { type: 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DEPTH'; payload: number }
  | { type: 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DIAMETER'; payload: string }
  | { type: 'SET_WELL_CONSTRUCTION_PLANNED_CASING_DEPTH'; payload: number };

export const createInitialState = (): Worksheet => {
  return {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    projectID: 0,
    projectInfo: {
      date: new Date(),
      client: '',
      project: '',
      projectManager: '',
      charge: '',
      rigCompany: '',
    },
    wellLocation: {
      dktk: '',
      position: '',
      municipality: '',
      pe: '',
      coordinatesWGS84: {
        f: {
          degrees: 0,
          minutes: 0,
          seconds: 0,
        },
        l: {
          degrees: 0,
          minutes: 0,
          seconds: 0,
        },
      },
      coordinatesEGSA87: {
        y: 0,
        x: 0,
      },
      altitude: 0,
    },
    wellConstruction: {
      completed: {
        tubingDepth: 0,
        tubingDiameter: '',
        casingDepth: 0,
      },
      planned: {
        drillingDepth: 0,
        drillingDiameter: '',
        casingDepth: 0,
      },
    },
  };
};

const WorksheetContext = createContext<WorksheetContextType>({
  worksheetInfo: createInitialState(),
  worksheetInfoDispatch: () => null,
  fetchWorksheetFromDB: () => null,
  saveWorksheetToDB: () => null,
});

export const useWorksheetContext = () => {
  return useContext(WorksheetContext);
};

const reducer = (state: Worksheet, action: WorksheetActions) => {
  switch (action.type) {
    case 'SET_PROJECT_ID':
      return {
        ...state,
        projectID: action.payload,
      };
    case 'RESET_WORKSHEET':
      return createInitialState();
    case 'SET_WORKSHEET':
      return action.payload;
    case 'SET_PROJECT_UPDATE_DATE':
      return {
        ...state,
        updatedAt: new Date(),
      };
    case 'SET_PROJECT_INFO_DATE':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          date: action.payload,
        },
      };
    case 'SET_PROJECT_INFO_CLIENT':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          client: action.payload,
        },
      };
    case 'SET_PROJECT_INFO_PROJECT':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          project: action.payload,
        },
      };
    case 'SET_PROJECT_INFO_PROJECT_MANAGER':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          projectManager: action.payload,
        },
      };
    case 'SET_PROJECT_INFO_CHARGE':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          charge: action.payload,
        },
      };
    case 'SET_PROJECT_INFO_RIG_COMPANY':
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          rigCompany: action.payload,
        },
      };
    case 'SET_WELL_LOCATION_DKTK':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          dktk: action.payload,
        },
      };
    case 'SET_WELL_LOCATION_POSITION':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          position: action.payload,
        },
      };
    case 'SET_WELL_LOCATION_MUNICIPALITY':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          municipality: action.payload,
        },
      };
    case 'SET_WELL_LOCATION_PE':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          pe: action.payload,
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_F_DEGREES':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            f: {
              ...state.wellLocation.coordinatesWGS84.f,
              degrees: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_F_MINUTES':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            f: {
              ...state.wellLocation.coordinatesWGS84.f,
              minutes: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_F_SECONDS':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            f: {
              ...state.wellLocation.coordinatesWGS84.f,
              seconds: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_L_DEGREES':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            l: {
              ...state.wellLocation.coordinatesWGS84.l,
              degrees: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_L_MINUTES':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            l: {
              ...state.wellLocation.coordinatesWGS84.l,
              minutes: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_WGS84_L_SECONDS':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesWGS84: {
            ...state.wellLocation.coordinatesWGS84,
            l: {
              ...state.wellLocation.coordinatesWGS84.l,
              seconds: action.payload,
            },
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_EGSA87_X':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesEGSA87: {
            ...state.wellLocation.coordinatesEGSA87,
            x: action.payload,
          },
        },
      };
    case 'SET_WELL_LOCATION_COORDINATES_EGSA87_Y':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          coordinatesEGSA87: {
            ...state.wellLocation.coordinatesEGSA87,
            y: action.payload,
          },
        },
      };
    case 'SET_WELL_LOCATION_ALTITUDE':
      return {
        ...state,
        wellLocation: {
          ...state.wellLocation,
          altitude: action.payload,
        },
      };
    case 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DEPTH':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          completed: {
            ...state.wellConstruction.completed,
            tubingDepth: action.payload,
          },
        },
      };
    case 'SET_WELL_CONSTRUCTION_COMPLETED_TUBING_DIAMETER':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          completed: {
            ...state.wellConstruction.completed,
            tubingDiameter: action.payload,
          },
        },
      };
    case 'SET_WELL_CONSTRUCTION_COMPLETED_CASING_DEPTH':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          completed: {
            ...state.wellConstruction.completed,
            casingDepth: action.payload,
          },
        },
      };
    case 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DEPTH':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          planned: {
            ...state.wellConstruction.planned,
            drillingDepth: action.payload,
          },
        },
      };
    case 'SET_WELL_CONSTRUCTION_PLANNED_DRILLING_DIAMETER':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          planned: {
            ...state.wellConstruction.planned,
            drillingDiameter: action.payload,
          },
        },
      };
    case 'SET_WELL_CONSTRUCTION_PLANNED_CASING_DEPTH':
      return {
        ...state,
        wellConstruction: {
          ...state.wellConstruction,
          planned: {
            ...state.wellConstruction.planned,
            casingDepth: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export const WorksheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [worksheetInfo, worksheetInfoDispatch] = useReducer(reducer, createInitialState());
  const { setLoading } = useFirebase();

  const fetchWorksheetFromDB = async (projectID: number) => {
    worksheetInfoDispatch({ type: 'RESET_WORKSHEET' });
    setLoading(true);
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'worksheets');
      const q1 = where('projectID', '==', projectID);
      const queryRef = query(collectionRef, q1);
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => doc.data());

      if (data.length > 0 && data[0].projectID) {
        worksheetInfoDispatch({
          type: 'SET_WORKSHEET',
          payload: {
            ...worksheetInfo,
            ...data[0],
            projectInfo: {
              ...data[0].projectInfo,
              date: new Date(
                new Timestamp(data[0].projectInfo.date.seconds, data[0].projectInfo.date.nanoseconds).toDate()
              ),
            },
          } as Worksheet,
        });
      } else {
        if (projectID) {
          worksheetInfoDispatch({ type: 'RESET_WORKSHEET' });
          worksheetInfoDispatch({ type: 'SET_PROJECT_ID', payload: projectID });
        } else {
          toast.error('Project ID not found');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveWorksheetToDB = async () => {
    // Update the updatedAt field
    worksheetInfoDispatch({ type: 'SET_PROJECT_UPDATE_DATE' });
    setLoading(true);
    try {
      const db = getFirestore();
      const docRef = doc(db, 'worksheets', worksheetInfo.id);
      await setDoc(docRef, worksheetInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorksheetContext.Provider
      value={{
        worksheetInfo,
        worksheetInfoDispatch,
        fetchWorksheetFromDB,
        saveWorksheetToDB,
      }}
    >
      {children}
    </WorksheetContext.Provider>
  );
};

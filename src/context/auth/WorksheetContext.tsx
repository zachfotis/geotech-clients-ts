import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

type WorksheetContextType = {
  worksheetInfo: Worksheet;
  worksheetInfoDispatch: React.Dispatch<WorksheetActions>;
};

type Worksheet = {
  id: string;
  projectInfo: {
    date: Date;
    client: string;
    project: string;
    projectManager: string;
    charge: string;
    rigCompany: string;
  };
};

type WorksheetActions =
  | { type: 'SET_PROJECT_INFO_DATE'; payload: Date }
  | { type: 'SET_PROJECT_INFO_CLIENT'; payload: string }
  | { type: 'SET_PROJECT_INFO_PROJECT'; payload: string }
  | { type: 'SET_PROJECT_INFO_PROJECT_MANAGER'; payload: string }
  | { type: 'SET_PROJECT_INFO_CHARGE'; payload: string }
  | { type: 'SET_PROJECT_INFO_RIG_COMPANY'; payload: string };

const initialState: Worksheet = {
  id: uuidv4(),
  projectInfo: {
    date: new Date(),
    client: '',
    project: '',
    projectManager: '',
    charge: '',
    rigCompany: '',
  },
};

const WorksheetContext = createContext<WorksheetContextType>({
  worksheetInfo: initialState,
  worksheetInfoDispatch: () => null,
});

export const useWorksheetContext = () => {
  return useContext(WorksheetContext);
};

const reducer = (state: Worksheet, action: WorksheetActions) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export const WorksheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [worksheetInfo, worksheetInfoDispatch] = useReducer(reducer, initialState);

  return (
    <WorksheetContext.Provider
      value={{
        worksheetInfo,
        worksheetInfoDispatch,
      }}
    >
      {children}
    </WorksheetContext.Provider>
  );
};

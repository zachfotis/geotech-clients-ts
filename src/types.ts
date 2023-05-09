export type Project = {
  companyName: string;
  companyRef: string;
  date: Date;
  id: number;
  timestamp: Date;
  title: string;
  userRef: string;
};

export type Company = {
  address: string;
  businessType: string[];
  city: string;
  country: string;
  email: string;
  name: string;
  number: string;
  phone: string;
  timestamp: Date;
  title: string;
  vat: string;
  zip: string;
};

export enum EventTypeEnum {
  INVOICE = 'ΕΚΔΟΣΗ ΤΙΜΟΛΟΓΙΟΥ',
  ADVANCE = 'ΠΡΟΚΑΤΑΒΟΛΗ',
  PAYMENT = 'ΠΛΗΡΩΜΗ',
  SETTLEMENT = 'ΕΞΟΦΛΗΣΗ',
  CANCEL = 'ΑΚΥΡΩΣΗ',
  OTHER = 'ΑΛΛΟ',
}

export type Event = {
  id: string;
  paymentID: string;
  createdAt: Date;
  updatedAt: Date;
  eventDate: Date;
  amount: number;
  type: EventTypeEnum;
  comment: string;
};

export type Payment = {
  id: string;
  projectID: number;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  events: Event[];
};

export type User = {
  accountType: string;
  email: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  userRef: string;
  uid?: string;
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
  wellFluids: {
    completed: {
      waterLevel: number;
      waterCond: number;
    };
    planned: {
      mudLevel: number;
      mudCond: number;
      waterCond: number;
    };
  };
  wellLogging: {
    type: string;
    probe: string;
    depth: number;
    filename: string;
    responsible: string;
  };
  mobileUnit: {
    vehicle: string;
    generator: string;
    drum: string;
    crew: string[];
    departure: Date;
    arrival: Date;
    start: Date;
    end: Date;
    overnight: boolean;
  };
  contactInfo: {
    client: string;
    contractor: string;
    operator: string;
  };
};

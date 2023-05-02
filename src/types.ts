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

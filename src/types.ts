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

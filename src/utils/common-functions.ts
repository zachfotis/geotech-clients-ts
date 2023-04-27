import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { Company, Project } from '../types';

type GetCompanyProps = (
  setLoading: (loading: boolean) => void,
  setCompanies: (companies: Company[]) => void
) => Promise<void>;

export const getCompanies: GetCompanyProps = async (setLoading, setCompanies) => {
  setLoading(true);

  try {
    // Get Companies
    let q = query(collection(db, 'companies'), orderBy('title', 'asc'));
    const companiesSnap = await getDocs(q);
    const companies = companiesSnap.docs.map((doc) => doc.data()) as Company[];
    setCompanies(companies);
  } catch (error) {
    toast.error('Error fetching companies');
  }

  setLoading(false);
};

type GetProjectsProps = (
  setLoading: (loading: boolean) => void,
  setProjects: (projects: Project[]) => void,
  companyVAT: Company['vat']
) => Promise<void>;

export const getProjects: GetProjectsProps = async (setLoading, setProjects, companyVAT) => {
  setLoading(true);

  try {
    // Get Projects for selected company
    let q = query(collection(db, 'projects'), where('companyRef', '==', companyVAT), orderBy('title', 'asc'));
    const projectsSnap = await getDocs(q);
    const projects = projectsSnap.docs.map((doc) => doc.data()) as Project[];

    setProjects(projects);
  } catch (error) {
    toast.error('Error fetching projects');
  }

  setLoading(false);
};

type GetInventoryProps = (
  setLoading: (loading: boolean) => void,
  setInventory: (inventory: InventoryData) => void
) => Promise<void>;

export type InventoryData = {
  drums: string[];
  generators: string[];
  probes: string[];
  loggingType: string[];
};

export const getInventory: GetInventoryProps = async (setLoading, setInventory) => {
  setLoading(true);

  try {
    const docRef = doc(db, 'utilities', 'inventory-data');
    const dataSnap = await getDoc(docRef);
    const data = dataSnap.data();

    if (!data) {
      toast.error('Error fetching inventory');
      return;
    }

    if (!data.drums) data.drums = [];
    if (!data.generators) data.generators = [];
    if (!data.probes) data.probes = [];
    if (!data.loggingType) data.loggingType = [];

    setInventory(data as InventoryData);
  } catch (error) {
    toast.error('Error fetching inventory');
  }

  setLoading(false);
};

export type UserType = {
  accountType: string;
  email: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  timestamp: Date;
  userRef: string;
};

type GetEmployeesProps = (
  setLoading: (loading: boolean) => void,
  setEmployees: (employees: UserType[]) => void
) => Promise<void>;

export const getEmployees: GetEmployeesProps = async (setLoading, setEmployees) => {
  setLoading(true);

  try {
    // Get Employees
    let q = query(collection(db, 'users'), where('accountType', '==', 'admin'), orderBy('lastname', 'asc'));
    const employeesSnap = await getDocs(q);
    const employees = employeesSnap.docs.map((doc) => doc.data());

    if (!employees) {
      toast.error('Error fetching employees');
      return;
    }

    // Check if every employee is a User type
    const employeesVerified: UserType[] = [];
    employees.forEach((employee) => {
      if (
        employee.accountType === 'admin' &&
        employee.email &&
        employee.firstname &&
        employee.lastname &&
        employee.timestamp &&
        employee.userRef
      ) {
        employeesVerified.push(employee as UserType);
      }
    });

    setEmployees(employeesVerified);
  } catch (error) {
    console.log(error);
    toast.error('Error fetching employees');
  }

  setLoading(false);
};

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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

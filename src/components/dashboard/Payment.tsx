import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFirebase } from '../../context/auth/FirebaseContext';
import { usePaymentContext } from '../../context/auth/PaymentContext';
import { Company, Project } from '../../types';
import { getCompanies, getProjects } from '../../utils/common-functions';
import Payment_Event from './Payment_Event';
import Payment_Info from './Payment_Info';
import Payment_Timeline from './Payment_Timeline';

function Payment() {
  const {
    state,
  }: {
    state: Project;
  } = useLocation();

  const { setLoading } = useFirebase();

  const { fetchPaymentFromDB } = usePaymentContext();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isReadyToCreate, setIsReadyToCreate] = useState(false);

  // Use useLocation State
  useEffect(() => {
    if (state && !selectedCompany) {
      // Get company from state
      const stateCompany = companies.find((company) => company.vat === state.companyRef);

      if (stateCompany) {
        setSelectedCompany(stateCompany);
      }
    }

    if (state && !selectedProject) {
      // Get project from state
      const stateProject = projects.find((project) => project.id === state.id);

      if (stateProject) {
        setSelectedProject(stateProject);
      }
    }
  }, [companies, projects]);

  // Get Companies
  useEffect(() => {
    getCompanies(setLoading, setCompanies);
  }, []);

  // Get Projects
  useEffect(() => {
    if (selectedCompany) {
      selectedProject && setSelectedProject(null);
      getProjects(setLoading, setProjects, selectedCompany.vat);
    }
  }, [selectedCompany]);

  // Initialize worksheet
  useEffect(() => {
    if (selectedProject) {
      fetchPaymentFromDB(selectedProject.id);
    }
  }, [selectedProject]);

  // Check if ready to submit
  useEffect(() => {
    if (selectedCompany && selectedProject) {
      setIsReadyToCreate(true);
    } else {
      setIsReadyToCreate(false);
    }
  }, [selectedCompany, selectedProject]);

  return (
    <section className="w-full flex flex-col justify-start items-start flex-wrap gap-10 p-5">
      <h1 className="text-xl font-bold">Modify Project's Payment Status</h1>
      {/* SELECTIONS */}
      <div className="flex justify-start items-center gap-10 flex-wrap">
        {/* Select company */}
        <div>
          <label className="label" htmlFor="company-select">
            <span className="label-text">Select Company</span>
          </label>
          <select
            className="w-[300px] select select-bordered select-sm"
            id="company-select"
            value={selectedCompany?.vat || 'default'}
            onChange={(e) => {
              const selectedCompany = companies.find((company) => company.vat === e.target.value);
              if (selectedCompany) {
                setSelectedCompany(selectedCompany);
              }
            }}
          >
            <option disabled value="default">
              Company
            </option>
            {companies.map((company) => (
              <option key={company.vat} value={company.vat}>
                {company.title}
              </option>
            ))}
          </select>
        </div>
        {/* Select project */}
        <div>
          <label className="label" htmlFor="project-select">
            <span className="label-text">Select Project</span>
          </label>
          <select
            className="w-[300px] select select-bordered select-sm"
            id="project-select"
            value={selectedProject?.id || 'default'}
            onChange={(e) => {
              const selectedProject = projects.find((project) => project.id === Number(e.target.value));
              if (selectedProject) {
                setSelectedProject(selectedProject);
              }
            }}
          >
            <option disabled value="default">
              Project
            </option>
            {projects.length > 0 &&
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* ERRORS */}
      <h1 className={`${isReadyToCreate ? 'bg-green-400' : 'bg-red-400'} p-3 rounded-lg`}>
        {selectedCompany?.vat ? `${selectedCompany.title}` : 'Select a company'} -{' '}
        {selectedProject?.id ? `${selectedProject.id}` : 'Select a project'}
      </h1>
      {selectedProject?.id && (
        <div className="w-full flex justify-start items-stretch flex-wrap gap-10">
          <Payment_Info />
          <Payment_Event />
          <Payment_Timeline />
        </div>
      )}
    </section>
  );
}

export default Payment;

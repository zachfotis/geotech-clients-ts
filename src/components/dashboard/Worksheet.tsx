import { useEffect, useState } from 'react';
import { useFirebase } from '../../context/auth/FirebaseContext';
import { useWorksheetContext } from '../../context/auth/WorksheetContext';
import { Company, Project } from '../../types';
import { getCompanies, getProjects } from '../../utils/common-functions';
import Worksheet_ProjectInfo from './Worksheet_ProjectInfo';

function Worksheet() {
  const { setLoading } = useFirebase();
  const { worksheetInfo } = useWorksheetContext();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isReadyToCreate, setIsReadyToCreate] = useState(false);

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
      <h1 className="text-xl font-bold">Add Worksheet to Project</h1>
      {/* SELECTIONS */}
      <div className="flex justify-start items-center gap-10">
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
      {/* WORKSHEET */}
      {worksheetInfo.id}
      <div className="w-full flex justify-start items-start flex-wrap gap-20">
        <Worksheet_ProjectInfo />
      </div>
    </section>
  );
}

export default Worksheet;

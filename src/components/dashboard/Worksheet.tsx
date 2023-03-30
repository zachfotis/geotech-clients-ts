import { useEffect, useState } from 'react';
import { useFirebase } from '../../context/auth/FirebaseContext';
import { Company, Project } from '../../types';
import { getCompanies, getProjects } from '../../utils/common-functions';

function Worksheet() {
  const { setLoading } = useFirebase();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

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
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [selectedCompany, selectedProject]);

  return (
    <section className="w-full flex flex-col justify-start items-start flex-wrap gap-5 p-5">
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
      {/* WORKSHEET */}
      <h1 className={`mt-10 ${isReadyToSubmit ? 'bg-green-400' : 'bg-red-400'}  p-5 rounded-lg`}>
        {selectedCompany?.vat ? `${selectedCompany.title}` : 'No company selected'} -{' '}
        {selectedProject?.id ? `${selectedProject.id}` : 'No project selected'}
      </h1>
    </section>
  );
}

export default Worksheet;

import { Company } from '../../types';

interface CompanyInfoProps {
  projectCompany: Company;
}

function Project_CompanyInfo({ projectCompany }: CompanyInfoProps) {
  const commonClass0 = 'w-full flex justify-start items-start gap-0 flex-col md:flex-row md:gap-5 md:items-start';
  const commonClass1 = 'min-w-[100px] text-lg';
  const commonClass2 = 'text-lg';

  return (
    <section className="flex-auto w-full lg:w-[380px] flex flex-col justify-start items-start gap-5 border border-blue-800 p-5 rounded-md shadow-md">
      <h1 className="text-lg font-bold">Company Info</h1>
      <div className="flex flex-col justify-start items-start gap-3 py-2">
        <div className={commonClass0}>
          <p className={commonClass1}>Company:</p>
          <p className={commonClass2}>{projectCompany?.name + ` (${projectCompany?.vat})` || ''}</p>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Address:</p>
          <p className={commonClass2}>{projectCompany?.address || ''}</p>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Email:</p>
          <a href={`mailto:${projectCompany?.email || ''}`} className={commonClass2}>
            {projectCompany?.email || ''}
          </a>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Phone:</p>
          <a href={`tel:${projectCompany?.phone || ''}`} className={commonClass2}>
            {projectCompany?.phone || ''}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Project_CompanyInfo;

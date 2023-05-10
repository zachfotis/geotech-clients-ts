import { IoLocationSharp } from 'react-icons/io5';
import { Company } from '../../types';

interface CompanyInfoProps {
  projectCompany: Company;
}

function Project_CompanyInfo({ projectCompany }: CompanyInfoProps) {
  const commonClass0 = 'w-full flex flex-col justify-start items-start gap-0 md:flex-row md:gap-5 md:items-start';
  const commonClass1 = 'min-w-[100px] text-base';
  const commonClass2 = 'text-base flex flex-row justify-start items-center gap-2';

  return (
    <section className="flex-auto w-full lg:w-[380px] flex flex-col justify-start items-start gap-2 border border-blue-800 p-5 rounded-md shadow-md">
      <h1 className="text-lg font-bold">Company Info</h1>
      <div className="flex flex-col justify-start items-start gap-3 py-2">
        <div className={commonClass0}>
          <p className={commonClass1}>Company:</p>
          <p className={commonClass2}>{projectCompany?.name + ` - ΑΦΜ: ${projectCompany?.vat}` || ''}</p>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Address:</p>
          <p className={commonClass2}>
            {projectCompany?.address +
              ' ' +
              projectCompany?.number +
              ', ' +
              projectCompany?.city +
              ', ' +
              projectCompany?.zip || ''}
            <a
              href={`https://www.google.com/maps/place/${projectCompany?.address || ''} ${
                projectCompany?.number || ''
              } ${projectCompany?.city || ''} ${projectCompany?.zip || ''}`}
              target="_blank"
              rel="noreferrer"
            >
              <IoLocationSharp className="text-red-600 text-2xl cursor-pointer hover:text-red-800" />
            </a>
          </p>
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
            {/* split phone number to 4, 3, 3 */}
            {projectCompany?.phone?.slice(0, 4) +
              ' ' +
              projectCompany?.phone?.slice(4, 7) +
              ' ' +
              projectCompany?.phone?.slice(7, 10) || ''}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Project_CompanyInfo;

import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { Project, User } from '../../types';

interface ProjectInfoProps {
  project: Project;
  projectUser: User;
}

function Project_ProjectInfo({ project, projectUser }: ProjectInfoProps) {
  const [projectDate, setProjectDate] = useState<string>('');

  const commonClass0 = 'w-full flex justify-start items-start gap-0 flex-col md:flex-row md:gap-5 md:items-start';
  const commonClass1 = 'min-w-[150px] text-lg';
  const commonClass2 = 'text-lg';

  // This is because of different TS and JS type configuration
  useEffect(() => {
    if (typeof project.date === 'string') {
      const date = project.date as any;
      const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
      const formattedDate = format(parsedDate, 'LLL d, yyyy');
      setProjectDate(formattedDate);
    } else if (typeof project.date === 'number') {
      const date = project.date as any;
      const formattedDate = format(new Date(date), 'LLL d, yyyy');
      setProjectDate(formattedDate);
    }
  }, [project]);

  return (
    <section className="flex-auto w-full lg:w-[380px] flex flex-col justify-start items-start gap-5 border border-blue-800 p-5 rounded-md shadow-md">
      <h1 className="text-lg font-bold">Project Info</h1>
      <div className="flex flex-col justify-start items-start gap-3 py-2">
        <div className={commonClass0}>
          <p className={commonClass1}>Reference:</p>
          <p className={commonClass2}>{project?.id || ''}</p>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Contact Person:</p>
          <p className={commonClass2}>{projectUser?.firstname + ' ' + projectUser?.lastname || ''}</p>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Contact Email:</p>
          <a href={`mailto:${projectUser?.email || ''}`} className={commonClass2}>
            {projectUser?.email || ''}
          </a>
        </div>
        <div className={commonClass0}>
          <p className={commonClass1}>Project Date:</p>
          <p className={commonClass2}>{projectDate}</p>
        </div>
      </div>
    </section>
  );
}

export default Project_ProjectInfo;

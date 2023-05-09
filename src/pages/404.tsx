import { BiErrorCircle } from 'react-icons/bi';

function Comp404() {
  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-2">
      <BiErrorCircle className="text-8xl text-red-500" />
      <h1>The page you are looking for does not exist.</h1>
      <h1 className="text-4xl font-bold">404</h1>
    </div>
  );
}

export default Comp404;

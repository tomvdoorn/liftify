import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Strong WebApp
        </Link>
        <div>
          <Link href="/exercises" className="text-gray-300 hover:text-white mx-2">
            Exercises
          </Link>
          <Link href="/templates" className="text-gray-300 hover:text-white mx-2">
            Templates
          </Link>
          <Link href="/workouts" className="text-gray-300 hover:text-white mx-2">
            Workouts
          </Link>
          <Link href="/schedule" className="text-gray-300 hover:text-white mx-2">
            Schedule
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

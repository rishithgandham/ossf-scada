// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#500000] text-white p-4">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl mx-auto text-center font-semibold">
          <Link href="/">Texas A&M SCADA</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

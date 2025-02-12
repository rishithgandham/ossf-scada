import Navbar from './components/navbar';
import LeftNavBar from './components/leftnavbar';

import './globals.css';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <LeftNavBar />
      
      {/* Main Content Area */}
      <div className="flex-1 grid grid-rows-[auto_1fr_auto] gap-10 p-8 sm:p-0 font-[family-name:var(--font-geist-sans)]">
        <Navbar />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        </main>
      </div>
    </div>
  );
}

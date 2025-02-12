import Image from 'next/image';

const LeftNavbar = () => {
    return (
      <div className="h-screen w-64 bg-[#D7D7D7] text-white p-6">
        <div className="text-2xl font-semibold mb-8">
            <Image src="/img/tamu_agrilife_logo.png" alt="Texas A&M OSSF SCADA" width={200} height={200} />
        </div>
      </div>
    );
  };
  
  export default LeftNavbar;
  
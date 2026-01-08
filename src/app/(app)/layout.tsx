import React from 'react';
import Sidebar from '@/components/app-components/dashboard/sidebar'; // Ensure your Sidebar file is in this path

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      
      <Sidebar />

      <div className="flex-1 flex flex-col ml-24">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayoutPage;
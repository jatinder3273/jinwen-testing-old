import DashboardLayout from '@/admin_components/layouts/dashboardLayout';
import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
  return (
    <DashboardLayout noHeader>
      <div className='min-h-[100vh] flex items-center justify-center'>
        <PulseLoader color='#ff782c' />
      </div>
    </DashboardLayout>
  );
};

export default Loading;

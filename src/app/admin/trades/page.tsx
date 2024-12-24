"use client"; // Add this line for Next.js with React server components
import React from 'react';
import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import TradePage from "@/admin_components/pages/trades";

const Page = () => {
  return (
    <DashboardLayout title="Trades">
      <TradePage showAddBtn/>
    </DashboardLayout>
  );
};

export default Page;
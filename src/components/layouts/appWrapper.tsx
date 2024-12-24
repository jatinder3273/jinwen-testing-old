"use server";

import { handleFetchResponse } from "@/utils/Functions";
import AppWrapperClient from "./appWrapperClient";

async function getStates() {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}admin/state-list/`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 86400,
        },
      }
    );
    handleFetchResponse(res, resolve, reject);
  });
}
async function getInvestorType() {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}admin/investor-type-list/`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 86400,
        },
      }
    );
    handleFetchResponse(res, resolve, reject);
  });
}
async function getAllData() {
  try {
    const [data1, data2] = await Promise.all([getStates(), getInvestorType()]);
    return {
      states: data1,
      investorType: data2,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const AppWrapper = async ({ children }) => {
  const fetchedData = await getAllData();
  return (
    <>
      <AppWrapperClient data={fetchedData}>{children}</AppWrapperClient>
    </>
  );
};

export default AppWrapper;

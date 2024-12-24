"use client";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import UserDetail from "../userDetail";

interface IProps {}

const ViewInvestor: React.FC<IProps> = () => {
  const params = useParams();
  const { id: urlId } = params;

  const [getInvestorCall, { response, loading, error }] = useFetch(
    `/admin/get-investor/${urlId}/`,
    {
      method: "POST",
    }
  );

  const investorData = response?.data;

  useEffect(() => {
    getInvestorCall();
  }, []);

  return <UserDetail userData={investorData} loading={loading} />;
};

export default ViewInvestor;

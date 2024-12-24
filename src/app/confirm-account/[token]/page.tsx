"use client";

import useFetch from "@/hooks/useFetch";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { SuccessIcon } from "../../investorOnboarding/icons";
import { PulseLoader } from "react-spinners";
import useAuthService from "@/utils/authService";

const Page = () => {
  const { clearToken } = useAuthService();
  const searchParams = usePathname();
  const token = searchParams.split("/");
  const paramsToken = token[token.length - 1];
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmAccount, { response, loading, error }] = useFetch(
    `auth/confirm-account/${paramsToken}/`,
    {
      method: "PUT",
    }
  );

  const confirmUserAccount = async () => {
    try {
      const res = await confirmAccount();
      if (res?.status === 1) {
        setStatus(1);
        setIsError(false);
      } else {
        setStatus(0);
        setIsError(true);
      }
    } catch (e) {
      setStatus(0);
      setIsError(true);
    }
  };

  useEffect(() => {
    // if(searchParams.includes('confirm-account'))
    // {clearToken();}
    // const timer = setTimeout(() => {
    //   confirmUserAccount();
    // }, 100);
    // return () => clearTimeout(timer);
    confirmUserAccount()
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      {loading ? (
        <PulseLoader color="#ff782c" />
      ) : (
        <div className="flex-col text-center">
          {status === 1 ? (
            <>
              <div className={"flex justify-center mb-4"}>
                <SuccessIcon />
              </div>
              <p>Your Black Jade Fintech account has been confirmed!</p>
            </>
          ) : isError ? (
            <div style={{ color: "red" }}>
              <p>Error occurred while validating your account</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Page;

import useAuthService from "@/utils/authService";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface extraProps {
  endUrl?: string | number;
}

const useFetch = (
  url: string,
  config?: AxiosRequestConfig,
  isNoHeader?:boolean,
): [
  (data?: any, rest?: AxiosRequestConfig & extraProps) => Promise<any>,
  { response: any; loading: boolean; error: AxiosError; errorMessage: string }
] => {
  const router = useRouter();
  const { getToken, clearToken } = useAuthService();
  const [response, setResponse] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const instance = axios.create({
    baseURL:
      //   "https://cors-anywhere.herokuapp.com/" +
      process.env.NEXT_PUBLIC_APP_BASE_URL,
  });


  
  const loadQuery = async (
  
    data?: any,
    rest?: AxiosRequestConfig & extraProps,
    
  ) => {
    setLoading(true);
    const token = getToken();
    const headers = token && !isNoHeader
      ? {
          Authorization: `Bearer ${token ?? ""}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        };
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
      instance({
        url: `${url}${rest?.endUrl ?? ""}`,
        ...config,
        data,
        headers,
        ...rest,
      })
        .then((response: AxiosResponse) => {
          if (response?.data?.status) {
            resolve(response.data);
            setError(undefined);
            response.data != null && setResponse(response.data);
          } else if (response?.data?.code === 401) {
            clearToken();
            router.push("/auth/login");
          } else {
            resolve(response.data);
            setError(response?.data);
            setErrorMessage(response?.data?.message ?? "Something went wrong!");
            setResponse(undefined);
          }
          setLoading(false);
        })
        .catch((e: any) => {
          if (!e?.response) {
            toast.error(e.message);
            setLoading(false);
            return;
          }

          if (e.response?.status === 401 || e.response?.status === 403) {
            clearToken();
            router.push("/auth/login");
          } else if (e.response?.status === 404) {
            setResponse(undefined);
            router.push("/not-found");
          } else {
            setError(e.response);
            setResponse(undefined);
            reject(e.response);
          }
          setErrorMessage(e.message);
          setError({ message: e.message });
          setTimeout(() => {
            setLoading(false);
          }, 1);
        });
    });
  };

  return [loadQuery, { response, loading, error, errorMessage }];
};

export default useFetch;

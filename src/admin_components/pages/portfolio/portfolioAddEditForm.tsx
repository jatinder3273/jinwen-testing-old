"use client";
import React, { useEffect, useState } from "react";
import PortfolioAddEdit from "./portfolioAddEdit";
import { useFormik } from "formik";
import { addPortfolioSchema } from "@/validationSchema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

const PortfolioAddEditForm = () => {
  const { id: urlId } = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    name: "",
    account_no: "",
  });

  const [addNewPortfolioCall, { loading: addLoading }] = useFetch(
    "/admin/add-portfolio/",
    {
      method: "POST",
    }
  );

  const [updatePortfolioCall, { loading: updateLoading }] = useFetch(
    `/admin/update-portfolio/${urlId}/`,
    {
      method: "PUT",
    }
  );
  const [
    getPortfolioCall,
    { response: portfolioData, loading: getPortfolioLoading },
  ] = useFetch(`/admin/get-portfolio/${urlId}/`, {
    method: "GET",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: addPortfolioSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const newValues = {
      ...values,
    };

    const res = urlId
      ? await updatePortfolioCall(newValues)
      : await addNewPortfolioCall(newValues);

    if (res.status) {
      toast.success(res?.message);
      router.replace("/admin/portfolio");
    } else {
      console.log("res?.message", res?.message);
      toast.error(res?.message);
    }
  };

  const handleGetSinglePortfolio = async () => {
    if (urlId) {
      const res = await getPortfolioCall();
      if (res.status) {
        const resData = res?.data;
        setInitialValues({
          account_no: resData?.account_no,
          name: resData?.name,
        });
      } else {
        toast.error(res?.message);
      }
    }
  };

  useEffect(() => {
    handleGetSinglePortfolio();
  }, []);

  return (
    <PortfolioAddEdit
      buttonLoading={(!urlId && addLoading) || (urlId && updateLoading)}
      editId={urlId}
      formik={formik}
      loading={getPortfolioLoading}
      title={urlId ? "Edit Portfolio" : "Add New Portfolio"}
    />
  );
};

export default PortfolioAddEditForm;

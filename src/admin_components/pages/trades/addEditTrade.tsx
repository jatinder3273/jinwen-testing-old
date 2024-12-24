"use client";
import useFetch from "@/hooks/useFetch";
import { addTradeSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddEditTrade from "../tradeAddEdit"; // Ensure this path is correct

interface IProps {}

const AddEditTradePage: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const params = useParams();
  const { id: urlId } = params;

  const [initialValues, setInitialValues] = useState({
    stock_name: "",
    portfolio: "",
    quantity: "",
    price: "",
    market_value: "",
    cost_basis: "",
    gain_loss: "",
  });

  const [addNewTradeCall, { loading: addLoading }] = useFetch(
    "/admin/add-trade/",
    {
      method: "POST",
    }
  );

  const [updateTradeCall, { loading: updateLoading }] = useFetch(
    `/admin/update-trade/${urlId}/`,
    {
      method: "PUT",
    }
  );

  const [getTradeCall, { response: tradeData, loading: getTradeLoading }] =
    useFetch(`/admin/get-trade/${urlId}/`, {
      method: "GET",
    });

  const formik = useFormik({
    initialValues,
    validationSchema: addTradeSchema,
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
      ? await updateTradeCall(newValues)
      : await addNewTradeCall(newValues);

    if (res.status) {
      toast.success(res?.message);
      router.replace("/admin/trades");
    } else {
      console.log("res?.message", res?.message);
      toast.error(res?.message);
    }
  };

  const handleGetSingleTrade = async () => {
    if (urlId) {
      const res = await getTradeCall();
      if (res.status) {
        const resData = res?.data;
        setInitialValues({
          stock_name: resData?.stock_name,
          portfolio: resData?.portfolio?.id,
          quantity: resData?.quantity,
          price: resData?.price,
          market_value: resData?.market_value,
          cost_basis: resData?.cost_basis,
          gain_loss: resData?.gain_loss,
        });
      } else {
        toast.error(res?.message);
      }
    }
  };

  useEffect(() => {
    handleGetSingleTrade();
  }, []);

  return (
    <AddEditTrade
      formik={formik}
      loading={getTradeLoading}
      buttonLoading={(!urlId && addLoading) || (urlId && updateLoading)}
      title={urlId ? "Edit Trade" : "Add New Position"}
      editId={urlId}
    />
  );
};

export default AddEditTradePage;

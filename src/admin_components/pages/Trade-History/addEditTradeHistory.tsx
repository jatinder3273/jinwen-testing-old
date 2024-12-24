"use client";
import useFetch from "@/hooks/useFetch";
import { addTradeHistorySchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddEditTradeHistory from "../tradeHistoryAddEdit"; // Ensure this path is correct

interface IProps {}

const AddEditTradeHistoryPage: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const params = useParams();
  const { id: urlId } = params;

  const [initialValues, setInitialValues] = useState({
    symbol: "",
    portfolio:"",
    date: "",
    quantity: "",
    t_price: "",
    c_price: "",
    proceeds: "",
    commissions: "",
    basis: "",
    realized_profit_loss: "",
    mtm_profit_loss: "",
  });

  const [addNewTradeHistoryCall, { loading: addLoading }] = useFetch(
    "/admin/add-trade-history/",
    {
      method: "POST",
    }
  );

  const [updateTradeHistoryCall, { loading: updateLoading }] = useFetch(
    `/admin/update-trade-history/${urlId}/`,
    {
      method: "PUT",
    }
  );

  const [getTradeHistoryCall, { loading: getTradeLoading }] = useFetch(
    `/admin/get-trade-history/${urlId}/`,
    {
      method: "GET",
    }
  );

  const formik = useFormik({
    initialValues,
    validationSchema: addTradeHistorySchema,
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
      ? await updateTradeHistoryCall(newValues)
      : await addNewTradeHistoryCall(newValues);

    if (res.status) {
      toast.success(res?.message);
      router.replace("/admin/Trade-History");
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetSingleTradeHistory = async () => {
    if (urlId) {
      const res = await getTradeHistoryCall();
      if (res.status) {
        const resData = res?.data;
        setInitialValues({
          portfolio: resData?.portfolio?.id,
          symbol: resData?.symbol,
          date: resData?.date,
          quantity: resData?.quantity,
          t_price: resData?.t_price,
          c_price: resData?.c_price,
          proceeds: resData?.proceeds,
          commissions: resData?.commissions,
          basis: resData?.basis,
          realized_profit_loss: resData?.realized_profit_loss,
          mtm_profit_loss: resData?.mtm_profit_loss,
        });
      } else {
        toast.error(res?.message);
      }
    }
  };

  useEffect(() => {
    handleGetSingleTradeHistory();
  }, []);

  return (
    <AddEditTradeHistory
      formik={formik}
      loading={getTradeLoading}
      buttonLoading={(!urlId && addLoading) || (urlId && updateLoading)}
      title={urlId ? "Edit Trade History" : "Add New Trade History"}
      editID={urlId}
    />
  );
};

export default AddEditTradeHistoryPage;

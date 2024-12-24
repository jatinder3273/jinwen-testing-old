"use client";
import useFetch from "@/hooks/useFetch";
import { addInvestorSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddEditUser from "../userAddEdit";

interface IProps {}

const AddEditInvestor: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const params = useParams();
  const { id: urlId } = params;

  const [selectedCountry, setSelectedCountry] = useState<string>("+1");
  const [imageUrl, setImagesUrl] = useState({
    front: "",
    back: "",
  });

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    investor_type: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    // membership_date: null,
    tax_id: "",
    verification_type: "",
    front_image_file: null,
    back_image_file: null,
  });

  const [addNewInvestorCall, { loading: addLoading }] = useFetch(
    "/admin/add-investor/",
    {
      method: "POST",
    }
  );

  const [uploadFile, { loading: uploadLoader }] = useFetch("/upload-file/", {
    method: "POST",
  });

  const [updateInvestorCall, { loading: updateLoading }] = useFetch(
    `/admin/update-investor/${urlId}/`,
    {
      method: "PUT",
    }
  );

  const [getInvestorCall, { loading: getInvestorLoading }] = useFetch(
    `/admin/get-investor/${urlId}/`,
    {
      method: "POST",
    }
  );

  const formik = useFormik({
    initialValues,
    validationSchema: addInvestorSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleUploadFiles = async (values) => {
    const frontImageFile = values.front_image_file
      ? values.front_image_file[0]
      : null;
    const backImageFile = values.back_image_file
      ? values.back_image_file[0]
      : null;
    if (frontImageFile || backImageFile) {
      const bodyFormData = new FormData();
      bodyFormData.append("front_side", frontImageFile);
      bodyFormData.append("back_side", backImageFile);
      const res = await uploadFile(bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status) {
        return { data: res?.data, status: res?.status };
      }
      return { data: res?.data, status: res?.status };
    }
    return { data: null, status: 1 };
  };

  const handleSubmit = async (values) => {
    const urls = await handleUploadFiles(values);
    if (!urls?.status) {
      toast.error(urls?.data?.message);
      return;
    }

    const newValues = {
      ...values,
      country_code: selectedCountry,
      investor_type: Number(values.investor_type),
      state: Number(values.state),
      // membership_date: moment(values.membership_date).format("YYYY-MM-DD"),
      tax_id: Number(values.tax_id),
      verification_type: Number(values.verification_type),
      verification_front_side: urls?.data?.front_url ?? imageUrl?.front ?? null,
      verification_back_side: urls?.data?.back_url ?? imageUrl?.back ?? null,
    };

    if (urlId) {
      delete newValues.email;
    }
    const res = urlId
      ? await updateInvestorCall(newValues)
      : await addNewInvestorCall(newValues);

    if (res.status) {
      toast.success(res?.message);
      router.back();
    } else {
      console.log("res?.message", res?.message);
      toast.error(res?.message);
    }
  };

  const handleGetSingleInvestor = async () => {
    if (urlId) {
      const res = await getInvestorCall();
      if (res.status) {
        const resData = res?.data;
        setInitialValues({
          first_name: resData?.first_name,
          last_name: resData?.last_name,
          email: resData?.email,
          phone_no: resData?.phone_no,
          investor_type: resData?.investor_type?.id,
          address: resData?.address,
          city: resData?.city,
          state: resData?.state?.id,
          zip_code: resData?.zip_code,
          // membership_date: resData?.membership_date,
          tax_id: resData?.tax_id || "",
          verification_type: resData?.verification_type,
          front_image_file: null,
          back_image_file: null,
        });
        setImagesUrl({
          front: resData?.verification_front_side,
          back: resData?.verification_back_side,
        });
        setSelectedCountry(resData?.country_code);
      } else {
        toast.error(res?.message);
      }
    }
  };

  useEffect(() => {
    handleGetSingleInvestor();
  }, []);

  return (
    <AddEditUser
      formik={formik}
      loading={getInvestorLoading}
      buttonLoading={
        (!urlId && addLoading) || (urlId && updateLoading) || uploadLoader
      }
      title={urlId ? "Edit Investor" : "Add New Investor"}
      imageUrl={imageUrl}
      setImagesUrl={setImagesUrl}
      editId={urlId}
      setCountryCode={setSelectedCountry}
      countryCode={selectedCountry}
    />
  );
};

export default AddEditInvestor;

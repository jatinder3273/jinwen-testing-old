"use client";
import useFetch from "@/hooks/useFetch";
import { investorProfileSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddEditUser from "../userAddEdit";

interface IProps {}

const EditProfile: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const params = useParams();

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
    verification_type: "",
    front_image_file: null,
    back_image_file: null,
  });

  const [updateProfileCall, { loading: updateLoader }] = useFetch(
    "/auth/update-profile/",
    {
      method: "PUT",
    }
  );

  const [uploadFile, { loading: uploadLoader }] = useFetch("/upload-file/", {
    method: "POST",
  });

  const [getProfileCall, { loading: getProfileLoading }] = useFetch(
    "/auth/get-profile/",
    {
      method: "POST",
    }
  );

  const formik = useFormik({
    initialValues,
    validationSchema: investorProfileSchema(
      !!imageUrl?.front,
      !!imageUrl?.back
    ),
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
      if (frontImageFile) {
        bodyFormData.append("front_side", frontImageFile);
      }
      if (backImageFile) {
        bodyFormData.append("back_side", backImageFile);
      }
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
      verification_type: Number(values.verification_type),
      verification_front_side: urls?.data?.front_url ?? imageUrl?.front ?? null,
      verification_back_side: urls?.data?.back_url ?? imageUrl?.back ?? null,
    };
    delete newValues.email;
    const res = await updateProfileCall(newValues);
    if (res.status) {
      toast.success(res?.message);
      router.replace("/admin/investors");
    } else {
      console.log("res?.message", res?.message);
      toast.error(res?.message);
    }
  };

  const handleGetProfile = async () => {
    const res = await getProfileCall();
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
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  useEffect(() => {
    console.log("imageUrl ==> ", imageUrl);
  }, [imageUrl]);
  useEffect(() => {
    console.log("formik.errors ==> ", formik.errors);
  }, [formik.errors]);

  return (
    <AddEditUser
      formik={formik}
      loading={getProfileLoading}
      buttonLoading={updateLoader || uploadLoader}
      title={"Edit Profile"}
      imageUrl={imageUrl}
      setImagesUrl={setImagesUrl}
      editId={"1"}
      setCountryCode={setSelectedCountry}
      countryCode={selectedCountry}
      isProfileEdit
    />
  );
};

export default EditProfile;

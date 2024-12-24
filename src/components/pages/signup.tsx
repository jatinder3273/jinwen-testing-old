"use client";
import { InfoIcon } from "@/admin_components/icons";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { investorProfileSchema } from "@/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PopupLayout from "../layouts/popupLayout";
import DragDropUpload from "../theme/dragDropUpload";
import InputField from "../theme/input";
import PhoneInputField from "../theme/phoneNumber_input";
import Radio from "../theme/radio";
import SelectField from "../theme/select";

const SignUp = () => {
  const router = useRouter();
  const storeData = useStore((state: any) => state);
  const { states, investor_types } = storeData;
  const [emailInfoPopup, setEmailInfoPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("+1");

  const [registerApiCall, { loading: loadingSubmit }] = useFetch(
    "/auth/registration/",
    {
      method: "POST",
    }
  );

  const [uploadFile, { loading: uploadLoader }] = useFetch("/upload-file/", {
    method: "POST",
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      investor_type: "",
      phone_no: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      verification_type: "1",
      front_image_file: null,
      back_image_file: null,
    },
    validationSchema: investorProfileSchema(),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // const handleUploadFiles = async () => {
  //   return { data: res?.data, status: res?.status };
  // };

  const handleSubmit = async (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append(
      "front_side",
      values.front_image_file[0] ? values.front_image_file[0] : null
    );
    bodyFormData.append(
      "back_side",
      values.back_image_file[0] ? values.back_image_file[0] : null
    );
    const responseUrls = await uploadFile(bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (responseUrls?.status) {
      const newValues = {
        ...values,
        country_code: selectedCountry,
        investor_type: Number(values.investor_type),
        state: Number(values.state),
        verification_type: Number(values.verification_type),
        verification_front_side: responseUrls?.data?.front_url ?? null,
        verification_back_side: responseUrls?.data?.back_url ?? null,
      };
      const res = await registerApiCall(newValues);
      if (res?.status) {
        toast.success(res?.message);
        setSuccessPopup(true);
        formik.resetForm();
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error(responseUrls?.message);
    }
  };

  return (
    <div>
      <p className="font-[900] leading-[47px] text-[40px] text-[#494F53] max-[500px]:text-[33px] max-[500px]:leading-[37px] ">
        CREATE ACCOUNT
      </p>
      <p className="font-[300] leading-[18.8px] text-[16px] text-[#494F53] my-[10px] ">
        Please fill the below details to create your new account.
      </p>
      <div className="flex gap-y-5 flex-wrap -mx-[10px] mt-10">
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <InputField
            formik={formik}
            placeholder="First Name"
            name="first_name"
            noRadius
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <InputField
            formik={formik}
            placeholder="Last Name"
            name="last_name"
            noRadius
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <div className="relative">
            <InputField
              className="pr-10"
              formik={formik}
              placeholder="Email"
              name="email"
              noRadius
            />
            <span
              className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer p-2"
              onClick={() => setEmailInfoPopup(true)}
            >
              <InfoIcon />
            </span>
          </div>
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <PhoneInputField
            setSelectedValue={setSelectedCountry}
            selectedValue={selectedCountry}
            formik={formik}
            name="phone_no"
            placeholder="Phone"
            noRadius
          />
        </div>

        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <SelectField
            placeholder="Type"
            formik={formik}
            name="investor_type"
            options={investor_types?.map((item) => ({
              label: item?.name ?? "",
              value: item?.id ?? "",
            }))}
            noRadius
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <InputField
            formik={formik}
            placeholder="Address"
            name="address"
            noRadius
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <InputField formik={formik} placeholder="City" name="city" noRadius />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <SelectField
            placeholder="State"
            formik={formik}
            name="state"
            options={states?.map((item) => ({
              label: item?.name ?? "",
              value: item?.id ?? "",
            }))}
            noRadius
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <InputField
            formik={formik}
            name="zip_code"
            placeholder="Zipcode"
            noRadius
            allowNumberOnly
          />
        </div>
        <div className="flex items-center gap-12 basis-[100%] px-[10px]">
          <h4 className="text-xl font-500">Verification ID</h4>
          <Radio
            name="verification_type"
            checked={formik.values.verification_type == "1"}
            value="1"
            label="Passport"
            onChange={formik.handleChange}
          />
          <Radio
            name="verification_type"
            checked={formik.values.verification_type == "2"}
            value="2"
            label="Driving License"
            onChange={formik.handleChange}
          />
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <div className="relative">
            <DragDropUpload
              noRadius
              title="Front Side"
              file={formik.values.front_image_file}
              handleOnDrop={(file) => {
                formik.setFieldValue("front_image_file", file);
              }}
            />
            {formik?.touched.front_image_file &&
            formik?.errors.front_image_file ? (
              <span className="absolute text-error top-[100%] text-xs text-right right-1">
                {typeof formik.errors.front_image_file === "string"
                  ? formik?.errors.front_image_file
                  : ""}
              </span>
            ) : null}
          </div>
        </div>
        <div className="basis-[100%] xl:basis-[50%] px-[10px]">
          <div className="relative">
            <DragDropUpload
              noRadius
              title="Back Side"
              file={formik.values.back_image_file}
              handleOnDrop={(file) => {
                formik.setFieldValue("back_image_file", file);
              }}
            />
            {formik?.touched.back_image_file &&
            formik?.errors.back_image_file ? (
              <span className="absolute text-error top-[100%] text-xs text-right right-1">
                {typeof formik.errors.back_image_file === "string"
                  ? formik?.errors.back_image_file
                  : ""}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-3 items-center my-8">
        <CustomButton
          onClick={() => formik.handleSubmit()}
          disabled={loadingSubmit || uploadLoader}
          loading={loadingSubmit || uploadLoader}
          noRadius
        >
          Create
        </CustomButton>
        <p className="text-textLight text-[20px] font-[300] max-[500px]:text-[15px] cursor-pointer">
          Already have account!{" "}
          <Link
            href="/auth/login"
            className="text-[#FF782C] font-[600] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <PopupLayout
        isOpen={emailInfoPopup}
        handleClose={() => setEmailInfoPopup(false)}
        maxWidth={375}
      >
        <div className="px-6 py-7 flex flex-col gap-[10px] items-center text-center text-textBlack">
          <h4 className="font-[600] text-2xl">VALID EMAIL</h4>
          <p className="font-light">
            Please enter a valid email. It will ask you to set password of your
            account.
          </p>
          <CustomButton
            className="mt-[10px]"
            onClick={() => setEmailInfoPopup(false)}
          >
            Okay!
          </CustomButton>
        </div>
      </PopupLayout>
      <PopupLayout
        isOpen={successPopup}
        handleClose={() => setSuccessPopup(false)}
        maxWidth={375}
      >
        <div className="px-6 py-7 flex flex-col gap-[10px] items-center text-center text-textBlack">
          <h4 className="font-[600] text-2xl">ACCOUNT CREATED</h4>
          <p className="font-light">
            We have sent your application request to the admin. In the meantime
            please check your email to set the password.
          </p>
          <CustomButton
            className="mt-[10px]"
            onClick={() => router.replace("/auth/login")}
          >
            Okay!
          </CustomButton>
        </div>
      </PopupLayout>
    </div>
  );
};

export default SignUp;

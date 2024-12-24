"use client";
import CustomButton from "@/components/theme/customButton";
import DragDropUpload from "@/components/theme/dragDropUpload";
import InputField from "@/components/theme/input";
import PhoneInputField from "@/components/theme/phoneNumber_input";
import Radio from "@/components/theme/radio";
import SelectField from "@/components/theme/select";
import { useStore } from "@/store";
import React, { Dispatch, SetStateAction } from "react";
import { PulseLoader } from "react-spinners";

interface IProps {
  formik: any;
  loading: boolean;
  buttonLoading: boolean;
  title: string;
  imageUrl?: { front: string; back: string };
  setImagesUrl?: Dispatch<SetStateAction<{ front: string; back: string }>>;
  editId?: string | string[];
  countryCode: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  isProfileEdit?: boolean;
}

const AddEditUser: React.FC<IProps> = ({
  formik,
  loading,
  title,
  imageUrl,
  editId,
  setImagesUrl,
  buttonLoading,
  countryCode,
  setCountryCode,
  isProfileEdit,
}) => {
  const storeData = useStore((state: any) => state);
  const { states, investor_types } = storeData;
  return (
    <div className="ring-1 ring-borderColor bg-white py-6 rounded-[10px] min-h-[50vh]">
      <div className="flex justify-between items-center  px-6 pb-6 mb-8 border-b-[1px] border-b-borderColor">
        <h5 className="text-xl font-medium">{title}</h5>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <PulseLoader color="#ff782c" />
        </div>
      ) : (
        <div className="px-6">
          <div className="flex gap-y-5 flex-wrap -mx-[10px]">
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="first_name"
                placeholder="First Name"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="last_name"
                placeholder="Last Name"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="email"
                placeholder="Email"
                readOnly={!!editId}
                className={`${!!editId ? "cursor-not-allowed" : ""}`}
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              {/* <InputField formik={formik} name='phone_no' placeholder='Phone' /> */}
              <PhoneInputField
                setSelectedValue={setCountryCode}
                selectedValue={countryCode}
                formik={formik}
                name="phone_no"
                placeholder="Phone"
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
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="address"
                placeholder="Address"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField formik={formik} name="city" placeholder="City" />
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
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="zip_code"
                placeholder="Zipcode"
                allowNumberOnly
              />
            </div>
            {/* <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <DateField
                formik={formik}
                name="membership_date"
                placeholderText="Membership Date"
                onChange={(date) =>
                  formik?.setFieldValue("membership_date", date)
                }
              />
            </div> */}
            {!isProfileEdit ? (
              <div className="basis-[100%] xl:basis-[50%] px-[10px]">
                <InputField
                  formik={formik}
                  name="tax_id"
                  placeholder="Tax ID"
                  allowNumberOnly
                />
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-5 basis-[100%] px-[10px]">
              <h4 className="text-xl font-500 mr-7">
                Verification ID {!isProfileEdit ? "(Optional)" : ""}
              </h4>
              <div className="flex items-center gap-12">
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
            </div>
            {formik.values.verification_type ? (
              <>
                <div className="basis-[100%] xl:basis-[50%] px-[10px]">
                  <div className="relative">
                    <DragDropUpload
                      title="Front Side"
                      imageUrl={imageUrl.front}
                      file={formik.values?.front_image_file}
                      handleOnDrop={(file) => {
                        formik.setFieldValue("front_image_file", file);
                        setImagesUrl({
                          ...imageUrl,
                          front: "",
                        });
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
                      title="Back Side"
                      imageUrl={imageUrl.back}
                      file={formik.values?.back_image_file}
                      handleOnDrop={(file) => {
                        formik.setFieldValue("back_image_file", file);
                        setImagesUrl({
                          ...imageUrl,
                          back: "",
                        });
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
              </>
            ) : null}
          </div>
          <CustomButton
            onClick={() => formik.handleSubmit()}
            loading={buttonLoading}
            className="mt-5"
          >
            {editId ? "Save Investor" : "Add Investor"}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default AddEditUser;

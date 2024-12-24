"use client";
import React, { useState } from "react";
import { contactSchema } from "@/validationSchema";
import { useFormik } from "formik";
import InputField from "./theme/input";
import TextAreaField from "./theme/textarea";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const Contact = () => {
  const router = useRouter();
  const [ContactApi, { response, loading, error }] = useFetch(
    "auth/contact-us/",
    {
      method: "post",
    }
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_no: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values: any, { resetForm }) => {
      handleBookAppointment(values);
    },
  });

  const handleBookAppointment = async (values) => {
    const res = await ContactApi(values);
    if (res.status) {
      toast.success(res.message);
      formik.resetForm();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div
      className="bg-[url('/assets/image/contact.jpg')] p-5 bg-center  bg-cover"
      id="Contact"
    >
      <div className="max-w-[1100px] mx-auto flex max-[990px]:flex-col min-[1700px]:max-w-[85%] justify-between ">
        <div className="w-[60%] max-[990px]:w-[92%]  max-[500px]:w-full max-[500px]:flex max-[500px]:flex-col max-[990px]:mx-auto ">
          <p className="font-public-sans font-[700] leading-[24px] text-[16px] text-[#494F53] mt-4 max-[767px]:text-center">
            Contact Us
          </p>
          <p className="font-public-sans  max-[767px]:text-center font-[900] leading-[57px] text-[40px]  mb-7 text-[#494F53] max-[610px]:text-3xl ">
            Book an Appointment
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between gap-5">
              <div className="grow my-5">
                <InputField
                  type="text"
                  formik={formik}
                  name="name"
                  placeholder="Full Name*"
                  className="h-12  w-full  font-public-sans border border-[#DCE1E6] placeholder-[#494F53] outline-none  rounded px-4 bg-[#F4F4F4]"
                />
              </div>
              <div className="grow my-5">
                <InputField
                  type="email"
                  formik={formik}
                  name="email"
                  placeholder="Email*"
                  className="h-12 w-full font-public-sans border border-[#DCE1E6] placeholder-[#494F53] rounded px-4 outline-none bg-[#F4F4F4]"
                />
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="grow my-5">
                <InputField
                  type="number"
                  formik={formik}
                  name="phone_no"
                  placeholder="Phone"
                  className="h-12  w-full font-public-sans  border border-[#DCE1E6] placeholder-[#494F53] rounded px-4 outline-none  bg-[#F4F4F4]"
                />
              </div>
              <div className="grow my-5">
                <InputField
                  type="text"
                  formik={formik}
                  name="subject"
                  placeholder="Subject"
                  className="grow h-12  w-full font-public-sans border border-[#DCE1E6] placeholder-[#494F53] rounded px-4 outline-none bg-[#F4F4F4]"
                />
              </div>
            </div>
            <TextAreaField
              placeholder="Message"
              formik={formik}
              name="message"
              className="h-32 my-2 w-full font-public-sans border border-[#DCE1E6] placeholder-[#494F53] outline-none rounded px-4 py-2 bg-[#F4F4F4]"
            />
            <div>
              <button
                type="submit"
                disabled={loading}
                className=" font-public-sans   bg-[#ff7534] hover:bg-[#0066af]  font-bold mt-4 text-white px-[30px] py-[18px] max-[500px]:mt-2 max-w-[500px] mx-auto"
              >
                <span className="flex items-center ">
                  {loading ? (
                    <ClipLoader color="white" size={20} className="mr-2" />
                  ) : (
                    ""
                  )}
                  Book Appointment
                </span>
              </button>
            </div>
          </form>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9266456805457!2d-73.9865812845933!3d40.7870106793248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588ae7e39e13%3A0x85e2e5188c1a7105!2sUpper%20West%20Side%2C%20New%20York%2C%20NY%2010024%2C%20USA!5e0!3m2!1sen!2sin!4v1707473089194!5m2!1sen!2sin
          "
          width="300"
          height="300"
          style={{ border: "20px solid #fff" }}
          loading="lazy"
          className="mt-32 max-[990px]:w-full max-[990px]:mt-10 min-[1200px]:mt-8 min-[1200px]:h-[400px] min-[1200px]:w-[400px]"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;

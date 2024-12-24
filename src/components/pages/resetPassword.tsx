"use client";
import useFetch from "@/hooks/useFetch";
import { ResetPasswordSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import InputField from "../theme/input";

const ResetPassword = (props: any) => {
  const router = useRouter();
  const searchParams = usePathname();
  const token = searchParams.split("/");
  const paramsToken = token[token.length - 1];
  const [ResetPasswordApi, { response, loading, error }] = useFetch(
    `auth/reset-password/${paramsToken}/`,
    {
      method: "put",
    }
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handleLink(values);
    },
  });
  const handleLink = async (values: any) => {
    const res = await ResetPasswordApi(values);
    if (res.status) {
      toast.success(res.message);
      router.push("/auth/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <p className="font-[900] uppercase leading-[47px] text-[40px] text-[#494F53] max-[500px]:text-[33px] max-[500px]:leading-[37px] ">
        {" "}
        reset password
      </p>

      <div className="my-8 mt-10">
        <InputField
          placeholder="New Password"
          type="password"
          name="password"
          formik={formik}
          noRadius
        />
      </div>
      <div className="my-5">
        <InputField
          placeholder="Confirm New Password"
          type="password"
          name="new_password"
          formik={formik}
          noRadius
        />
      </div>

      <div className="flex gap-3 items-center my-8">
        <button
          className="font-[700] leading-[23.5px] text-[20px] text-[#ffff] bg-[#FF782C] py-[12px] px-[23px] max-[500px]:text-[15px]"
          // onClick={() => handleResetPassword()}
          onClick={() => formik.handleSubmit()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

"use client";
import useFetch from "@/hooks/useFetch";
import { ResetPasswordSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import InputField from "../theme/input";
import CustomButton from "../theme/customButton";

const SetPassword = (props: any) => {
  const router = useRouter();
  const searchParams = usePathname();
  const token = searchParams.split("/");
  const paramsToken = token[token.length - 1];
  const [setPasswordCall, { response, loading, error }] = useFetch(
    `auth/reset-password/${paramsToken}/`,
    {
      method: "PUT",
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
    const res = await setPasswordCall(values);
    if (res.status) {
      toast.success(res.message);
      router.push("/auth/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <h4 className="font-[900] mb-[10px] text-[40px] text-[#494F53] max-[500px]:text-[30px]">
        {" "}
        SET PASSWORD
      </h4>
      <p className="text-textBlack">
        Here below you can set your password and login.
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
        <CustomButton
          onClick={() => formik.handleSubmit()}
          disabled={loading}
          loading={loading}
          noRadius
        >
          Set
        </CustomButton>
      </div>
    </div>
  );
};

export default SetPassword;

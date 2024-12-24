'use client';

import CustomButton from '@/components/theme/customButton';
import InputField from '@/components/theme/input';
import useFetch from '@/hooks/useFetch';
import { InviteInvestorSchema } from '@/validationSchema';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import { PulseLoader } from 'react-spinners';

const InviteInvestor = () => {

    /**
  * initialise sign-up invitation api
  */
    const [signupInviteApiCall, { loading: inviteLoading }] = useFetch(
        "/auth/signup-invitation",
        {
            method: "POST",
        }
    );


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
        },
        validationSchema: InviteInvestorSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await signupInviteApiCall(values);
                if (response?.status) {
                    toast.success(response.message);
                    resetForm();
                } else {
                    toast.error(response?.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        },
    });

    return (
        <div className="ring-1 ring-borderColor bg-white py-6 rounded-[10px] min-h-[20vh]">
            <div className="flex justify-between items-center px-6 pb-6 mb-8 border-b-[1px] border-b-borderColor">
                <h5 className="text-xl font-medium">Invite New Investor</h5>
            </div>
            <div className="px-6">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex gap-y-5 flex-wrap -mx-[10px]">
                        <div className="basis-[100%] xl:basis-[33%] px-[10px]">
                            <InputField
                                formik={formik}
                                name="first_name"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="basis-[100%] xl:basis-[33%] px-[10px]">
                            <InputField
                                formik={formik}
                                name="last_name"
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="basis-[100%] xl:basis-[33%] px-[10px]">
                            <InputField
                                formik={formik}
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <CustomButton
                            type="submit"
                            disabled={inviteLoading}
                        >
                            {inviteLoading ? <PulseLoader size={8} color="#fff" /> : 'Invite Investor'}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteInvestor;

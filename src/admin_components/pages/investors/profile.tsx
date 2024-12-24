"use client";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import UserDetail from "../userDetail";
import CustomButton from "@/components/theme/customButton";
import { useRouter } from "next/navigation";

interface IProps {}

const MyProfile: React.FC<IProps> = () => {
  const router = useRouter();
  const [getProfileCall, { response, loading, error }] = useFetch(
    "/auth/get-profile/",
    {
      method: "POST",
    }
  );

  const profileData = response?.data;
  console.log("profileData", profileData);

  useEffect(() => {
    getProfileCall();
  }, []);

  return (
    <UserDetail
      userData={profileData}
      loading={loading}
      isProfilePage
      editProfileBtn={
        <CustomButton onClick={() => router.push("/investor/profile/edit")}>
          Edit Profile
        </CustomButton>
      }
    />
  );
};

export default MyProfile;

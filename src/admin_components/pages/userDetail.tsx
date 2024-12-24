/* eslint-disable @next/next/no-img-element */
"use client";
import { CameraIcon, EmailIcon, PhoneIcon } from "@/admin_components/icons";
import { ActiveShape } from "@/admin_components/icons/shapes";
import NextImage from "@/components/theme/nextImage";
import useFetch from "@/hooks/useFetch";
import useAuthService from "@/utils/authService";
import { ALLOWED_IMAGE_TYPE } from "@/utils/constants";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { PuffLoader, PulseLoader } from "react-spinners";

interface IProps {
  userData: any;
  loading: boolean;
  editProfileBtn?: ReactNode;
  isProfilePage?: boolean;
}

const UserDetail: React.FC<IProps> = ({
  userData,
  loading,
  editProfileBtn,
  isProfilePage,
}) => {
  const [profilePicLoading, setProfilePicLoading] = useState(true);
  const [profilePic, setProfilePic] = useState<string | null>();
  const { getToken } = useAuthService();

  const [updateProfilePic, { loading: uploadLoader }] = useFetch(
    "/upload-file/",
    {
      method: "POST",
    }
  );

  const handleProfileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (e.target.files && file) {
      if (ALLOWED_IMAGE_TYPE.includes(file?.type)) {
        const token = getToken();
        const bodyFormData = new FormData();
        if (file) {
          bodyFormData.append("profile_pic", file);
        }
        const res = await updateProfilePic(bodyFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("res", res);
        if (res?.status) {
          setProfilePic(URL.createObjectURL(file));
        }
      }
    }
  };
  useEffect(() => {
    if (userData) {
      setProfilePic(userData?.profile_pic);
    }
  }, [userData]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <PulseLoader color="#ff782c" />
        </div>
      ) : (
        <div>
          {isProfilePage ? (
            <div className="mb-6">
              <h4 className="text-[32px] mb-3 text-dbBlack font-[600] leading-none">
                My Profile
              </h4>
              {userData?.status === 3 ? (
                <p className="text-textBlack font-light">
                  You can still edit your information while it&apos;s in under
                  confirmation.
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-7">
            <div className="relative flex flex-col items-center basis-[270px] p-5 pt-[50px] ring-1 ring-borderColor bg-white rounded-[10px] shrink-0">
              <div className="absolute top-[-6px]">
                <ActiveShape
                  className={`${
                    userData?.status === 1 || userData?.status === 3
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                />
                <span className="text-sm text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  {userData?.status === 1
                    ? "Active"
                    : userData?.status === 2
                    ? "Inactive"
                    : userData?.status === 3
                    ? "Pending"
                    : "Rejected"}
                </span>
              </div>
              <div className="w-[140px] aspect-square rounded-full relative bg-adminBg">
                {profilePicLoading || uploadLoader ? (
                  <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <PuffLoader color="#ff782c" />
                  </span>
                ) : null}
                {!uploadLoader ? (
                  <NextImage
                    loading="lazy"
                    src={`${
                      profilePic ?? "/assets_admin/images/profileImg.png"
                    }`}
                    alt="profile"
                    className="rounded-full w-[100%] aspect-square object-cover z-[2] relative"
                    onLoad={() => setProfilePicLoading(false)}
                  />
                ) : null}
                {isProfilePage ? (
                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer absolute text-white rounded-full flex items-center justify-center bg-secondary bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-[32px] aspect-square border border-white hover:opacity-90 z-[3]"
                  >
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/jpg"
                      className="hidden"
                      onChange={handleProfileUpload}
                    />
                    <CameraIcon className="h-4 w-auto" />
                  </label>
                ) : null}
              </div>
              <h4 className="text-xl mt-5 mb-2 font-medium text-dbBlack">
                {userData?.first_name + " " + userData?.last_name}
              </h4>
              <p className="flex items-center gap-1 mb-[9px] text-sm font-light text-textBlack">
                <EmailIcon /> {userData?.email}
              </p>
              <p className="flex items-center gap-1 font-light text-sm text-textBlack">
                <PhoneIcon />{" "}
                {userData?.country_code ? `(${userData?.country_code})` : ""}{" "}
                {userData?.phone_no}
              </p>
            </div>
            <div className="ring-1 ring-borderColor bg-white rounded-[10px] flex flex-col justify-between grow">
              <div className="py-6 px-7 border-b-[1px] border-b-borderColor flex gap-4 justify-between items-center">
                <h4 className="font-medium text-xl text-dbBlack">
                  More Information
                </h4>
                {editProfileBtn}
              </div>
              <div className="px-7 py-8 flex flex-wrap gap-y-4 whitespace-nowrap -mx-2">
                <div className="text-textBlack basis-[100%] md:basis-[30%] px-2">
                  <h5 className="mb-[10px]">Type</h5>
                  <p className="text-xl font-semibold">
                    {userData?.investor_type?.name}
                  </p>
                </div>
                {/* <div className="text-textBlack basis-[100%] md:basis-[40%] px-2">
                <h5 className="mb-[10px]">Membership Date</h5>
                <p className="text-xl font-semibold">
                  {userData?.membership_date}
                </p>
              </div> */}

                <div className="text-textBlack basis-[100%] md:basis-[30%] px-2">
                  <h5 className="mb-[10px]">Tax ID</h5>
                  <p className="text-xl font-semibold">
                    {userData?.tax_id || "- -"}
                  </p>
                </div>
              </div>
              <div className="py-7 px-7 border-t-[1px] border-t-borderColor text-textBlack flex flex-wrap justify-between">
                <div>
                  <h5 className="mb-[10px]">Address</h5>
                  <p className="text-xl font-semibold">
                    {userData?.address}, {userData?.city},{" "}
                    {userData?.state?.name}
                  </p>
                </div>
                {userData?.verification_front_side ||
                userData?.verification_back_side ? (
                  <div className="shrink-0">
                    <h5 className="mb-[10px]">Document</h5>
                    <div className="flex items-center gap-3">
                      {userData?.verification_back_side ? (
                        <span>
                          <NextImage
                            className="h-[50px] rounded-sm"
                            src={userData?.verification_back_side ?? ""}
                            alt="document"
                          />
                        </span>
                      ) : null}
                      {userData?.verification_front_side ? (
                        <span>
                          <NextImage
                            className="h-[50px] rounded-sm"
                            src={userData?.verification_front_side ?? ""}
                            alt="document"
                          />
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;

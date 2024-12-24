

"use client";

import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { useStepData } from "../../stepper/UseStepData";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import useAuthService from "@/utils/authService";

const MAX_FILE_SIZE_MB = 10; // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

let nonce = "";
const ProofOfId = () => {
  const { data, setData } = useStepData();
  const [isDragOver, setIsDragOver] = useState(false);
  const [proofUrl, setProofUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileElement = useRef<HTMLInputElement>(null);
  const [updateProfilePic, { loading: uploadLoader }] = useFetch(
    "/upload-file/",
    {
      method: "POST",
    }
  );
  const { getToken } = useAuthService();
  const token = getToken();

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrorMessage("Invalid file type. Please upload a JPG, PNG, or PDF.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage("File size exceeds the 10MB limit.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleFileUpload = (file: File): Promise<string> => {
    if (!validateFile(file)) return;

    const bodyFormData = new FormData();
    bodyFormData.append("file", file);

    return new Promise((resolve, reject) => {
      updateProfilePic(bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res?.status && res?.doc_url) {
            console.log("Uploaded File URL:", res?.doc_url);
            setProofUrl(res.doc_url);
            return resolve(res?.doc_url);
          } else {
            console.error("API did not return a valid URL:", res);
            setErrorMessage("File upload failed. Please try again.");
            reject("File upload failed. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
          setErrorMessage("Error uploading file. Please check your connection.");
          reject("Error uploading file. Please check your connection.");
        });
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (nonce == "") {
      console.log("file change");
      e.stopPropagation();
      nonce = "nand";
      const file = e.target.files?.[0];
      if (file) {
        const url = await handleFileUpload(file);
        if (url) {
          const event = new Event("change", { bubbles: true });
          fileElement.current.setAttribute("data-file-url", url);
          fileElement.current.dispatchEvent(event);
        }
      }
    } else {
      nonce = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getFileName = (url: string): string => {
  
    return url.split("/").pop() || "";
  };

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Proof of ID
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Upload a copy of the Subscriber's current, valid government ID (e.g.
        passport, driver's license, or other valid national ID)
      </p>

      <div
        className={`mt-8 p-6 border-[2px] border-dashed rounded-md ${
          isDragOver
            ? "border-[#0083FF] bg-[#F0F8FF]"
            : "border-[#DCE1E6] bg-[#FCFAFA]"
        } text-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileElement}
          type="file"
          name="id_proof"
          required
          accept=".jpeg, .jpg, .png, .pdf"
          className="hidden"
          id="fileInput"
          data-type={"file"}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {!uploadLoader && (
            <div className="flex flex-col">
              <p className="text-[#494F53] font-bold">
                Drag and drop your files or manually upload.
              </p>
              <span className="text-[#494F53] mt-3">
                The max file size is 10MB.
              </span>
              <span className="mt-3">
                <CustomButton
                  className="w-[106px] h-[40px] mt-3"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Browse
                </CustomButton>
              </span>
            </div>
          )}
        </label>

        {uploadLoader && <p className="mt-2 text-[#0083FF]">Uploading...</p>}
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        {proofUrl && !uploadLoader && (
  <p className="mt-2 text-[#0083FF] font-semibold">
    Uploaded file: {getFileName(proofUrl)}
  </p>
)}

{!proofUrl && data?.id_proof && !uploadLoader && (
  <p className="mt-2 text-[#0083FF] font-semibold">
    Uploaded file: {getFileName(data?.id_proof)}
  </p>
)}
      </div>
    </div>
  );
};

export default ProofOfId;

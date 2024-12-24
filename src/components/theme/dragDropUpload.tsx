import NextImage from "@/components/theme/nextImage";
import clsx from "clsx";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
interface IProps {
  handleOnDrop?: (file) => void;
  file?: File[];
  title: string;
  imageUrl?: string;
  noRadius?: boolean;
}

const DragDropUpload: React.FC<IProps> = ({
  handleOnDrop,
  file,
  title,
  imageUrl,
  noRadius,
}) => {
  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    handleOnDrop(acceptedFiles);
  };
  const onDropRejected = (rejectionFiles: FileRejection[]) => {
    console.log("rejectionFiles", rejectionFiles);
    toast.error(rejectionFiles[0]?.errors[0]?.message);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      accept: {
        "image/jpg": [],
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
      multiple: false,
    });
  return (
    <div
      {...getRootProps()}
      className={`border border-[#DCE1E6]  overflow-hidden ${
        noRadius ? "" : "rounded-[10px]"
      }`}
    >
      <div
        className={clsx(
          "h-[230px] bg-adminBg flex flex-col items-center gap-20 justify-center transition",
          isDragActive && "opacity-50"
        )}
      >
        <input {...getInputProps()} />
        {file || imageUrl ? (
          <div className="flex justify-center content-center gap-3 h-full p-5">
            <span>
              <NextImage
                src={file ? URL.createObjectURL(file[0]) : imageUrl}
                alt="Preview"
                className="max-w-[100%] max-h-[100%] rounded-sm"
              />
            </span>
            <div className="shrink-0">
              <button
                type="button"
                className="text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnDrop(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <h5 className="text-md text-center font-light">
            {isDragActive ? (
              "Drop the files here to upload ..."
            ) : (
              <>
                <span className="text-primary underline">
                  Upload or Drag & Drop
                </span>
                <span className="text-textBlack block cursor-pointer">
                  {title}
                </span>
              </>
            )}
          </h5>
        )}
      </div>
    </div>
  );
};

export default DragDropUpload;

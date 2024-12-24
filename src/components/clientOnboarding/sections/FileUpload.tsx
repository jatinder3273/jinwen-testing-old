import React, { useState, ChangeEvent, DragEvent } from "react";

interface FileUploadProps {
  onUpload: (url: string) => void;
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
  uploadUrl: string;
  headers?: Record<string, string>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
  maxFileSizeMB = 10,
  uploadUrl,
  headers = {},
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!acceptedFileTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Please upload a JPG, PNG, or PDF.");
      return false;
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setErrorMessage(`File size exceeds the ${maxFileSizeMB}MB limit.`);
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers,
      });

      const result = await response.json();
      if (response.ok && result?.doc_url) {
        onUpload(result.doc_url);
      } else {
        setErrorMessage("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.target.value = "abc"; // Modify the event's value
    // e.persist();

    const file = e.target.files?.[0];
    // if (file) {
    //   handleUpload(file);
    // }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div
      className={`p-6 border-2 border-dashed rounded-md ${
        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      } text-center cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={acceptedFileTypes.join(",")}
        className="hidden"
        id="fileInput"
        data-type={"file"}
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        {!uploading && (
          <div className="flex flex-col">
            <p className="font-bold text-gray-700">Drag and drop your files or manually upload.</p>
            <span className="text-gray-600 mt-2">The max file size is {maxFileSizeMB}MB.</span>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Browse
            </button>
          </div>
        )}
      </label>
      {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
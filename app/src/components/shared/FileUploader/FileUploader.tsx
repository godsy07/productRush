import { useState, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="bg-slate-400 rounded-md flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="max-h-20 min-h-10" />
          </div>
          <p className="text-sm">
            Click or drag a photo to replace
          </p>
        </>
      ) : (
        <div className="bg-slate-400 rounded-md py-1 flex flex-col justify-center items-center w-full">
          <img
            src="/assets/icons/file-upload.svg"
            width={50}
            height={40}
            alt="file-upload"
          />

          <h3 className="text-xs base-medium text-light-2 my-1">
            Drag photo here
          </h3>
          <p className="text-xs text-light-4 small-regular mb-2">SVG, PNG, JPG</p>

          <Button className="text-xs" size='sm'>
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

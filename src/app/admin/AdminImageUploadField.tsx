"use client";

import { ChangeEvent, useState, useRef } from "react";
import { Upload, X } from "lucide-react";

export default function AdminImageUploadField({
  fieldId,
  title,
  uploadLabel,
  urlLabel,
  urlPlaceholder,
  hint,
  initialImage = "",
  previewClassName = "h-48 w-full rounded-lg object-contain bg-white",
  fileInputName = "imageFile",
  urlInputName = "imageUrl",
  onImageChange,
}: {
  fieldId: string;
  title: string;
  uploadLabel: string;
  urlLabel: string;
  urlPlaceholder: string;
  hint: string;
  initialImage?: string;
  previewClassName?: string;
  fileInputName?: string;
  urlInputName?: string;
  onImageChange?: (value: string) => void;
}) {
  const [previewImage, setPreviewImage] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      // 注意：不要把 blob url 传给父组件，否则会覆盖原本真实的 imageUrl
      // onImageChange?.(url);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    onImageChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-700">{title}</label>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="relative flex min-h-[220px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-6">
            {previewImage ? (
              <div className="relative w-full z-20">
                <img src={previewImage} alt={title} className={previewClassName} />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition hover:bg-white hover:text-red-500 z-30"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-center z-10 pointer-events-none">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="text-sm font-medium text-gray-700">{uploadLabel}</div>
                <p className="text-xs text-gray-500">{hint}</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              id={`${fieldId}-file`}
              name={fileInputName}
              accept="image/*"
              onChange={handleImageChange}
              className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${previewImage ? 'z-[-1]' : 'z-20'}`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={`${fieldId}-file`} className="mb-1 block text-xs text-gray-500">
              {uploadLabel}
            </label>
            <label
              htmlFor={`${fieldId}-file`}
              className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-white"
            >
              {uploadLabel}
            </label>
          </div>
          <div>
            <label htmlFor={`${fieldId}-url`} className="mb-1 block text-xs text-gray-500">
              {urlLabel}
            </label>
            <input
              type="text"
              id={`${fieldId}-url`}
              name={urlInputName}
              defaultValue={initialImage}
              inputMode="url"
              onChange={(e) => {
                setPreviewImage(e.target.value);
                onImageChange?.(e.target.value);
              }}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 outline-none transition-colors focus:border-[#F05A22] focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20"
              placeholder={urlPlaceholder}
            />
          </div>
          <p className="text-xs text-gray-500">{hint}</p>
        </div>
      </div>
    </div>
  );
}

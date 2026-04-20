"use client";

import { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import { uploadImageAction } from "@/actions/imageUpload";

export default function AdminGalleryUploadField({
  fieldId,
  title,
  hint,
  initialImages = [],
}: {
  fieldId: string;
  title: string;
  hint: string;
  initialImages?: string[];
}) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages = [...images];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const result = await uploadImageAction(formData);
        if (result.success && result.url) {
          newImages.push(result.url);
        } else {
          alert(`Failed to upload ${files[i].name}`);
        }
      }
      setImages(newImages);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-700">{title}</label>
      
      {/* Hidden input to store JSON for form submission */}
      <input type="hidden" name={fieldId} value={JSON.stringify(images)} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50 group">
            <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-white/90 text-gray-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="relative aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-500 transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <>
              <Plus className="w-8 h-8" />
              <span className="text-xs font-medium">Add Image</span>
            </>
          )}
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <p className="text-xs text-gray-500">{hint}</p>
    </div>
  );
}

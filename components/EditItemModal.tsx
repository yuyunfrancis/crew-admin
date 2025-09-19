"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiUpload } from "react-icons/fi";
import Button from "./Button";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; image?: File }) => void;
  itemType: string;
  initialData: {
    id: string;
    title: string;
    imageUrl: string;
  } | null;
}

export default function EditItemModal({
  isOpen,
  onClose,
  onSubmit,
  itemType,
  initialData,
}: EditItemModalProps) {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Set initial values when modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setTitle(initialData.title);
      setImagePreview(initialData.imageUrl);
      setSelectedImage(null);
    }
  }, [isOpen, initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        image: selectedImage || undefined,
      });
      handleClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to update " + itemType + ". Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedImage(null);
    setImagePreview("");
    onClose();
  };

  if (!isOpen || !initialData) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-[2px] z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {itemType.charAt(0).toUpperCase() + itemType.slice(1)} Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder={`Enter ${itemType} name...`}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image{" "}
                {selectedImage
                  ? "(New image selected)"
                  : "(Keep current or select new)"}
              </label>

              <div className="space-y-3">
                {/* Current/Preview Image */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    {selectedImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(initialData.imageUrl); // Reset to original
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload New Image */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <FiUpload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {selectedImage
                        ? "Change image"
                        : "Upload new image (optional)"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!title.trim()}
                className="flex-1"
              >
                Update {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

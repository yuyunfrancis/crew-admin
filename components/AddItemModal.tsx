"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiImage, FiUpload } from "react-icons/fi";
import Button from "./Button";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; image?: File }) => void;
  itemType: string; // "vibe", "scene", or "hobby"
}

export default function AddItemModal({
  isOpen,
  onClose,
  onSubmit,
  itemType,
}: AddItemModalProps) {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

    // Check if image is required (for vibes)
    if (!selectedImage && itemType === "vibe") {
      alert("Please select an image for the vibe");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        image: selectedImage || undefined,
      });
      handleClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to create " + itemType + ". Please try again.");
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-40"
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
              Add New {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
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
                Image
              </label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
              )}
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
                Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

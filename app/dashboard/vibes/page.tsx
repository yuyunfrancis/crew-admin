"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiImage } from "react-icons/fi";
import Button from "@/components/Button";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import { getAllVibes, createVibe, deleteVibe, Vibe } from "@/lib/vibes";

export default function VibesPage() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load vibes on component mount
  useEffect(() => {
    loadVibes();
  }, []);

  const loadVibes = async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedVibes = await getAllVibes();
      setVibes(fetchedVibes);
    } catch (error) {
      console.error("Error loading vibes:", error);
      setError("Failed to load vibes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    console.log("Edit vibe:", id);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVibe(id.toString());
      setVibes(vibes.filter((vibe) => vibe._id !== id.toString()));
    } catch (error) {
      console.error("Error deleting vibe:", error);
      setError("Failed to delete vibe. Please try again.");
    }
  };

  const handleAddVibe = async (data: { title: string; image?: File }) => {
    if (!data.image) {
      setError("Please select an image for the vibe");
      return;
    }

    try {
      setError("");
      const newVibe = await createVibe(data.title, data.image);
      setVibes([...vibes, newVibe]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating vibe:", error);
      setError("Failed to create vibe. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vibes</h1>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-800 hover:text-red-900 ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vibes</h1>
          <p className="text-gray-600">Manage all vibes ({vibes.length})</p>
        </div>
        <Button
          icon={<FiPlus />}
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Vibe
        </Button>
      </div>

      {/* Grid of Cards or Empty State */}
      {vibes.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          {vibes.map((vibe) => (
            <ItemCard
              key={vibe._id}
              id={parseInt(vibe._id)}
              title={vibe.title}
              imageUrl={vibe.imageUrl}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiImage className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No vibes found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first vibe. Add a title and image to
            bring it to life.
          </p>
          <Button icon={<FiPlus />} onClick={() => setShowAddModal(true)}>
            Create Your First Vibe
          </Button>
        </div>
      )}

      {/* Add Modal */}
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddVibe}
        itemType="vibe"
      />
    </div>
  );
}

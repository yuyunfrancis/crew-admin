"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiActivity } from "react-icons/fi";
import Button from "@/components/Button";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import EditItemModal from "@/components/EditItemModal";
import {
  getAllHobbies,
  createHobby,
  updateHobby,
  deleteHobby,
  Hobby,
} from "@/lib/hobbies";

export default function HobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingHobby, setEditingHobby] = useState<Hobby | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load hobbies on component mount
  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedHobbies = await getAllHobbies();
      setHobbies(fetchedHobbies);
    } catch (error) {
      console.error("Error loading hobbies:", error);
      setError("Failed to load hobbies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const hobbyToEdit = hobbies.find((hobby) => hobby._id === id);
    if (hobbyToEdit) {
      setEditingHobby(hobbyToEdit);
      setShowEditModal(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHobby(id);
      setHobbies(hobbies.filter((hobby) => hobby._id !== id));
    } catch (error) {
      console.error("Error deleting hobby:", error);
      setError("Failed to delete hobby. Please try again.");
    }
  };

  const handleEditHobby = async (data: { title: string; image?: File }) => {
    if (!editingHobby) return;

    try {
      setError("");
      const updatedHobby = await updateHobby(
        editingHobby._id,
        data.title,
        data.image
      );
      setHobbies(
        hobbies.map((hobby) =>
          hobby._id === editingHobby._id ? updatedHobby : hobby
        )
      );
      setShowEditModal(false);
      setEditingHobby(null);
    } catch (error) {
      console.error("Error updating hobby:", error);
      setError("Failed to update hobby. Please try again.");
    }
  };

  const handleAddHobby = async (data: { title: string; image?: File }) => {
    if (!data.image) {
      setError("Please select an image for the hobby");
      return;
    }

    try {
      setError("");
      const newHobby = await createHobby(data.title, data.image);
      setHobbies([...hobbies, newHobby]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating hobby:", error);
      setError("Failed to create hobby. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hobbies</h1>
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
          <h1 className="text-2xl font-bold text-gray-900">Hobbies</h1>
          <p className="text-gray-600">Manage all hobbies ({hobbies.length})</p>
        </div>
        <Button
          icon={<FiPlus />}
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Hobby
        </Button>
      </div>

      {/* Grid of Cards or Empty State */}
      {hobbies.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          {hobbies.map((hobby) => (
            <ItemCard
              key={hobby._id}
              id={hobby._id} // Pass the string ID directly, no parseInt()
              title={hobby.title}
              imageUrl={hobby.imageUrl}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiActivity className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hobbies found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first hobby. Add a title and image to
            bring it to life.
          </p>
          <Button icon={<FiPlus />} onClick={() => setShowAddModal(true)}>
            Create Your First Hobby
          </Button>
        </div>
      )}

      {/* Add Modal */}
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddHobby}
        itemType="hobby"
      />

      {/* Edit Modal */}
      <EditItemModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingHobby(null);
        }}
        onSubmit={handleEditHobby}
        itemType="hobby"
        initialData={
          editingHobby
            ? {
                id: editingHobby._id,
                title: editingHobby.title,
                imageUrl: editingHobby.imageUrl,
              }
            : null
        }
      />
    </div>
  );
}

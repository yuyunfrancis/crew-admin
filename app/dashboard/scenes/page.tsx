"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiImage } from "react-icons/fi";
import Button from "@/components/Button";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import { getAllScenes, createScene, deleteScene, Scene } from "@/lib/scenes";

export default function ScenesPage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load scenes on component mount
  useEffect(() => {
    loadScenes();
  }, []);

  const loadScenes = async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedScenes = await getAllScenes();
      setScenes(fetchedScenes);
    } catch (error) {
      console.error("Error loading scenes:", error);
      setError("Failed to load scenes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    console.log("Edit scene:", id);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteScene(id.toString());
      setScenes(scenes.filter((scene) => scene._id !== id.toString()));
    } catch (error) {
      console.error("Error deleting scene:", error);
      setError("Failed to delete scene. Please try again.");
    }
  };

  const handleAddScene = async (data: { title: string; image?: File }) => {
    if (!data.image) {
      setError("Please select an image for the scene");
      return;
    }

    try {
      setError("");
      const newScene = await createScene(data.title, data.image);
      setScenes([...scenes, newScene]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating scene:", error);
      setError("Failed to create scene. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scenes</h1>
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
          <h1 className="text-2xl font-bold text-gray-900">Scenes</h1>
          <p className="text-gray-600">Manage all scenes ({scenes.length})</p>
        </div>
        <Button
          icon={<FiPlus />}
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Scene
        </Button>
      </div>

      {/* Grid of Cards or Empty State */}
      {scenes.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          {scenes.map((scene) => (
            <ItemCard
              key={scene._id}
              id={parseInt(scene._id)}
              title={scene.title}
              imageUrl={scene.imageUrl}
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
            No scenes found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first scene. Add a title and image to
            bring it to life.
          </p>
          <Button icon={<FiPlus />} onClick={() => setShowAddModal(true)}>
            Create Your First Scene
          </Button>
        </div>
      )}

      {/* Add Modal */}
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddScene}
        itemType="scene"
      />
    </div>
  );
}

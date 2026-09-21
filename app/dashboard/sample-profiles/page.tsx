"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiUsers, FiUpload } from "react-icons/fi";
import Button from "@/components/Button";
import {
  getAllSampleProfiles,
  createSampleProfile,
  updateSampleProfile,
  deleteSampleProfile,
  uploadTileImage,
  SampleProfile,
  SampleTile,
  SampleTileType,
} from "@/lib/sampleProfiles";

const TILE_TYPES: SampleTileType[] = ["image", "text", "spotify", "emoji"];

const emptyProfile = () => ({
  name: "",
  age: 24,
  gender: "male" as "male" | "female" | "other",
  order: 0,
  isActive: true,
  tiles: [] as SampleTile[],
});

export default function SampleProfilesPage() {
  const [profiles, setProfiles] = useState<SampleProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProfile());
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      setProfiles(await getAllSampleProfiles());
    } catch (e) {
      console.error(e);
      setError("Failed to load sample profiles.");
    } finally {
      setLoading(false);
    }
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyProfile());
    setShowForm(true);
  };

  const startEdit = (p: SampleProfile) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      age: p.age,
      gender: p.gender,
      order: p.order,
      isActive: p.isActive,
      tiles: p.tiles ?? [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sample profile?")) return;
    try {
      await deleteSampleProfile(id);
      setProfiles((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
      setError("Failed to delete.");
    }
  };

  const addTile = () =>
    setForm((f) => ({
      ...f,
      tiles: [...f.tiles, { type: "text", content: "", width: 1, height: 1 }],
    }));

  const updateTile = (i: number, patch: Partial<SampleTile>) =>
    setForm((f) => ({
      ...f,
      tiles: f.tiles.map((t, idx) => (idx === i ? { ...t, ...patch } : t)),
    }));

  const removeTile = (i: number) =>
    setForm((f) => ({ ...f, tiles: f.tiles.filter((_, idx) => idx !== i) }));

  const handleTileImage = async (i: number, file: File) => {
    try {
      const url = await uploadTileImage(file);
      updateTile(i, { content: url });
    } catch (e) {
      console.error(e);
      setError("Image upload failed.");
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      if (editingId) {
        const updated = await updateSampleProfile(editingId, form);
        setProfiles((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
      } else {
        const created = await createSampleProfile(form);
        setProfiles((prev) => [...prev, created]);
      }
      setShowForm(false);
    } catch (e) {
      console.error(e);
      setError("Failed to save sample profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Sample Profiles</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-800 ml-2">
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sample Profiles</h1>
          <p className="text-gray-600">
            The example profiles shown on the app&apos;s &quot;See Sample&quot; screen ({profiles.length}). The
            app uses its bundled examples only when none are active here.
          </p>
        </div>
        <Button icon={<FiPlus />} onClick={startAdd} className="w-full sm:w-auto">
          Add Sample Profile
        </Button>
      </div>

      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((p) => (
            <div key={p._id} className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500">
                    {p.age} · {p.gender} · {p.tiles?.length ?? 0} tiles ·{" "}
                    <span className={p.isActive ? "text-green-600" : "text-gray-400"}>
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-gray-500 hover:text-blue-600">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-gray-500 hover:text-red-600">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {(p.tiles ?? []).slice(0, 6).map((t, i) =>
                  t.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={t.content} alt="" className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div
                      key={i}
                      className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500"
                      title={t.content}
                    >
                      {t.type === "emoji" ? t.content : t.type[0].toUpperCase()}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sample profiles yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            The app is showing its bundled examples. Add one here to override them.
          </p>
          <Button icon={<FiPlus />} onClick={startAdd}>
            Create Sample Profile
          </Button>
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? "Edit" : "Add"} Sample Profile
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 text-2xl leading-none">
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-2 text-sm">
                <span className="text-gray-700">Name</span>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="text-sm">
                <span className="text-gray-700">Age</span>
                <input
                  type="number"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                />
              </label>
              <label className="text-sm">
                <span className="text-gray-700">Gender</span>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as "male" | "female" | "other" })}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </label>
              <label className="text-sm">
                <span className="text-gray-700">Order</span>
                <input
                  type="number"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </label>
              <label className="text-sm flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <span className="text-gray-700">Active</span>
              </label>
            </div>

            {/* Tiles editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">Tiles</span>
                <button onClick={addTile} className="text-blue-600 text-sm flex items-center gap-1">
                  <FiPlus /> Add tile
                </button>
              </div>
              <div className="space-y-2">
                {form.tiles.map((t, i) => (
                  <div key={i} className="border rounded-lg p-2 flex flex-wrap items-center gap-2">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={t.type}
                      onChange={(e) => updateTile(i, { type: e.target.value as SampleTileType })}
                    >
                      {TILE_TYPES.map((tt) => (
                        <option key={tt} value={tt}>
                          {tt}
                        </option>
                      ))}
                    </select>

                    {t.type === "image" ? (
                      <div className="flex items-center gap-2">
                        {t.content ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.content} alt="" className="w-9 h-9 rounded object-cover" />
                        ) : null}
                        <label className="text-xs text-blue-600 flex items-center gap-1 cursor-pointer">
                          <FiUpload /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleTileImage(i, e.target.files[0])}
                          />
                        </label>
                      </div>
                    ) : (
                      <input
                        className="border rounded px-2 py-1 text-sm flex-1 min-w-[120px]"
                        placeholder={t.type === "emoji" ? "🏀" : "Text / label"}
                        value={t.content}
                        onChange={(e) => updateTile(i, { content: e.target.value })}
                      />
                    )}

                    <input
                      type="number"
                      className="border rounded px-2 py-1 text-sm w-14"
                      title="width"
                      value={t.width}
                      onChange={(e) => updateTile(i, { width: Number(e.target.value) })}
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1 text-sm w-14"
                      title="height"
                      value={t.height}
                      onChange={(e) => updateTile(i, { height: Number(e.target.value) })}
                    />
                    <button onClick={() => removeTile(i)} className="text-gray-400 hover:text-red-600">
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border text-gray-700"
              >
                Cancel
              </button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

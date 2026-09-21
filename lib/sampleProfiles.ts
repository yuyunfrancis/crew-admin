import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'fallback-url';

export type SampleTileType = 'image' | 'text' | 'spotify' | 'emoji';

export interface SampleTile {
  type: SampleTileType;
  content: string; // image URL, or literal text for text/emoji/spotify
  width: number;
  height: number;
}

export interface SampleProfile {
  _id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  tiles: SampleTile[];
  order: number;
  isActive: boolean;
}

export interface SampleProfileInput {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  tiles: SampleTile[];
  order: number;
  isActive: boolean;
}

function authHeaders(json = true): HeadersInit {
  const token = getAuthToken();
  const h: Record<string, string> = { Authorization: `Bearer ${token}` };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

export async function getAllSampleProfiles(): Promise<SampleProfile[]> {
  const res = await fetch(`${API_BASE_URL}/admin/sample-profiles`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch sample profiles');
  const data = await res.json();
  return data.data || [];
}

export async function createSampleProfile(
  input: SampleProfileInput
): Promise<SampleProfile> {
  const res = await fetch(`${API_BASE_URL}/admin/sample-profiles`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create sample profile');
  const data = await res.json();
  return data.data;
}

export async function updateSampleProfile(
  id: string,
  input: Partial<SampleProfileInput>
): Promise<SampleProfile> {
  const res = await fetch(`${API_BASE_URL}/admin/sample-profiles/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to update sample profile');
  const data = await res.json();
  return data.data;
}

export async function deleteSampleProfile(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/sample-profiles/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete sample profile');
}

/** Upload a tile image; returns its hosted URL. */
export async function uploadTileImage(image: File): Promise<string> {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('image', image);
  const res = await fetch(`${API_BASE_URL}/admin/upload-image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload image');
  const data = await res.json();
  return data.data?.url as string;
}

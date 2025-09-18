import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'fallback-url';

export interface Vibe {
  _id: string;
  title: string;
  imageUrl: string;
}

export async function getAllVibes(): Promise<Vibe[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/preferences/vibes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vibes');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Get vibes error:', error);
    throw error;
  }
}

export async function createVibe(title: string, image: File): Promise<Vibe> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await fetch(`${API_BASE_URL}/admin/vibes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create vibe');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Create vibe error:', error);
    throw error;
  }
}

export async function updateVibe(id: string, title: string, image?: File): Promise<Vibe> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/admin/vibes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update vibe');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update vibe error:', error);
    throw error;
  }
}

export async function deleteVibe(id: string): Promise<void> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/vibes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete vibe');
    }
  } catch (error) {
    console.error('Delete vibe error:', error);
    throw error;
  }
}
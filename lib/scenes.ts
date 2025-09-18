import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'fallback-url';

export interface Scene {
  _id: string;
  title: string;
  imageUrl: string;
}

export async function getAllScenes(): Promise<Scene[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/preferences/scenes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch scenes');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Get scenes error:', error);
    throw error;
  }
}

export async function createScene(title: string, image: File): Promise<Scene> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await fetch(`${API_BASE_URL}/admin/scenes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create scene');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Create scene error:', error);
    throw error;
  }
}

export async function updateScene(id: string, title: string, image?: File): Promise<Scene> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/admin/scenes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update scene');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update scene error:', error);
    throw error;
  }
}

export async function deleteScene(id: string): Promise<void> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/scenes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete scene');
    }
  } catch (error) {
    console.error('Delete scene error:', error);
    throw error;
  }
}
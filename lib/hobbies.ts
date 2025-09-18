import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'fallback-url';

export interface Hobby {
  _id: string;
  title: string;
  imageUrl: string;
}

export async function getAllHobbies(): Promise<Hobby[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/preferences/hobbies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hobbies');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Get hobbies error:', error);
    throw error;
  }
}

export async function createHobby(title: string, image: File): Promise<Hobby> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await fetch(`${API_BASE_URL}/admin/hobbies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create hobby');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Create hobby error:', error);
    throw error;
  }
}

export async function updateHobby(id: string, title: string, image?: File): Promise<Hobby> {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/admin/hobbies/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update hobby');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update hobby error:', error);
    throw error;
  }
}

export async function deleteHobby(id: string): Promise<void> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/hobbies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete hobby');
    }
  } catch (error) {
    console.error('Delete hobby error:', error);
    throw error;
  }
}
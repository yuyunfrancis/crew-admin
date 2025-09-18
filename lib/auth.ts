const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'fallback-url';

interface PhoneLoginResponse {
  success: boolean;
  message: string;
  data: {
    userStatus: {
      exists: boolean;
      verified: boolean;
    };
  };
}

interface OTPVerifyResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    fullName: string;
    phoneNumber: string;
    verified: boolean;
    token: string;
  };
}

export async function sendPhoneVerification(phoneNumber: string): Promise<PhoneLoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to send verification code');
    }

    return await response.json();
  } catch (error) {
    console.error('Phone verification error:', error);
    throw error;
  }
}

export async function verifyOTP(phoneNumber: string, otp: string): Promise<OTPVerifyResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        phoneNumber, 
        otp 
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid verification code');
    }

    return await response.json();
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
}

export function saveAuthToken(token: string) {
  // Save to localStorage
  localStorage.setItem('token', token);
  
  // Also save to cookies for middleware access
  document.cookie = `token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=strict`;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    // Remove cookie too
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

export function logout() {
  removeAuthToken();
  window.location.href = '/login';
}
/**
 * Formats a US phone number to +1 (XXX) XXX-XXXX format
 * @param input - Raw phone number input
 * @returns Formatted phone number string
 */
export function formatUSPhoneNumber(input: string): string {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, '');
  
  // Don't format if no digits
  if (!digits) return '';
  
  // Handle different digit lengths
  if (digits.length === 1) {
    return `+1 (${digits}`;
  } else if (digits.length <= 3) {
    return `+1 (${digits}`;
  } else if (digits.length <= 6) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length <= 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    // Limit to 10 digits for US numbers
    const truncated = digits.slice(0, 10);
    return `+1 (${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  }
}

/**
 * Extracts just the digits from a formatted phone number
 * @param formattedNumber - Formatted phone number string
 * @returns Clean digits only
 */
export function getPhoneDigits(formattedNumber: string): string {
  return formattedNumber.replace(/\D/g, '');
}

/**
 * Validates if a phone number has exactly 10 digits (US format)
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if valid
 */
export function isValidUSPhoneNumber(phoneNumber: string): boolean {
  const digits = getPhoneDigits(phoneNumber);
  return digits.length === 10;
}
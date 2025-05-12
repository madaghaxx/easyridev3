import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const generateQRCode = (orderId: string) => {
  // This would typically call a QR code generation API or library
  // For now, we'll return a placeholder URL
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderId}`;
};
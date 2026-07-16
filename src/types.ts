/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Package {
  id: string;
  name: string;
  description: string;
  videosCount: number;
  averageDuration: string;
  hasSubtitles: boolean;
  deliveryDays: number;
  correctionsCount: number;
  originalPrice: number;
  price: number;
  isPopular?: boolean;
  features: string[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'audio' | 'video';
  previewUrl: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  duration?: string;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
}

export interface Review {
  id: string;
  name: string;
  businessType: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  approved?: boolean;
}

export interface OrderState {
  id: string;
  packageId: string;
  packageName: string;
  videosCount: number;
  uploadedImages: UploadedFile[];
  uploadedFiles: UploadedFile[];
  inputText: string;
  goals: string[];
  targetAudience: string;
  customAudience: string;
  speechStyle: string;
  contentEmphasis: string;
  clothingStyle: string;
  studioStyle: string;
  isPaid: boolean;
  date?: string;
  receiptEmail: string;
  status: 'pending' | 'received' | 'processing' | 'quality_assurance' | 'ready';
  price: number;
  couponCode?: string;
  couponApplied?: boolean;
  supportMessages: SupportMessage[];
  reviews: Review[];
  revisionsRequested?: boolean;
  revisionsText?: string;
}

export interface ClothingOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface StudioOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

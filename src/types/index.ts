// Types TypeScript pour la landing page Saint-Valentin

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PricingOption {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  recommended?: boolean;
  features: string[];
  image: string;
  ctaText: string;
}

export interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  image: string;
}

export interface Reason {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Guarantee {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
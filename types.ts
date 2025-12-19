export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  tags: string[];
}

export interface RecommendationRequest {
  mood: string;
  budget: string;
  duration: string;
  guests: number;
  preferences: string;
}

export interface AIRecommendation {
  destination: string;
  reason: string;
  suggestedActivities: string[];
}
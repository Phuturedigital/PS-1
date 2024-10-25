const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || '/api'
  : '/api';

export interface AnalyticsResponse {
  metrics: {
    totalRevenue: number;
    activeCampaigns: number;
    newClients: number;
    engagementRate: number;
  };
  trends: {
    revenue: { value: number; isPositive: boolean };
    campaigns: { value: number; isPositive: boolean };
    clients: { value: number; isPositive: boolean };
    engagement: { value: number; isPositive: boolean };
  };
}

export interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: string;
  reach: string;
  engagement: string;
  conversions: number;
  spend: string;
  roi: string;
}

export interface SocialInsights {
  followers: number;
  engagement: number;
  posts: number;
  demographics: {
    age: Array<{ range: string; percentage: number }>;
    gender: Array<{ type: string; percentage: number }>;
  };
}

class ApiService {
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } finally {
      clearTimeout(id);
    }
  }

  async getAnalytics(): Promise<AnalyticsResponse> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/analytics`);
      return response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw new Error('Failed to fetch analytics data');
    }
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/campaigns`);
      return response.json();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw new Error('Failed to fetch campaigns');
    }
  }

  async getSocialInsights(): Promise<SocialInsights> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/social/insights`);
      return response.json();
    } catch (error) {
      console.error('Error fetching social insights:', error);
      throw new Error('Failed to fetch social insights');
    }
  }
}

export const api = new ApiService();
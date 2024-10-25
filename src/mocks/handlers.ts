import { http, HttpResponse } from 'msw';

export const handlers = [
  // Analytics data
  http.get('/api/analytics', () => {
    return HttpResponse.json({
      metrics: {
        totalRevenue: 125430,
        activeCampaigns: 8,
        newClients: 24,
        engagementRate: 4.8
      },
      trends: {
        revenue: { value: 12.5, isPositive: true },
        campaigns: { value: 5, isPositive: true },
        clients: { value: 8, isPositive: true },
        engagement: { value: 0.5, isPositive: true }
      }
    });
  }),

  // Campaign data
  http.get('/api/campaigns', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Summer Sale 2024',
        platform: 'facebook',
        status: 'active',
        reach: '12.5K',
        engagement: '3.2K',
        conversions: 245,
        spend: 'R 2,500',
        roi: '2.4x'
      },
      {
        id: 2,
        name: 'Product Launch',
        platform: 'instagram',
        status: 'active',
        reach: '8.7K',
        engagement: '1.8K',
        conversions: 156,
        spend: 'R 1,800',
        roi: '1.8x'
      }
    ]);
  }),

  // Social media insights
  http.get('/api/social/insights', () => {
    return HttpResponse.json({
      followers: 24500,
      engagement: 4.8,
      posts: 128,
      demographics: {
        age: [
          { range: '18-24', percentage: 20 },
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 25 },
          { range: '45-54', percentage: 15 },
          { range: '55+', percentage: 5 }
        ],
        gender: [
          { type: 'Male', percentage: 45 },
          { type: 'Female', percentage: 55 }
        ]
      }
    });
  })
];
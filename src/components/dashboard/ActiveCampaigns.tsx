import React, { useEffect, useState } from 'react';
import { Play, Pause, BarChart3, Settings, Facebook, Instagram, Linkedin } from 'lucide-react';
import { api, Campaign } from '../../services/api';

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin
};

const platformColors = {
  facebook: 'border-blue-500',
  instagram: 'border-purple-500',
  linkedin: 'border-blue-700'
};

export default function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await api.getCampaigns();
        setCampaigns(data);
        setError(null);
      } catch (err) {
        setError('Error loading campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => {
        const Icon = platformIcons[campaign.platform];
        
        return (
          <div 
            key={campaign.id}
            className={`bg-white rounded-lg border-l-4 ${platformColors[campaign.platform]} p-4`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Icon className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{campaign.platform}</p>
                </div>
              </div>
              <button
                className={`p-2 rounded-full ${
                  campaign.status === 'active' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Reach</p>
                <p className="font-medium">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="font-medium">{campaign.engagement}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="View Analytics">
                <BarChart3 size={18} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Campaign Settings">
                <Settings size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
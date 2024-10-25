import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Database, BarChart, Settings2, CheckCircle2, XCircle } from 'lucide-react';

const integrations = [
  {
    category: 'Social Media',
    items: [
      { name: 'Facebook', icon: Facebook, status: 'connected', color: 'blue' },
      { name: 'Instagram', icon: Instagram, status: 'connected', color: 'purple' },
      { name: 'LinkedIn', icon: Linkedin, status: 'not-connected', color: 'blue' },
      { name: 'Twitter', icon: Twitter, status: 'not-connected', color: 'blue' }
    ]
  },
  {
    category: 'Analytics & Data',
    items: [
      { name: 'Google Analytics', icon: BarChart, status: 'connected', color: 'yellow' },
      { name: 'Custom Database', icon: Database, status: 'not-connected', color: 'gray' }
    ]
  }
];

const statusColors = {
  connected: 'text-green-600',
  'not-connected': 'text-red-600'
};

export default function IntegrationsSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        {integrations.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
            <div className="grid gap-4">
              {category.items.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center">
                    <integration.icon className={`h-5 w-5 mr-3 text-${integration.color}-500`} />
                    <span className="font-medium text-gray-900">{integration.name}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`flex items-center mr-4 text-sm ${statusColors[integration.status]}`}>
                      {integration.status === 'connected' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Connected
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Not Connected
                        </>
                      )}
                    </span>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Settings2 className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
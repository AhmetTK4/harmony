import React from 'react';

const Products: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Product Service</h3>
            <p className="mt-1 text-sm text-gray-500">
              Product management service is coming soon.
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 
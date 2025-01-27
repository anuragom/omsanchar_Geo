



import React from 'react';


const Dashboard = () => {
  return (
    <div className="overflow-y-hidden">
    
    <div className="relative fixed h-[90vh] flex items-center justify-center pt-24">
      <img
        src="/image/dashboard.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-[100vh] object-cover -z-10"
      />
      <div className="text-center mb-48 w-11/12 max-w-7xl bg-white bg-opacity-90 p-6 sm:p-12 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Geo Tracking Dashboard
        </h1>
      
      </div>
    </div>
  </div>
  );
};

export default Dashboard;

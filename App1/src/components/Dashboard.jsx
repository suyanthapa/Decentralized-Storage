import React from 'react';
import RecentFiles from './RecentFiles';

const Dashboard = ({ hospitalNames, fileDetails, contractInstance }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recent Files:</h1>
      
    
        <RecentFiles contractInstance={contractInstance} />
      </div>
  
  );
};

export default Dashboard;

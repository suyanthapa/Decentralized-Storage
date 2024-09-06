import React from 'react';

const HelpSection = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5 min-h-screen bg-gray-200 text-white">
      <h1 className="text-4xl text-black font-extrabold mb-8">Help - DataBridge</h1>

      <div className="w-fulll bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">1. Upload Files</h2>
        <p className="mb-6">
          To upload a file to DataBridge:
          <ul className="list-disc ml-5">
            <li>Go to the <strong>Upload Files</strong> section.</li>
            <li>Click on the <strong>Choose File</strong> button and select the file you want to upload from your device.</li>
            <li>Enter any additional information required (such as a description or tags).</li>
            <li>Click the <strong>Upload</strong> button.</li>
            <li>The file will be securely stored using IPFS (InterPlanetary File System) and its reference will be saved on the blockchain.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">2. Retrieve Files</h2>
        <p className="mb-6">
          To retrieve a file from DataBridge:
          <ul className="list-disc ml-5">
            <li>Navigate to the <strong>Retrieve Files</strong> section.</li>
            <li>Enter the <strong>Record ID</strong> associated with the file you wish to retrieve.</li>
            <li>Click the <strong>Retrieve File</strong> button.</li>
            <li>You will see the file details, including a link to view or download it if found.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">3. View Recent Uploaded Files</h2>
        <p className="mb-6">
          To view recently uploaded files:
          <ul className="list-disc ml-5">
            <li>Go to the <strong>Recent Files</strong> section.</li>
            <li>Browse through the list of recently uploaded files to DataBridge.</li>
            <li>Click on any file to view its details or download it.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
        <p>
          If you have any questions or need further assistance, please contact our support team at 
          <a href="mailto:support@databridge.com" className="text-blue-500 underline ml-1">support@databridge.com</a>.
        </p>
      </div>
    </div>
  );
};

export default HelpSection;

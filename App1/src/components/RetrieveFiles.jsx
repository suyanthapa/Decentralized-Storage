import React, { useState } from 'react';

const RetrieveFiles = ({ contractInstance, account }) => {
  const [recordId, setRecordId] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleRetrieve = async () => {
    if (!recordId) {
      setMessage('Please enter a record ID.');
      return;
    }

    if (!contractInstance) {
      setMessage('Contract instance not initialized.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Retrieve record details from the smart contract
      const record = await contractInstance.getRecord(recordId);
      const [uploader, hospital, fileHash] = record;

      console.log(record);

      // Construct the IPFS URL using the fileHash
      const fileUrl = `https:/fuchsia-realistic-rattlesnake-554.mypinata.cloud/ipfs/${fileHash}`;
      setFileInfo({ uploader, hospital, fileUrl });

      setMessage('File retrieved successfully!');
    } catch (error) {
      console.error("Error retrieving file:", error);
      setMessage('Error retrieving file. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-5">Retrieve Health Records</h2>
      
      <div className="mb-5">
        <input
          type="text"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
          placeholder="Enter Record ID"
          className="p-2 border border-gray-600 rounded bg-gray-700 text-white mr-2"
        />
        <button
          type="button"
          onClick={handleRetrieve}
          className="bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Retrieve File
        </button>
      </div>

      {message && <div className="text-red-500 mb-5">{message}</div>}

      {/* Display file details and content */}
      {fileInfo && (
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-3/4 max-w-2xl">
          <h3 className="text-xl font-bold mb-2">File Details:</h3>
          <p><strong>Uploader Address:</strong> {fileInfo.uploader}</p>
          <p><strong>Hospital:</strong> {fileInfo.hospital}</p>
          <p><strong>File URL:</strong> <a href={fileInfo.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{fileInfo.fileUrl}</a></p>
          <div className="mt-5">
            <h4 className="text-lg font-bold mb-2">File Preview:</h4>
            <img
              src={fileInfo.fileUrl}
              alt="File Preview"
              className="border border-gray-700 rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-white text-lg">Retrieving...</div>
        </div>
      )}
    </div>
  );
};

export default RetrieveFiles;

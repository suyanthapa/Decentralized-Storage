import React, { useState } from 'react';

const RetrieveFiles = ({ contractInstance, account }) => {
  const [recordId, setRecordId] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

      // Correct the URL format
      const fileUrl = `https://fuchsia-realistic-rattlesnake-554.mypinata.cloud/ipfs/${fileHash}`;

      // Optional: Fetch file metadata to determine content type
      const response = await fetch(fileUrl, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');

      setFileInfo({ uploader, hospital, fileUrl, contentType });

      setMessage('File retrieved successfully!');
    } catch (error) {
      console.error("Error retrieving file:", error);
      setMessage('Error retrieving file. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <h2 className="text-3xl font-extrabold mb-6">Retrieve Health Records</h2>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
          placeholder="Enter Record ID"
          className="w-full p-3 mb-4 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="button"
          onClick={handleRetrieve}
          className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
        >
          Retrieve File
        </button>
      </div>

      {message && <div className="text-red-400 mb-5">{message}</div>}

      {fileInfo && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
          <h3 className="text-2xl font-bold mb-4">File Details</h3>
          <p className="mb-2"><strong>Uploader Address:</strong> {fileInfo.uploader}</p>
          <p className="mb-2"><strong>Hospital:</strong> {fileInfo.hospital}</p>
          <p className="mb-4"><strong>File URL:</strong> <a href={fileInfo.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{fileInfo.fileUrl}</a></p>
          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-2">File Preview</h4>
            {fileInfo.contentType && fileInfo.contentType.startsWith('image/') ? (
              <img
                src={fileInfo.fileUrl}
                alt="File Preview"
                className="border border-gray-700 rounded-lg max-w-full h-auto"
              />
            ) : (
              <p className="text-gray-300">No preview available for this file type.</p>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <div className="absolute text-white text-lg mt-20">Retrieving...</div>
        </div>
      )}
    </div>
  );
};

export default RetrieveFiles;

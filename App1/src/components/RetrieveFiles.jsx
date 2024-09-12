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
      console.error('Error retrieving file:', error);
      setMessage('Error retrieving file. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-4">
      {/* Top Section: Input and Title */}
      <div className="left-0 w-full bg-gray-900 bg-opacity-90 p-4 shadow-lg z-50">
        <h2 className="text-3xl font-extrabold mb-4 text-center tracking-wide">Retrieve Health Records</h2>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            placeholder="Enter Record ID"
            className="p-3 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 mr-2 shadow-lg"
          />
          <button
            type="button"
            onClick={handleRetrieve}
            className="bg-blue-600 px-5 py-3 rounded-md shadow-md text-white hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Retrieve File
          </button>
        </div>
        {message && <div className="text-yellow-400 text-center font-semibold">{message}</div>}
      </div>

      {/* Main Content Section */}
      {/* <div className="pt-32 flex flex-col items-center">
        {fileInfo && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-xl mt-8">
            <h3 className="text-2xl font-bold mb-4 text-center border-b border-gray-700 pb-2">File Details</h3>
            <div className="text-base">
              <p className="mb-2"><strong>Uploader Address:</strong> {fileInfo.uploader}</p>
              <p className="mb-2"><strong>Hospital:</strong> {fileInfo.hospital}</p>
              <p className="mb-2"><strong>File URL:</strong>
                <a href={fileInfo.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                  {fileInfo.fileUrl}
                </a>
              </p>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">File Preview:</h4>
              {fileInfo.contentType && fileInfo.contentType.startsWith('image/') ? (
                <img
                  src={fileInfo.fileUrl}
                  alt="File Preview"
                  className="border border-gray-600 rounded-lg shadow-lg max-w-full h-auto"
                />
              ) : (
                <p className="text-gray-400">No preview available for this file type.</p>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
            <div className="text-white text-lg font-semibold animate-bounce">Retrieving...</div>
          </div>
        )}
      </div> */}

{fileInfo && (
        <div className='w-full px-4'>
          <table className='table-auto w-full text-left border '>
            <thead className='bg-gray-200 text-black px-4 py-2'>
              <tr >
                <th className=" border border-black px-4 py-2">Uploader's Address:</th>
                <th className="  border border-black px-4 py-2">Hospital</th>
                <th className=" border border-black  px-4 py-2">File Url</th>
              </tr>
            </thead>

            <tbody >
              <td  className="border px-4 py-2"> {fileInfo.uploader}</td>
              <td  className="border px-4 py-2"> {fileInfo.hospital}</td>
              <td  className="border px-4 py-2"> 
                  <a href={fileInfo.fileUrl} target="_blank" rel="noopener noreferrer" 
                  className="text-blue-400 hover:underline ml-1">
                  {fileInfo.fileUrl}
                </a>
              </td>
              
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RetrieveFiles;

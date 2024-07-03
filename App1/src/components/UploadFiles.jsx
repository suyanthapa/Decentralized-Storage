import React, { useState } from 'react';

const UploadFiles = ({ account }) => {
  const [hospital, setHospital] = useState('');
  const [addresses, setAddresses] = useState(['']);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Implement the logic to upload to the blockchain
    console.log('Uploading to blockchain:', { account, hospital, file, addresses });
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, '']);
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-3/4 max-w-9xl flex">
        {/* Main Data Section */}
        <div className="w-3/5 pr-5">
          <h2 className="text-2xl font-bold text-center mb-5 text-white">Upload Health Records</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-white">Address:</label>
              <input
                type="text"
                value={account}
                readOnly
                className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-white">Hospital:</label>
              <input
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="Enter hospital name"
                className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-white">Upload File:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Upload to Blockchain
            </button>
          </form>
        </div>
        {/* Share Access Section */}
        <div className="w-2/5 pl-5 bg-gray-900 p-5 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-5 text-white">Share Access</h2>
          {addresses.map((address, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                placeholder="Enter Address"
                className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
              />
              <button
                type="button"
                onClick={() => handleRemoveAddress(index)}
                className="ml-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-2 py-1 mt-2 text-sm border border-blue-500 bg-blue-600 text-white rounded"
            onClick={handleAddAddress}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;

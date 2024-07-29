import React, { useState } from 'react';

const UploadFiles = ({ contractInstance, account }) => {
  const [hospital, setHospital] = useState('');
  const [addresses, setAddresses] = useState(['']);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!account || !hospital || !file || addresses.length === 0) {
      setMessage('Please fill in all the fields.');
      return;
    }

    const fileHash = file.name; // For simplicity, using the file name here; you should use a real hash function like SHA-256

    try {
      const tx = await contractInstance.uploadRecord(hospital, fileHash);
      await tx.wait();

      setMessage('Record uploaded successfully!');
    } catch (error) {
      console.error("Error uploading record:", error);
      setMessage('Error uploading record. See console for details.');
    }
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
    <div className="flex justify-center items-center h-screen bg-cyan-950">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-3/4 max-w-9xl flex">
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
            {message && (
              <div className="text-red-500 text-center">
                {message}
              </div>
            )}
            <button
              type="button"
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Upload to Blockchain
            </button>
          </form>
        </div>
        <div className="w-2/5 pl-5 bg-gray-700 p-5 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-5 text-white">Share Access</h2>
          {addresses.map((address, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                placeholder="Recipient Address"
                className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={() => handleRemoveAddress(index)}
                className="ml-2 bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAddress}
            className="w-full bg-green-600 text-white p-2 rounded mt-3 hover:bg-green-700"
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;

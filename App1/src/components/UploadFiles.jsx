import axios from "axios";
import React, { useState } from 'react';
import homeImage from '../assets/home.jpg';

const UploadFiles = ({ contractInstance, account, addHospitalName, addFileDetails }) => {
  const [hospital, setHospital] = useState('');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!account || !hospital || !file) {
      setMessage('Please fill in all the fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: '0ce134a6f820a2671774',
          pinata_secret_api_key: '1b7b42c773eb6a17c85bf82172a7925fc0934b08d25d2d77c84f7369eff420fe',
          "Content-Type": "multipart/form-data",
        },
      });

      const fileHash = response.data.IpfsHash;
      console.log(fileHash);

      const tx = await contractInstance.uploadRecord(hospital, fileHash, date);
      await tx.wait();

      // Successfully uploaded, now update Dashboard
      setMessage('Record uploaded successfully!');
      addFileDetails({
        name: file.name,
        type: file.type,
        extension: file.name.split('.').pop(),
        date: date
      });
      addHospitalName(hospital);
    } catch (error) {
      console.error("Error uploading record:", error);
      setMessage('Error uploading record. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-3/4 max-w-9xl flex">
        <div className="w-full pr-5">
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
              <label className="block text-white">Date:</label>
              <input
                type="date"
                readOnly
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
      </div>

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-white text-lg">Uploading...</div>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
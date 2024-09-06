import axios from "axios";
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadFiles = ({ contractInstance, account, addHospitalName, addFileDetails }) => {
  const [hospital, setHospital] = useState('');
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleFileRemove = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (!account || !hospital || files.length === 0) {
      setMessage('Please fill in all the fields.');
      return;
    }
  
    setLoading(true); // Start loading
  
    try {
      console.log("Starting file upload...");
  
      // Upload all files to IPFS and get their hashes
      const fileHashes = [];
      for (const file of files) {
        console.log(`Uploading file: ${file.name}`);
        
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
  
        console.log(`File uploaded to IPFS. Hash: ${response.data.IpfsHash}`);
        
        fileHashes.push({
          ipfsHash: response.data.IpfsHash,
          fileName: file.name.split('.').slice(0, -1).join('.'), // Extract file name without extension
          fileType: file.name.split('.').pop(), // Extract file extension
        });
      }
  
      console.log("Uploading records to the blockchain...");
  
      // Upload all records to the blockchain with file name, file type, hospital name, date, and file hash
      for (const file of fileHashes) {
        const { fileName, fileType, ipfsHash } = file;
        console.log(`Uploading to blockchain: ${fileName}, ${fileType}, ${hospital}, ${date}, ${ipfsHash}`);
        const tx = await contractInstance.uploadRecord(hospital, fileName, fileType, date, ipfsHash);
        await tx.wait();
      }
  
      setMessage('Records uploaded successfully!');
      console.log("All records uploaded successfully.");
  
      files.forEach(file => {
        addFileDetails({
          name: file.name,
          type: file.type,
          extension: file.name.split('.').pop(),
          date: date
        });
      });
      addHospitalName(hospital);
    } catch (error) {
      console.error("Error uploading records:", error);
      setMessage('Error uploading records. See console for details.');
    } finally {
      setLoading(false); // End loading
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-black">
      <div className="bg-gray-100 p-10 rounded-lg shadow-2xl w-3/4 max-w-9xl flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-5">Upload Health Records</h2>
        <form className="space-y-5">
          <div>
            <label className="block">Address:</label>
            <input
              type="text"
              value={account}
              readOnly
              className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-300 shadow-xl"
            />
          </div>
          <div>
            <label className="block">Date:</label>
            <input
              type="date"
              readOnly
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-300"
            />
          </div>
          <div>
            <label className="block">Hospital:</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="Enter hospital name"
              className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-300"
            />
          </div>
          <div> 
            <label className="block">File:</label>
            <div
              className="bg-white p-6 rounded-lg shadow-md mb-6 border-dashed border-2 border-gray-300"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input').click()}
            >
              <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2 mx-auto" />
              <span className="text-center block">
                Drag and drop files here, or <a href="#" className="text-blue-500">Browse</a>
              </span>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {files.length > 0 && (
              <div className="mb-4">
                <label className="block">Selected Files:</label>
                <ul className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-300">
                  {files.map((file, index) => (
                    <li key={index} className="flex justify-between items-center py-1 px-2">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(file)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {message && (
              <div className="text-red-500 text-center">
                {message}
              </div>
            )}
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
  
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-white text-lg">Uploading...</div>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;

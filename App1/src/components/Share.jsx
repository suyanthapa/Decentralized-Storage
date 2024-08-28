import React, { useState } from 'react';
import { ethers } from "ethers";
import crypto from "crypto";

const UploadFiles = ({ contractInstance, account }) => {
  const [hospital, setHospital] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const hashFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const hash = crypto.createHash('sha256');
        hash.update(new Uint8Array(event.target.result));
        resolve(hash.digest('hex'));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    if (!account || !hospital || !file) {
      setMessage('Please fill in all the fields.');
      return;
    }

    try {
      const fileHash = await hashFile(file);
      const tx = await contractInstance.uploadRecord(hospital, fileHash);
      await tx.wait();

      setMessage('Record uploaded successfully to the blockchain!');
    } catch (error) {
      console.error("Error uploading record:", error);
      setMessage('Error uploading record. See console for details.');
    }
  };

  return (
    <div>
      <input type="text" value={hospital} onChange={(e) => setHospital(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to Blockchain</button>
      {message && <p>{message}</p>}
    </div>
  );
};

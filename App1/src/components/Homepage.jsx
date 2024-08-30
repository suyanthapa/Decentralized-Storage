import React from 'react';
import homeImage from '../assets/home.jpg'; // Correct import path

const Homepage = () => {
  return (
    <div
      className="relative text-white"
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '779px',
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
        <h1 className="text-6xl font-bold mb-5 text-fuchsia-300">Welcome to Data Chain</h1>
        <p className="text-3xl font-bold mb-5 text-fuchsia-300">Secure Health Record Management</p>
        <p className="text-xl mb-5 text-center max-w-xl">
          Upload and access your health records securely on the blockchain with CryptoBridge. Ensure data integrity and privacy with Ethereum smart contracts.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
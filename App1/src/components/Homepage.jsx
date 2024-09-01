import React from 'react';
import homeImage from '../assets/home.jpg'; // Correct import path

const Homepage = () => {
  return (
    <div
      className="relative text-white bg-gray-800"
      style={{
  


        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        height: '779px',
      }}
    >
      <div className="flex flex-col justify-center items-center text-center h-screen">
        <h1 className="text-6xl font-bold mb-5 "> <span className='text-green-400'>Unlock</span> the Power of Decentralized Storage with <span className='text-purple-400'>DataBridge</span></h1>
        {/* <p className="text-3xl font-bold mb-5 text-fuchsia-300">Secure Health Record Management</p> */}
        <p className="text-xl mb-5 text-center max-w-xl">
        Secure, Decentralized storage for all your important files.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
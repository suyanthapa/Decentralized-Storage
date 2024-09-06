import React from 'react';

const AboutSection = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5 min-h-screen bg-gray-200 text-white">
      <h1 className="text-4xl  text-black font-extrabold mb-8">About DataBridge</h1>

      <div className="w-full max-w-screen-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">What is DataBridge?</h2>
        <p className="mb-6">
          **DataBridge** is a decentralized storage platform that leverages blockchain and IPFS technology to provide secure, transparent, and immutable storage solutions. Our platform empowers users to securely upload, retrieve, and manage files without relying on centralized servers, ensuring data privacy, security, and reliability.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Choose DataBridge?</h2>
        <p className="mb-6">
          In a world where data breaches and privacy concerns are on the rise, DataBridge offers a decentralized alternative to traditional storage methods. By using blockchain technology, we ensure that your data is:
          <ul className="list-disc ml-5">
            <li><strong>Secure:</strong> Data is encrypted and stored across a distributed network, reducing the risk of data breaches.</li>
            <li><strong>Immutable:</strong> Once data is stored, it cannot be altered or deleted, ensuring data integrity.</li>
            <li><strong>Accessible:</strong> Access your data anytime, anywhere with a simple, user-friendly interface.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-6">
          At DataBridge, our mission is to provide a secure, decentralized platform for data storage that empowers users with full control over their information. We believe in a future where data privacy is a fundamental right, and our platform is built with that vision in mind.
        </p>

        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <p className="mb-6">
          Our team consists of passionate developers, blockchain experts, and data security enthusiasts who are dedicated to building innovative solutions for a decentralized future. Together, we strive to deliver a platform that meets the highest standards of security and usability.
        </p>

        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p>
          We'd love to hear from you! If you have any questions, feedback, or suggestions, feel free to reach out to us at 
          <a href="mailto:contact@databridge.com" className="text-blue-500 underline ml-1">contact@databridge.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;

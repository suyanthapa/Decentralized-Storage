import React from 'react';

const Header = ({ connectWallet, account }) => {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-between bg-gray-600 text-white py-5 px-5">
      <h1 className="text-2xl font-bold">Name Changer</h1>
      <div className="flex justify-between items-center gap-6">
      <div>
  <p>
    Address: {account ? `${account.slice(0, 6)}....${account.slice(-4)}` : "Not connected"}
  </p>
</div>

        {account ? (
          <button
            onClick={() => {}} // Placeholder for disconnect function
            className="bg-red-400 py-3 px-5 rounded-md hover:bg-red-600"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-400 py-3 px-5 rounded-md hover:bg-blue-600"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
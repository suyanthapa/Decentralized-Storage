import React from 'react';

const Header = ({ connectWallet, disconnectWallet, account, setActiveSection, activeSection }) => {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-between bg-gray-600 text-white py-5 px-5">
      <nav className="mx-auto flex items-center flex-row">
        <ul className="flex space-x-4">
          
          <li>
            <button
              className={`bg-zinc-500 py-3 px-5 rounded-md hover:bg-zinc-800 ${activeSection === 'upload' && 'bg-zinc-800'}`}
              onClick={() => setActiveSection('upload')} // Set the active section to 'upload'
            >
              Upload Health Records
            </button>
          </li>
          <li>
            <button
              className={`bg-zinc-500 py-3 px-5 rounded-md hover:bg-zinc-800 ${activeSection === 'transfer' && 'bg-zinc-800'}`}
              onClick={() => setActiveSection('transfer')} // Set the active section to 'transfer'
            >
              Transfer Money
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex justify-between items-center gap-6">
        <div>
          <p>
            Address: {account ? `${account.slice(0, 6)}....${account.slice(-4)}` : "Not connected"}
          </p>
        </div>

        {account ? (
          <button
            onClick={disconnectWallet}
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

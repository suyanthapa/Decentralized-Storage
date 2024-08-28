import React from 'react';

const Header = ({ connectWallet, disconnectWallet, account, setActiveSection, activeSection }) => {
  return (
    <header className="bg-cyan-900 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">DataChain</div>
      <nav>
        <button
          className={`text-white mx-2 ${activeSection === 'home' ? 'underline' : ''}`}
          onClick={() => setActiveSection('home')}
        >
          Home
        </button>
        <button
          className={`text-white mx-2 ${activeSection === 'upload' ? 'underline' : ''}`}
          onClick={() => setActiveSection('upload')}
        >
          Upload File
        </button>

        <button
          className={`text-white mx-2 ${activeSection ==='retreive' ? 'underline' : ''}`}
          onClick={() => setActiveSection('retireve')}
          >
        </button>
        <button
          className={`text-white mx-2 ${activeSection === 'transfer' ? 'underline' : ''}`}
          onClick={() => setActiveSection('transfer')}
        >
          Transfer Money
        </button >
       
        <button
       className='text-white mx-2'>
          About
        </button>
        <button
        className='text-white mx-2'>
          Contact
          </button>
      </nav>
      <div className="flex justify-between items-center gap-6">
        <div className='text-white'>
          <p>
            Address: {account ? `${account.slice(0, 6)}....${account.slice(-4)}` : "Not connected"}
          </p>
        </div>

        {account ? (
          <button
            onClick={disconnectWallet}
            className="bg-red-400 py-3 px-5 rounded-md hover:bg-red-600 text-white"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-400 py-3 px-5 rounded-md hover:bg-blue-600 text-white"
          >
            Connect
          </button>
          
        )}
      </div>
    
    </header>
  );
};

export default Header;
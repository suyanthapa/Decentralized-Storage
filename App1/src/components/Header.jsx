import React from 'react';

const Header =({ connectWallet, disconnectWallet, account, setActiveSection, activeSection })=> {
  return (
    <div>
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-950 text-white pt-8 z-10 flex flex-col justify-between">
        <div>
          <div className="text-white text-lg font-bold flex justify-center mb-8 ">DataBridge</div>
          <nav className="flex flex-col items-center space-y-4">
            <a
               href="/" 
               className={`hover:bg-gray-700 p-2 rounded w-full text-center ${activeSection === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700' }`}
                onClick={() => setActiveSection('home')}
            >
                Home  
            </a>

            <a
              href="#"
              className={`hover:bg-gray-700 p-2 rounded w-full text-center ${activeSection === 'upload' ? 'bg-gray-700' : 'hover:bg-gray-700' }`}
              onClick={() => setActiveSection('upload')}
            >
              Upload Files
            </a>

            <a
              href="#"
              className={`hover:bg-gray-700 p-2 rounded w-full text-center ${activeSection === 'retrieve' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveSection('retrieve')}
            >
              Retrieve Files
            </a>

            <a href="/help" className="hover:bg-gray-700 p-2 rounded w-full text-center">Help</a>
            <a href="/about" className="hover:bg-gray-700 p-2 rounded w-full text-center">About</a>
            <a href="/contact" className="hover:bg-gray-700 p-2 rounded w-full text-center">Contact</a>
          </nav>
          
          <div className="text-white text-base flex justify-center mt-56  flex flex-col">
            <div>
              <p className='flex justify-center'>
                Address: {account ? `${account.slice(0,6)}.....${account.slice(-5)}` : "Not Connected"}
                </p>
            </div>

            {account ? (
              <button
              onClick={disconnectWallet}
              className='bg-red-600 py-3 rounded-md hover:bg-red-7  00  '
              >
                Disconnect Wallet
              </button>
            )
            :(
              <button
              onClick={connectWallet}
              className='bg-blue-400 py-3 rounded-md hover:bg-blue-600 '
              >
                Connect Wallet
              </button>
            )} 
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Header;


      // {/* <nav  className='flex flex-col space-y-4'>
      //   <button
      //     className={`text-white mx-2 ${activeSection === 'home' ? 'underline' : ''}`}
      //     onClick={() => setActiveSection('home')}
      //   >
      //     Home
      //   </button>
      //   <button
      //     className={`text-white mx-2 ${activeSection === 'upload' ? 'underline' : ''}`}
      //     onClick={() => setActiveSection('upload')}
      //   >
      //     Upload File
      //   </button>

      //   <button
      //     className={`text-white mx-2 ${activeSection === 'retrieve' ? 'underline' : ''}`}
      //     onClick={() => setActiveSection('retrieve')}
      //   >
      //     Retrieve File
      //   </button>

      //   <button
      //     className={`text-white mx-2 ${activeSection === 'transfer' ? 'underline' : ''}`}
      //     onClick={() => setActiveSection('transfer')}
      //   >
      //     Transfer Money
      //   </button >
       
      //   <button
      //  className='text-white mx-2'>
      //     About
      //   </button>
      //   <button
      //   className='text-white mx-2'>
      //     Contact
      //     </button>
      // </nav>
      // <div className="flex justify-between items-center gap-6">
      //   <div className='text-white'>
      //     <p>
      //       Address: {account ? `${account.slice(0, 6)}....${account.slice(-4)}` : "Not connected"}
      //     </p>
      //   </div>

      //   {account ? (
      //     <button
      //       onClick={disconnectWallet}
      //       className="bg-red-400 py-3 px-5 rounded-md hover:bg-red-600 text-white"
      //     >
      //       Disconnect
      //     </button>
      //   ) : (
      //     <button
      //       onClick={connectWallet}
      //       className="bg-blue-400 py-3 px-5 rounded-md hover:bg-blue-600 text-white"
      //     >
      //       Connect with Metamask
      //     </button>
          
      //   )}
      // </div> */}
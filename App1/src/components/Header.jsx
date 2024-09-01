import React from 'react';
import logo from "../assets/logo.png";
import home from "../assets/home.png";
import upload from "../assets/upload.png";
import retrieve from "../assets/retrieve.png";
import help from "../assets/help.png";
import about from "../assets/about.png";


const Header =({ connectWallet, disconnectWallet, account, setActiveSection, activeSection })=> {
  return (
    <div>
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white pt-8 z-10 flex flex-col justify-between border border-black">
        <div>
          <div className="flex flex-col items-center mb-8 ">
            <img 
            src={logo} 
            alt=" Logo of the System" 
            className='h-24 w-auto '
             onClick={() => setActiveSection('home')}/>
         
        </div>
          <nav className="flex  flex-col items-center space-y-4">
            <a
               href="#" 
               className={`flex items-center  space-x-4 hover:bg-purple-950 pl-20 p-2 rounded w-full text-center  ${activeSection === 'dashboard' ? 'bg-purple-900' : 'hover:bg-gray-700' }`}
               onClick={() => setActiveSection('dashboard')}
            >
              <img src={home} alt="Home Icon" className='h-5 w-auto '/>
              <span>Dashboard</span>
            </a>

            <a
              href="#"
              className={`flex items-center space-x-4 hover:bg-purple-950 p-2 pl-20 rounded w-full text-center  ${activeSection === 'upload' ? 'bg-purple-900' : 'hover:bg-gray-700' }`}
              onClick={() => setActiveSection('upload')}
            >
              <img src={upload} alt="Upload Icon" className='h-5 w-auto '/>
              <span>Upload </span>
            
            </a>

            <a
              href="#"
              className={`flex items-center space-x-4 hover:bg-purple-950 p-2  pl-20  rounded w-full text-center ${activeSection === 'retrieve' ? 'bg-purple-900' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveSection('retrieve')}
            >
              <img src={retrieve} alt="Retrieve Icon" className='h-5 w-auto '/>
              <span>  Retreieve </span>
            </a>

            <a
             href="/help" 
             className=" flex items-center space-x-4 hover:bg-purple-950 p-2 pl-20 rounded w-full text-center"
             >
               <img src={help} alt="Help Icon" className='h-5 w-auto '/>
               <span> Help</span>
            </a>

            <a
             href="/about"
             className="flex items-center space-x-4 hover:bg-purple-950 p-2 pl-20 rounded w-full text-center"
             >
             <img src={about} alt="About Icon" className='h-5 w-auto '/>
             <span>About</span>
             </a>

           
          </nav>
          
          <div className="text-white text-base flex justify-center mt-44  flex flex-col">
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
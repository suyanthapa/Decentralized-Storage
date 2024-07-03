// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"; // Import ethers.js for interacting with the Ethereum blockchain
import ABI from './constant/ABI.json'; // Import the ABI (Application Binary Interface) of the smart contract
import Header from "./components/Header"; // Import Header component
import SendMoney from "./components/SendMoney"; // Import SendMoney component
import TransactionList from "./components/TransactionList"; // Import TransactionList component
import UploadFiles from "./components/UploadFiles"; // Import UploadFiles component

// Main App component
function App() {
  // State variables to store the account address, contract instance, transactions, and active section
  const [account, setAccount] = useState(null); // Stores the connected wallet's account address
  const [contractInstance, setContractInstance] = useState(null); // Stores the initialized contract instance
  const [transactions, setTransactions] = useState([]); // Stores the list of transactions
  const [activeSection, setActiveSection] = useState('home'); // Stores the currently active section

  // Ethereum smart contract address
  const contractAddress = "0x7EC6291884b9Ad94ae2565a2635EE90894144D13";

  // Function to initialize the contract
  const initializeContract = async (account) => {
    if (window.ethereum) { // Check if the Ethereum object is available in the browser
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Create a provider to interact with the Ethereum blockchain
        const signer = provider.getSigner(); // Create a signer for signing transactions
        const contract = new ethers.Contract(contractAddress, ABI, signer); // Initialize the contract instance
        setContractInstance(contract); // Set the contract instance in state

        // Set up an event listener for the "MoneySent" event emitted by the contract
        contract.on("MoneySent", (from, to, amount, timestamp) => {
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            { from, to, amount: ethers.utils.formatEther(amount), timestamp: new Date(timestamp * 1000).toLocaleString() }
          ]); // Update the transactions state with the new transaction
        });
      } catch (error) {
        console.error("Error initializing contract:", error); // Log any errors during contract initialization
      }
    } else {
      console.log("Ethereum object doesn't exist!"); // Log if the Ethereum object is not available
    }
  };

  // Function to connect the wallet
  const connectWallet = async () => {
    if (window.ethereum) { // Check if the Ethereum object is available
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); // Request the user's Ethereum accounts
        setAccount(accounts[0]); // Set the account state to the first account
        initializeContract(accounts[0]); // Initialize the contract with the connected account
      } catch (error) {
        console.error("Error connecting wallet:", error); // Log any errors during wallet connection
      }
    } else {
      console.log("Ethereum object doesn't exist!"); // Log if the Ethereum object is not available
    }
  };

  // Function to disconnect the wallet
  const disconnectWallet = async () => {
    setAccount(null); // Reset the account state
    setContractInstance(null); // Reset the contract instance state
    setTransactions([]); // Reset the transactions state
  };

  return (
    <div>
      {/* Render the Header component and pass necessary props */}
      <Header
        connectWallet={connectWallet} // Pass connectWallet function as a prop
        disconnectWallet={disconnectWallet} // Pass disconnectWallet function as a prop
        account={account} // Pass account state as a prop
        setActiveSection={setActiveSection} // Pass setActiveSection function as a prop
        activeSection={activeSection} // Pass activeSection state as a prop
      />

      <div className="p-5">
        {/* Conditionally render components based on the active section */}
        {activeSection === 'upload' && <UploadFiles account={account} />} {/* Render UploadFiles component if activeSection is 'upload' */}
        {activeSection === 'transfer' && (
          <div>
            <SendMoney contractInstance={contractInstance} /> {/* Render SendMoney component and pass contractInstance */}
            <TransactionList transactions={transactions} /> {/* Render TransactionList component and pass transactions */}
          </div>
        )}
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;

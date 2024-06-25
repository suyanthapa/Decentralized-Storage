import React, { useState, useEffect } from "react"; // Importing React and its hooks
import Header from "./components/Header"; // Importing the Header component
import { ethers } from "ethers"; // Importing the ethers.js library for Ethereum interactions
import ABI from './constant/ABI.json'; // Importing the ABI (Application Binary Interface) for the smart contract
import Hero from "./components/Hero"; // Importing the Hero component
import SendMoney from "./components/SendMoney"; // Importing the SendMoney component

// Setting up the main component
function App() {
  const [account, setAccount] = useState(null); // State to store the user's Ethereum account
  const [name, setName] = useState(''); // State to store the name fetched from the smart contract
  const [contractInstance, setContractInstance] = useState(null); // State to store the contract instance

  const contractAddress = "0x7aAD3Ac93921A8eF3366c9c11E1708082EBE40f9"; // The address of the deployed smart contract


  //Handling Account Changes
  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on('accountsChanged', (accounts) => {
  //       setAccount(accounts[0]); // Update the account state when the user changes their account in MetaMask
  //       initializeContract(accounts[0]); // Reinitialize the contract with the new account
  //     });
  //   }
  // }, []);

//Initializing Contract
const initializeContract = async (account) => {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Create a provider to interact with the blockchain
      const signer = provider.getSigner(); // Get the signer (the user's account)
      const contract = new ethers.Contract(contractAddress, ABI, signer); // Create a contract instance
      setContractInstance(contract); // Store the contract instance in the state
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  } else {
    console.log("Ethereum object doesn't exist!");
  }
};

// Connecting the Wallet
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); // Request accounts from MetaMask
      setAccount(accounts[0]); // Set the account state
      initializeContract(accounts[0]); // Initialize the contract with the account
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  } else {
    console.log("Ethereum object doesn't exist!");
  }
};

//Disconnecting the Wallet
const disconnectWallet = async () => {
  setAccount(null); // Reset the account state
  setContractInstance(null); // Reset the contract instance state
};

//Fetching the Name from the Smart Contract
const getMyName = async () => {
  if (contractInstance) {
    try {
      const myName = await contractInstance.getName(); // Call the getName function from the smart contract
      setName(myName); // Update the name state
    } catch (error) {
      console.error("Error getting name:", error);
    }
  } else {
    console.log("Contract instance is not set");
  }
};

//Rendering the App Component

return (
  <div>
    <Header connectWallet={connectWallet} disconnectWallet={disconnectWallet} account={account} /> 
    {/* Header component with props for connecting/disconnecting wallet and displaying account */}


  
    {/* Hero component with props for getting name and contract instance */}
   
  </div>
);
}

export default App;

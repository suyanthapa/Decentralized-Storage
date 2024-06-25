import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from './constant/ABI.json';
import Header from "./components/Header";
import SendMoney from "./components/SendMoney";
import TransactionList from "./components/TransactionList";
import Hero from "./components/Hero"; // Importing the Hero component

function App() {
  const [account, setAccount] = useState(null); // State to store the user's Ethereum account
  const [contractInstance, setContractInstance] = useState(null); // State to store the contract instance
  const [name, setName] = useState(''); // State to store the name fetched from the smart contract
  const [transactions, setTransactions] = useState([]); // State to store the transactions

  const contractAddress = "0x7EC6291884b9Ad94ae2565a2635EE90894144D13"; // Replace with your deployed contract address


  // Initialize Contract
  const initializeContract = async (account) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        setContractInstance(contract);

        // Listen for MoneySent events
        contract.on("MoneySent", (from, to, amount, timestamp) => {
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            { from, to, amount: ethers.utils.formatEther(amount), timestamp: new Date(timestamp * 1000).toLocaleString() }
          ]);
        });
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        initializeContract(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  const disconnectWallet = async () => {
    setAccount(null);
    setContractInstance(null);
    setTransactions([]);
  };

  
  // Fetching the Name from the Smart Contract
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

  return (
    <div >
      <Header connectWallet={connectWallet} disconnectWallet={disconnectWallet} account={account} />
      
      <Hero name={name} getMyName={getMyName} contractInstance={contractInstance} />
      <SendMoney contractInstance={contractInstance} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;

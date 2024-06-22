import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { ethers } from "ethers";
import ABI from './constant/ABI.json';
import Hero from "./components/Hero";
// import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [contractInstance, setContractInstance] = useState(null);

  const contractAddress = "0xffD8A6d71374b65AB8d1134f6b47AD56257Ae9ba";

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        initializeContract(accounts[0]);
      });
    }
  }, []);

  const initializeContract = async (account) => {
    if (window.ethereum) {
      try {
        console.log("Initializing ethers...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        setContractInstance(contract);
        console.log("Contract instance initialized:", contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
        initializeContract(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  const getMyName = async () => {
    if (contractInstance) {
      try {
        console.log("Fetching name from contract...");
    
        const myName = await contractInstance.getName();  // Correct method name
        console.log("Name retrieved:", myName);
        setName(myName);
      } catch (error) {
        console.error("Error getting name:", error);
      }
    } else {
      console.log("Contract instance is not set");
    }
  };

  return (
    <div>
      <Header connectWallet={connectWallet} account={account} />
      <Hero name={name} getMyName={getMyName} contractInstance={contractInstance} />
    </div>
  );
}

export default App;


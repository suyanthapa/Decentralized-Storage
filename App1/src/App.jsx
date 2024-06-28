import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from './constant/ABI.json';
import Header from "./components/Header";
import SendMoney from "./components/SendMoney";
import TransactionList from "./components/TransactionList";

import UploadFiles from "./components/UploadFiles";

function App() {
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState('home'); // Set default active section to 'home'

  const contractAddress = "0x7EC6291884b9Ad94ae2565a2635EE90894144D13";

  const initializeContract = async (account) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        setContractInstance(contract);

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

  const getMyName = async () => {
    if (contractInstance) {
      try {
        const myName = await contractInstance.getName();
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
      <Header
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        account={account}
        setActiveSection={setActiveSection}
        activeSection={activeSection} // Pass activeSection to Header
      />

      <div className="p-5">
       

        {activeSection === 'upload' && <UploadFiles />}

        {activeSection === 'transfer' && (
          <div>
            <SendMoney contractInstance={contractInstance} />
            <TransactionList transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from './constant/ABI.json';
import Header from "./components/Header";
import UploadFiles from "./components/UploadFiles";
import RetrieveFiles from "./components/RetrieveFiles";
import Homepage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import HelpSection from './components/HelpSection';
import AboutSection from './components/AboutSection.jsx';

function App() {
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [hospitalNames, setHospitalNames] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);

  const contractAddress = "0x2e7E860Aa70B2Ab1Af0f021Bc461a17D1Cfa4F9B";

  const initializeContract = async (account) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        setContractInstance(contract);

       
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      console.error("Ethereum object doesn't exist!");
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
      console.error("Ethereum object doesn't exist!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContractInstance(null);
    setTransactions([]);
  };

  const addHospitalName = (name) => {
    setHospitalNames(prevNames => [...prevNames, name]);
  };

  const addFileDetails = (details) => {
    setFileDetails(prevDetails => [...prevDetails, details]);
  };

  return (
    <div className="min-h-screen flex">
      <Header
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        account={account}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <div className="flex-grow ml-64">
        {activeSection === 'home' && <Homepage />}
        {activeSection === 'dashboard' && <Dashboard hospitalNames={hospitalNames} fileDetails={fileDetails} contractInstance={contractInstance} />}
        {activeSection === 'upload' && <UploadFiles account={account} contractInstance={contractInstance} addHospitalName={addHospitalName} addFileDetails={addFileDetails} />}
        {activeSection === 'retrieve' && <RetrieveFiles account={account} contractInstance={contractInstance} />}
        {activeSection === 'help' && <HelpSection />}
        {activeSection === 'about' && <AboutSection />}
       
      </div>
    </div>
  );
}

export default App;

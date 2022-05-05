import logo from './logo.svg';
import './App.css';
import ethers from 'ethers';
import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';


import Connection from './components/connection/connection'
import Send from './components/send/send'
import History from './components/history/history'
import Home from './components/home/home'

function App() {
    const [provider, setProvider] = useState(null);
    const [history, setHistory] = useState(null);
    const [token, setToken] = useState('ETH');

    function getProvider(currentProvider) {
        setProvider(currentProvider)
    }
    function getHistory(currentHistory) {
        setHistory(currentHistory);
    }
    function getToken(currentToken) {
        setToken(currentToken)
    }
    return (
        <main>
            {/* <Home provider={ provider } getProvider={ getProvider } /> */}
            <Routes>
                <Route path="/" element={ <Home provider={ provider } getProvider={ getProvider } /> } /> 
                <Route path="/send" element={
                    <>
                        <Home provider={ provider } getProvider={ getProvider } token={ token } />  
                        { provider ? <Send provider={ provider } getProvider={getProvider} token={token} getToken={ getToken} /> : '' }
                    </>
                } />
                <Route path="/history" element={
                    <>
                         <Home provider={ provider } getProvider={ getProvider } token={ token} /> 
                        { provider ? <History provider={ provider } getHistory={ getHistory } /> : '' }
                    </>
                } />
            </Routes>
        </main>


    );
}

export default App;

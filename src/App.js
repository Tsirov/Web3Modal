import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';


import Connection from './components/connection/connection'
import Send from './components/send/send'
import History from './components/history/history'
import Home from './components/home/home'

function App() {
    const [provider, setProvider] = useState(null);
    const [count, setCount] = useState(1);

    function getProvider(currentProvider) {
        setProvider(currentProvider)
    }
    console.log('APP', provider);
    return (
        <main>
            {/* <Connection provider={ getProvider } /> */ }

            <Routes>
                {/* <Route path="/" element={ <Connection provider={ getProvider } /> } /> */ }
                <Route path="/" element={ <Home provider={ provider } getProvider={ getProvider } /> } />


                <Route path="/send" element={
                    <>
                        <Home provider={ provider } getProvider={ getProvider } />
                        <Send provider={ provider } />
                    </>

                } />

                <Route path="/history" element={
                    <>
                        <Home provider={ provider } getProvider={ getProvider } />
                        <History provider={ provider } />
                    </>
                } />
            </Routes>
        </main>


    );
}

export default App;

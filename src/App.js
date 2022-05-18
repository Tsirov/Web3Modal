import { useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';


import './App.css';
import Send from './components/send/send'
import History from './components/history/history'
import Home from './components/home/home'

function App() {
    const [provider, setProvider] = useState(null);
    const [proxy, setProxy] = useState(null);
    const [token, setToken] = useState('ETH');
    const [accountRefresh, setAccountRefresh] = useState(false);

    function setProxyHandler(currentProvider) { 
        setProxy(currentProvider);
    }
   
    function getToken(currentToken) {
        setToken(currentToken)
    }

    useEffect(() => {
        if (proxy) {
            const currentProvider = new ethers.providers.Web3Provider(proxy);
            setProvider(currentProvider);
        } else {
            setProvider(null);
            setToken('ETH');
        }
        setAccountRefresh(false);
    }, [proxy,accountRefresh]);

    return (
        <main>
            <Routes>
                <Route path="/" element={ <Home provider={ provider } setProxyHandler={ setProxyHandler  } setAccountRefresh={setAccountRefresh}/> } /> 
                <Route path="/send" element={
                    <>
                        <Home provider={ provider } setProxyHandler={ setProxyHandler } token={ token } setAccountRefresh={setAccountRefresh}/>  
                        { provider ? <Send provider={ provider } setProxyHandler={setProxyHandler} token={token} getToken={ getToken} setAccountRefresh={setAccountRefresh} /> : '' }
                    </>
                } />
                <Route path="/history" element={
                    <>
                         <Home provider={ provider } setProxyHandler={ setProxyHandler } token={ token} setAccountRefresh={setAccountRefresh}/> 
                        { provider ? <History provider={ provider } /> : '' }
                    </>
                } />
            </Routes>
        </main>
    );
}

export default App;

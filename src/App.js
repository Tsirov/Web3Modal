import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Send from './components/send/send'
import History from './components/history/history'
import Home from './components/home/home'

function App() {
    const [provider, setProvider] = useState(null);
    const [token, setToken] = useState('ETH');

    function getProvider(currentProvider) {
        setProvider(currentProvider)
    }
   
    function getToken(currentToken) {
        setToken(currentToken)
    }
    return (
        <main>
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
                        { provider ? <History provider={ provider } /> : '' }
                    </>
                } />
            </Routes>
        </main>
    );
}

export default App;

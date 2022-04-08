import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './connection.css';

const Connection = (props) => {
    let [provider, setProvider] = useState(undefined);
    const navigate = useNavigate();
    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions: {}
    });
    
    async function connectWallet() {
        try {
            const currentProvider = await web3Modal.connect();
            setProvider(currentProvider);
            const providerEthers = new ethers.providers.Web3Provider(currentProvider);
            props.provider(currentProvider)
            currentProvider.on("accountsChanged", (e) => {
                console.log("accountsChanged");
            })
            currentProvider.on("disconnect", () => {
                console.log("disconnect");
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        };

    };

    return (
        <>
            {provider ? '' : <h1>Connect to Wallet</h1> }
            
            {provider ? '' : <button className="connection-button" onClick={ connectWallet }>Connect</button> }

        </>
        
    )
    
}

export default Connection;
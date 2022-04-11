import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import './connection.css';

const Connection = (props) => {
    const getProvider = props.getProvider;
    let [provider, setProvider] = useState(undefined);
    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions: {}
    });

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, [props.provider]);

    async function connectWallet() {
        
        try {
            const currentProvider = await web3Modal.connect();
            setProvider(currentProvider);
            const providerEthers = new ethers.providers.Web3Provider(currentProvider);
            props.provider(currentProvider)
            currentProvider.on("accountsChanged", (e) => {
                if (e[0].length > 0) {
                    getProvider(null);
                } else {
                    web3Modal.clearCachedProvider();
                    getProvider(null);
                }
                console.log("accountsChanged");
            })
            currentProvider.on("disconnect", () => {
                console.log("disconnect");
            });
            // navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            { provider ? '' : <h1>Connect to Wallet</h1> }

            { provider ? '' : <button className="connection-button" onClick={ connectWallet }>Connect</button> }

        </>

    )

}

export default Connection;
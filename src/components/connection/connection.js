import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from "@walletconnect/web3-provider";

import './connection.css';

const Connection = (props) => {
    const getProvider = props.getProvider;
    let [provider, setProvider] = useState(undefined);
    const INFURA_ID = 'f71e0fb08d4f4feba66004cd0ffd4200';
    const providerOptions = {
        coinbasewallet: {
            package: CoinbaseWalletSDK, 
            options: {
                infuraId: INFURA_ID, 
            }
        },
        walletconnect: {
            package: WalletConnectProvider, 
            options: {
              infuraId: INFURA_ID 
            }
          }
    }

    const web3Modal = new Web3Modal({
        cacheProvider: true, 
        providerOptions
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
            props.provider(currentProvider)
            currentProvider.on("accountsChanged", (e) => {
                if (e.length > 0) {
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
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            { provider ? '' : <h1 className="connection-name">Connect to Wallet</h1> }
            { provider ? '' : <button className="connection-button" onClick={ connectWallet }>Connect</button> }

        </>
    )
}

export default Connection;
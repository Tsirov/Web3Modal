import { ethers } from 'ethers'
import { useEffect, useState } from 'react';

import './home.css';
import Header from '../header/header';
import Connection from '../connection/connection';
import Token from './Token-abi.json'

const tokenAddress = '0x2e603651cae253f37a786119962d2de21826a42b';

const Home = (props) => {
    const provider = props.provider;
    const token = props.token;
    const setAccountRefresh = props.setAccountRefresh;
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);

    const [contract, setContract] = useState('');

    useEffect(() => {
        async function start() {
            if (provider) {
                try {
                    const currentSigner = provider.getSigner();
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress);
                    const currentNetwork = await provider.getNetwork();
                    setNetwork(currentNetwork);
                    const currentBalance = await provider.getBalance(currentAddress);
                    setBalance(ethers.utils.formatEther(currentBalance));
                    const currentContract = new ethers.Contract(tokenAddress, Token.abi, provider);
                    setContract(currentContract);
                    const balance = await currentContract.balanceOf(currentAddress);
                    setTokenBalance(ethers.utils.formatEther(balance));
                } catch (err) {
                    console.log(err);
                }
            } else {
                setAddress('');
                setNetwork('');
                setBalance(0);
                setContract('');
            }
        }
        start();
    }, [provider]);

    return (
        <section className="home-wrapper">
            { props.provider
                ?
                <section className="home-header">
                    <article className="home-network">
                        <p className="home-network-connect">Connected to:</p>
                        <h3 className="home-network-network">{ network.name } Network</h3>
                    </article>
                    
                    <Header provider={ provider } setProxyHandler={ props.setProxyHandler } contract={contract } />
                    <article className="home-account-info">
                        <p className="home-address">{ address }</p>
                        <p className="home-account-info-balance">Balance is <b>{ balance }</b>  ETH </p>
                        { token === 'ETH' ? '' : <p className="home-account-info-balance">Balance is <b>{ tokenBalance }</b>  { token } </p> }
                    </article>
                </section>
                :
                <Connection provider={ props.provider }  setProxyHandler={ props.setProxyHandler } setAccountRefresh={setAccountRefresh}/>
            }
        </section>
    )
}

export default Home;
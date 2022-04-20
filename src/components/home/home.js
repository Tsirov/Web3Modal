import Header from '../header/header';
import Connection from '../connection/connection';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import './home.css';
import Token from './Token-abi.json'

const tokenAddress = '0xb9ebd829546effcab00d74b1448d0c6b7e32adba';

const Home = (props) => {
    const currentProvider = props.provider;
    const token = props.token;
    const [provider, setProvider] = useState({});
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);

    useEffect(() => {
        async function start() {
            if (currentProvider) {
                try {
                    const ethProvider = new ethers.providers.Web3Provider(currentProvider);
                    setProvider(ethProvider)
                    const currentSigner = ethProvider.getSigner();
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress);
                    const currentNetwork = await ethProvider.getNetwork();
                    setNetwork(currentNetwork);
                    const currentBalance = await ethProvider.getBalance(currentAddress);
                    setBalance(ethers.utils.formatEther(currentBalance));

                    const currentContract = new ethers.Contract(tokenAddress, Token.abi, ethProvider);
                    const balance = await currentContract.balanceOf(currentAddress);
                    setTokenBalance(ethers.utils.formatEther(balance));
                } catch (err) {
                    console.log(err);
                }
            } else {
                setProvider({});
                setAddress('');
                setNetwork('');
                setBalance(0);
            }
        }
        start();
    }, [currentProvider]);

    return (
        <section className="home-wrapper">
            { props.provider
                ?
                <section className="home-header">
                    <article className="home-network">
                        <p className="home-network-connect">Connected to:</p>
                        <h3 className="home-network-network">{ network.name } Network</h3>
                    </article>

                    <Header provider={ provider } getProvider={ props.getProvider } />
                    <article className="home-account-info">
                        <p className="home-address">{ address }</p>
                        <p className="home-account-info-balance">Balance is <b>{ balance }</b>  ETH </p>
                       {token === 'ETH' ? '': <p className="home-account-info-balance">Balance is <b>{ tokenBalance }</b>  {token} </p>} 
                    </article>
                </section>
                :
                <Connection provider={ props.getProvider } getProvider={ props.getProvider } />
            }
        </section>
    )
}

export default Home;
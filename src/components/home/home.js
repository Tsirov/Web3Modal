import Header from '../header/header';
import Connection from '../connection/connection';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import './home.css';

const Home = (props) => {
    console.log('home', props.provider);
    const currentProvider = props.provider;
    const [provider, setProvider] = useState({});
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState(0);



    useEffect(() => {
        async function start() {
            if (currentProvider) {
                const ethProvider = new ethers.providers.Web3Provider(currentProvider);
                setProvider(ethProvider)
                const currentSigner = ethProvider.getSigner();
                const currentAddress = await currentSigner.getAddress();
                setAddress(currentAddress);
                const currentNetwork = await ethProvider.getNetwork();
                setNetwork(currentNetwork);
                const currentBalance = await ethProvider.getBalance(currentAddress);
                setBalance(ethers.utils.formatEther(currentBalance));

            }
        }
        start();
    }, [currentProvider]);



    return (
        <section className="home-wrapper">
            {/* <article className="home-second-wrapper"> */ }
            { props.provider
                ?

                <section className="home-header">
                    <article className="home-network">
                        <p className="home-network-connect">Connected to:</p>
                        <h3 className="home-network-network">{ network.name } Network</h3>
                    </article>

                    <Header provider={ provider } />
                    <article className="home-account-info">
                        <p className="home-address">{ address }</p>
                        <p className="home-account-info-balance">Balance is <b>{ balance }</b>  ETH </p>
                    </article>

                </section>

                :
                // <article className="home-button-connection">
                <Connection provider={ props.getProvider } />
                // </article> 
            }
            {/* </article> */ }
        </section>
    )
}

export default Home;
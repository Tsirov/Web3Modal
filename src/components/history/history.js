import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './history.css'

const History = (props) => {
    const currentProvider = props.provider;
    const [signer, setSigner] = useState('');
    const [provider, setProvider] = useState('');
    const [history, setHistory] = useState([]);
    const [address, setAddress] = useState('');
    const [sendPayments, setSendPayments] = useState([]);
    const [receivePayments, setReceivePayments] = useState([]);

    // useEffect(() => {
    //     if (currentProvider) {
    //         const ethProvider = new ethers.providers.Web3Provider(currentProvider);
    //         const currentSigner = ethProvider.getSigner();
    //         setSigner(currentSigner)
    //         setProvider(ethProvider)

    //     }
    // }, [currentProvider]);

    useEffect(() => {
        if (currentProvider) {
            async function start() {
                try {
                    const ethProvider = new ethers.providers.Web3Provider(currentProvider);
                    const currentSigner = ethProvider.getSigner();
                    setSigner(currentSigner)
                    setProvider(ethProvider)
                    const network = await ethProvider.getNetwork();
                    const networkProvider = new ethers.providers.EtherscanProvider(network.name)
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress)
                    let currentHistory = await networkProvider.getHistory(currentAddress);
                    setHistory(currentHistory);
                } catch (err) {
                    console.log(err);
                }
        
            }
            start();

        }
    }, [currentProvider]);

    
    // async function start() {
    //     try {
    //         const network = await provider.getNetwork();
    //         const networkProvider = new ethers.providers.EtherscanProvider(network.name)
    //         const currentAddress = await signer.getAddress();
    //         setAddress(currentAddress)
    //         let currentHistory = await networkProvider.getHistory(currentAddress);
    //         setHistory(currentHistory);
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }

    const clickHandlerSend = () => {
        // start();
        if (history.length > 0) {
            for (let i = history.length; i > 0; i--) {
                const obj = history[i - 1];

                if (obj.from === address) {
                    setSendPayments(prev => [...prev, obj]);
                    // setReceivePayments(prev => [...prev, obj]);
                    setReceivePayments([]);
                }
            }
           
        }
    };

    const clickHandlerReceive = () => {

        // start();
        if (history.length > 0) {
            console.log('inside');
            for (let i = history.length; i > 0; i--) {
                const obj = history[i - 1];

                if (obj.from !== address) {
                    setSendPayments([]);
                    setReceivePayments(prev => [...prev, obj]);
                }
            }
           
        }
    };

    const sendView = () => {
        console.log('senview');
        return (
            sendPayments.map((obj, i) => {
                return (
                    <section key={i} className="history-second-wrapper">
                        <div className="history-address">
                            <h1>To Address:</h1> 
                            <p>{obj.to }</p>
                        </div>
                        <div className="history-amount">
                            <h1>Amount:</h1>
                            <p>{ ethers.utils.formatEther(obj.value) }</p>
                        </div>
                    </section>
                )
            })
        )
    };

    const receiveView = () => {
        console.log('senview',receivePayments );
        return(
            receivePayments.map((obj, i) => {
                return (
                    <section key={ i } className="history-second-wrapper">
                        <div className="history-address">
                            <h1>To Address:</h1> 
                            <p>{obj.to }</p>
                        </div>
                        <div className="history-amount">
                            <h1>Amount:</h1>
                            <p>{ ethers.utils.formatEther(obj.value)}</p>
                        </div>
                    </section>
                )
            })
        )
    }
   
    console.log('anton',sendPayments);
    return (
        <section className="history-wrapper">
            {/* <section>
                { history.map((obj) => {
                    return (
                        
                    )
                })}
            </section> */}
            <section className="history-wrapper-buttons">
            <button className="history-bottom" onClick={ clickHandlerSend }> Send Transaction</button>
            <button className="history-bottom" onClick={ clickHandlerReceive }> Receive Transaction</button>
            </section>
            
            {sendPayments.length > 0 ? sendView() : '' }
            {receivePayments.length > 0 ? receiveView() : '' }

        </section>

    )
}

export default History;
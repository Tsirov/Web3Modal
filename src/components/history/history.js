import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const History = (props) => {
    const currentProvider = props.provider;
    const [signer, setSigner] = useState('');
    const [provider, setProvider] = useState('');
    const [history, setHistory] = useState([]);
    const [address, setAddress] = useState('');
    const [sendPayments, setSendPayments] = useState([]);
    const [receivePayments, setReceivePayments] = useState([]);
    console.log('provider', currentProvider);

    useEffect(() => {
        if (currentProvider) {
            const ethProvider = new ethers.providers.Web3Provider(currentProvider);
            const currentSigner = ethProvider.getSigner();
            setSigner(currentSigner)
            setProvider(ethProvider)

        }
    }, [currentProvider]);

    // useEffect(() => {
    //     if (history.length > 0) {
    //         console.log('in if OOOOO', history);
    //         for (let i = history.length; i > 0; i--){
    //             const obj = history[i - 1];

    //             if (obj.from === address) {
    //                 setSendPayments(prev => [...prev,obj]);
    //             } else {
    //                 setReceivePayments(prev => [...prev,obj]);
    //             }
    //         }
           
    //     }
    // }, [history])

   
    async function start() {
        try {
            const network = await provider.getNetwork();
            console.log(network);
            const networkProvider = new ethers.providers.EtherscanProvider(network.name)
            const currentAddress = await signer.getAddress();
            setAddress(currentAddress)
            // console.log(1);
            let currentHistory = await networkProvider.getHistory(currentAddress);
            setHistory(currentHistory);
            console.log(history);
            console.log(history[0].from);
        } catch (err) {
            console.log(err);
        }

    }

    const clickHandlerSend = () => {
        start();
        if (history.length > 0) {
            console.log('in if OOOOO', history);
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
        console.log(history);

        start();
        if (history.length > 0) {
            console.log('in if OOOOO', history);
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
        return(
            sendPayments.map((obj) => {
                return (
                    <section>
                        <div>
                            <h1>To Address:</h1> 
                            <p>{obj.to }</p>
                        </div>
                        <div>
                            <h1>Amount:</h1>
                            <p>{ ethers.utils.formatEther(obj.value) }</p>
                        </div>
                    </section>
                )
            })
        )
    }
   
    console.log('anton',sendPayments);
    return (
        <>
            {/* <section>
                { history.map((obj) => {
                    return (
                        
                    )
                })}
            </section> */}
            <button onClick={ clickHandlerSend }> Send Transaction</button>
            <button onClick={ clickHandlerReceive }> Receive Transaction</button>
            {sendPayments.length > 0 ? sendView() : '' }

        </>

    )
}

export default History;
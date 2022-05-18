import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import HistoryTransaction from './hisrotyTransaction/historyTransaction'
import './history.css'

const History = (props) => {
    const provider = props.provider;
    const [history, setHistory] = useState([]);
    const [address, setAddress] = useState('');
    const [sendPayments, setSendPayments] = useState([]);
    const [receivePayments, setReceivePayments] = useState([]);
    const [view, setView] = useState(undefined);

    useEffect(() => {
        if (provider) {
            async function start() {
                try {
                    const currentSigner = provider.getSigner();
                    const network = await provider.getNetwork();
                    const networkProvider = new ethers.providers.EtherscanProvider(network);
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress);
                    let currentHistory = await networkProvider.getHistory(currentAddress);
                    setHistory(currentHistory);
                } catch (err) {
                    console.log(err);
                }

            }
            start();
        } else {
            setHistory([]);
            setAddress('');
            setSendPayments([]);
            setReceivePayments([]);
            setView(undefined);
        }
    }, [provider]);

    const clickHandlerSend = () => {
        if (history.length > 0) {
            for (let i = history.length; i > 0; i--) {
                const obj = history[i - 1];

                if (obj.from === address) {
                    setSendPayments(prev => [...prev, obj]);
                    setReceivePayments([]);
                }
            }
        }
    };

    const clickHandlerReceive = () => {
        if (history.length > 0) {
            for (let i = history.length; i > 0; i--) {
                const obj = history[i - 1];

                if (obj.from !== address) {
                    setSendPayments([]);
                    setReceivePayments(prev => [...prev, obj]);
                }
            }

        }
    };

    const clickHandler = (hash) => {
        if (view === undefined) {
            setView(hash);
        } else if (view === hash) {
            setView(undefined);
        } else if (view !== undefined && view !== hash) {
            setView(hash);
        }
    }

    const viewTransactions = (payments, type) => {
        return (
            payments.map((obj, i) => {
                return (
                    <section onClick={ () => clickHandler(obj.hash) } key={ i } className="history-second-wrapper">
                        { view === obj.hash
                            ? <HistoryTransaction historyTransaction={ obj } />
                            : <>
                                <div className="history-address">
                                    <h1>{type === 'send' ? "To Address:" : 'From Address' }</h1>
                                    <p>{type === 'send' ? obj.to : obj.from  }</p>
                                </div>
                                <div className="history-amount">
                                    <h1>Amount:</h1>
                                    <p>{ ethers.utils.formatEther(obj.value) }</p>
                                </div>
                            </>
                        }

                    </section>
                )
            })
        )
    }
  
    return (
        <section className="history-wrapper">
            <section className="history-wrapper-buttons">
                <button className="history-bottom" onClick={ clickHandlerSend }> Send Transaction</button>
                <button className="history-bottom" onClick={ clickHandlerReceive }> Receive Transaction</button>
            </section>

            { sendPayments.length > 0 ? viewTransactions(sendPayments, 'send') : '' }
            { receivePayments.length > 0 ? viewTransactions(receivePayments,'receive') : '' }

        </section>

    )
}

export default History;
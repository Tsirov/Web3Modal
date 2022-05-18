import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Token from '../home/Token-abi.json';
import './send.css';

const Send = (props) => {
    const provider = props.provider;
    const setAccountRefresh = props.setAccountRefresh;
    const getToken = props.getToken;
    const currentToken = props.token;
    const [token, setToken] = useState(currentToken);
    const [signer, setSigner] = useState('');
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [senderAddress, setSenderAddress] = useState('');
    const [error, setError] = useState('');
    const [gasPrice, setGasPrice] = useState(0);
    const [errorAddress, setErrorAddress] = useState({});
    const [miningTransaction, setMiningTransaction] = useState(false);
    const [address, setAddress] = useState('');

    useEffect(() => {
        async function start() {
            if (provider) {
                try {
                    const currentSigner = provider.getSigner();
                    setSigner(currentSigner);
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress);
                    const currentBalance = await provider.getBalance(currentAddress);
                    setBalance(ethers.utils.formatEther(currentBalance));
                } catch (err) {
                    console.log(err);
                }
            } else {
                setSigner('');
                setBalance(0);
                setAmount(0);
                setSenderAddress('');
                setError('');
                setGasPrice(0);
                setErrorAddress({});
            }
        }
        start();
    }, [provider]);

    useEffect(() => {
        if (amount.length > 0 && senderAddress.length > 0 && Object.keys(errorAddress).length === 0) {
            async function start() {
                try {
                    const gasPrice = await signer.getGasPrice();
                    const estimateGas = (await signer.estimateGas(({
                        to: senderAddress,
                        value: ethers.utils.parseEther(amount)
                    })));
                    const gasFee = gasPrice * estimateGas;
                    setGasPrice(ethers.utils.formatEther(gasFee));
                } catch (err) {
                    console.log(err);
                }
            }
            start();
        }
    }, [amount, senderAddress]);

    useEffect(() => {
        if (senderAddress.length > 0) {
            try {
                ethers.utils.getAddress(senderAddress);
                setErrorAddress({});

            } catch (err) {
                setErrorAddress({ backgroundColor: "red" });
            }
        } else if (senderAddress.length === 0) {
            setErrorAddress({});
        }

    }, [senderAddress])

    useEffect(() => {
        getToken(token)
    }, [token]);

    async function transactionEth() {
        try {
            const tx = await signer.sendTransaction({
                to: senderAddress,
                value: ethers.utils.parseEther(amount)
            })
            setMiningTransaction(true);
            await provider.waitForTransaction(tx.hash);
            setAccountRefresh(true);
            setMiningTransaction(false);
        } catch (err) {
            console.log(err);
        }
    };

    async function transactionToken(erc20_rw) {
        try {
            const tx = await erc20_rw.transfer(senderAddress, ethers.utils.parseEther(amount));
            setMiningTransaction(true);
            await provider.waitForTransaction(tx.hash);
            setAccountRefresh(true);
            setMiningTransaction(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentToken === "ETH") {
            const neededAmount = Number(gasPrice) + Number(amount);
           
            if (neededAmount <= balance) {
                if (Object.keys(errorAddress).length === 0) {
                    transactionEth();
                    setError('');

                } else {
                    setError('The address is wrong.')
                }
            } else {
                setError('Insufficient funds.')
            }
        } else if (currentToken === "DooM") {
            const tokenAddress = '0x2e603651cae253f37a786119962d2de21826a42b';
            const currentContract = new ethers.Contract(tokenAddress, Token.abi, provider);
            const erc20_rw = new ethers.Contract(tokenAddress, Token.abi, signer);
            const balanceOfToken = await currentContract.balanceOf(address); 

           

            if (Number(amount) <= balanceOfToken && Number(gasPrice) <= balance) {
                if (Object.keys(errorAddress).length === 0) {
                    transactionToken(erc20_rw);
                    setError('');

                } else {
                    setError('The address is wrong.')
                }
            } else {
                setError('Insufficient funds.')
            }
        }
    }

    const sendView = () => {
        return (
            <>
                <article>
                    <label htmlFor="currency"> Select currency: </label>
                    <select name="currency" id="currency" onChange={ (e) => setToken(e.target.value) } defaultValue={ token }>
                        <option value="ETH">Ether</option>
                        <option value="DooM">Doom</option>
                    </select>
                </article>

                <form onSubmit={ handleSubmit }>
                    <div className="label">
                        {/* { currentAccount ? <label htmlFor="sending-address">{ currentAccount }</label> : '' } */ }

                    </div>
                    <div className="label">
                        <label htmlFor="sending-address">Sending Address</label>
                        <input style={ errorAddress } name="sending-address" type="text" onChange={ (e) => setSenderAddress(e.target.value) } />
                    </div>
                    <div className="label">
                        <label htmlFor="amount">Amount</label>
                        <input name="amount" type="number" min="0" step="any" onChange={ (e) => setAmount(e.target.value) } />
                    </div>
                    <div className="label">
                        <label htmlFor="fees">Fees</label>
                        <input name="fees" type="number" value={ gasPrice } readOnly />
                    </div>

                    <button>Send</button>
                    { error.length > 0 ? <p style={ { color: 'red' } }>{ error }</p> : '' }
                </form>
            </>
        )
    }
    return (
        <section className="send-wrapper">
            { miningTransaction
                ? <h1>Transaction is mining ...</h1> : sendView() }

        </section>
    )
}

export default Send;
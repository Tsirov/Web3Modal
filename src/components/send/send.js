import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './send.css';

const Send = (props) => {
    const currentProvider = props.provider;
    const [signer, setSigner] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [senderAddress, setSenderAddress] = useState('');
    const [error, setError] = useState('');
    const [gasPrice, setGasPrice] = useState(0);
    const [errorAddress, setErrorAddress] = useState({});

    useEffect(() => {
        async function start() {
            if (currentProvider) {
                try {
                    const provider = new ethers.providers.Web3Provider(currentProvider)
                    const currentSigner = provider.getSigner();
                    console.log(currentSigner);
                    setSigner(currentSigner);
                    const currentAddress = await currentSigner.getAddress();
                    setAddress(currentAddress);
                    const currentBalance = await provider.getBalance(currentAddress);
                    setBalance(ethers.utils.formatEther(currentBalance));
                } catch (err) {
                    console.log(err);
                }
            }
        }
        start();
    }, [currentProvider]);

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
                setErrorAddress({ backgroundColor: "red"});
            }
        }else if (senderAddress.length === 0) {
            setErrorAddress({});
        }

    }, [senderAddress])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const neededAmount = Number(gasPrice) + Number(amount);

        async function transaction() {
            try {
                await signer.sendTransaction({
                    to: senderAddress,
                    value: ethers.utils.parseEther(amount)
                });
            } catch (err) {
                console.log(err);
            }
             
        }
        
        console.log('11111', neededAmount, balance);
        if (neededAmount <= balance) {
            if ( Object.keys(errorAddress).length === 0) {
                transaction();
                setError('');
                
            } else {
                setError('The address is wrong.')
            }
        } else {
            setError('Insufficient funds.')
        }
        
    }

    console.log('render',amount);
    return (
        <section className="send-wrapper">

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
                { error.length > 0 ? <p style={{color: 'red'}}>{ error}</p> :'' }
            </form>

        </section>
    )
}

export default Send;
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import './header.css';

const Header = (props) => {
    const provider = props.provider;
    const getProvider = props.getProvider;
    const contract = props.contract;
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions: {}
    });

    const disconnect = () => {
        web3Modal.clearCachedProvider();
        getProvider(null);
        navigate('/');
    }

    const showEthPrice = async () => {
        let [price, decimals] = await contract.getLatestPrice();
        price = price.toString();
        let priceLength = price.toString().length;
        let newPrice = `${price.slice(0, priceLength - decimals)}.${price.slice(-decimals)}`;
        setPrice(newPrice);
        
    }

    return (
        <section className="header-wrapper">
            { provider ?
                <>
                    { price.length === 0
                        ? ''
                        : <div>
                            <h5  className=" header-wrapper-price">ETH Price:</h5 >
                            <h5 className="header-wrapper-price-h5">{ price}</h5 >
                        </div> }
                    <button className="header-button" onClick={ showEthPrice }>Current ETH price</button>
                    <button onClick={ disconnect } className="header-button">Disconnect</button>
                    <Link to="/send"> <button className="header-button">Send</button></Link>
                    <Link to="/history"><button className="header-button">History</button></Link>
                </>
                : '' }
        </section>
    )
}

export default Header;
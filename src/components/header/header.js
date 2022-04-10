import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import './header.css';

const Header = (props) => {
    const provider = props.provider;
    const getProvider = props.getProvider;
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

    return (
        <section className="header-wrapper">
            { provider ?
                <>
                    <p><button onClick={ disconnect } className="header-button">Disconnect</button></p>
                    <Link to="/send"> <button className="header-button">Send</button></Link>
                    <Link to="/history"><button className="header-button">History</button></Link>
                </>
                : '' }
        </section>
    )
}

export default Header;
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {
    const provider = props.provider;
console.log('history', provider);

    return (
        <section className="header-wrapper">
            {provider ?  <p><button className="header-button">Disconnect</button></p> : ''}
            <Link to="/send"> <button className="header-button">Send</button></Link>
            <Link to="/history"><button className="header-button">History</button></Link>
        </section>
    )
}

export default Header;
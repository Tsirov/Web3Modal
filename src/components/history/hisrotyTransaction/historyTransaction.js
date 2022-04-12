
import { ethers } from 'ethers';

const HistoryTransaction = (props) => {
    const transaction = props.historyTransaction;
    return (
        <section className="history-transaction-wrapper">
            <article style={ {backgroundColor:'lightgreen'} } className="history-transaction-article">
                <h1>Transaction Hash:</h1>
                <p>{ transaction.hash }</p>
            </article >
            <article style={ {backgroundColor:'lightgray'} } className="history-transaction-article">
                <h1>Block:</h1>
                <p>{ transaction.blockNumber }</p>
            </article>
            <article style={ {backgroundColor:'lightgreen'} } className="history-transaction-article">
                <h1>Timestamp:</h1>
                <p>{ transaction.timestamp }</p>
            </article>
            <article  style={ {backgroundColor:'lightgray'} }  className="history-transaction-article">
                <h1>From:</h1>
                <p>{ transaction.from }</p>
            </article>
            <article style={ {backgroundColor:'lightgreen'} }  className="history-transaction-article">
                <h1>To:</h1>
                <p>{ transaction.to }</p>
            </article>
            <article style={ {backgroundColor:'lightgray'} }  className="history-transaction-article">
                <h1>Value:</h1>
                <p>{ ethers.utils.formatEther(transaction.value) }</p>
            </article>
            <article style={ {backgroundColor:'lightgreen'} }  className="history-transaction-article">
                <h1>Transaction Fee:</h1>
                <p>{ ethers.utils.formatEther(transaction.gasPrice * transaction.gasLimit) }</p>
            </article>
            <article style={ {backgroundColor:'lightgray'} }  className="history-transaction-article">
                <h1> Gas Price:</h1>
                <p>{ ethers.utils.formatEther(transaction.gasPrice) }</p>
            </article>
        </section>
    )
}

export default HistoryTransaction;
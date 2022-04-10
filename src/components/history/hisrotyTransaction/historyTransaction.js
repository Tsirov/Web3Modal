
import { ethers } from 'ethers';

const HistoryTransaction = (props) => {
    const transaction = props.historyTransaction;
    return (
        <section>
            <article>
                <h1>Transaction Hash:</h1>
                <p>{ transaction.hash }</p>
            </article>
            <article>
                <h1>Block:</h1>
                <p>{ transaction.blockNumber }</p>
            </article>
            <article>
                <h1>Timestamp:</h1>
                <p>{ transaction.timestamp }</p>
            </article>
            <article>
                <h1>From:</h1>
                <p>{ transaction.from }</p>
            </article>
            <article>
                <h1>To:</h1>
                <p>{ transaction.to }</p>
            </article>
            <article>
                <h1>Value:</h1>
                <p>{ ethers.utils.formatEther(transaction.value) }</p>
            </article>
            <article>
                <h1>Transaction Fee:</h1>
                <p>{ ethers.utils.formatEther(transaction.gasPrice) }</p>
            </article>
            <article>
                <h1> Gas Price:</h1>
                <p>{ ethers.utils.formatEther(transaction.gasLimit) }</p>
            </article>
        </section>
    )
}

export default HistoryTransaction;
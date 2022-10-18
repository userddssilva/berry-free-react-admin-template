import 'dotenv/config';

import web3 from './Web.js';

// Creating a signing account from a private key
// const singer = web3.eth.accounts.privateKeyToAccount(process.env.ACCOUNT_PRIVATE_KEY);

web3.eth.getAccounts((error, accounts) => {
    if (error != null) {
        console.log(error);
    } else if (accounts.length === 0) {
        console.log('Metamask is locked');
    } else {
        web3.eth.defaultAccount = accounts[0];
        console.log(web3.eth.defaultAccount);
    }
})

// web3.eth.accounts.wallet.add(singer);

export default singer;

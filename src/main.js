// import SHA256 from 'crypto-js/sha256';
const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    //npm i --save crypto-js ::: Cmd to instal the crypto built-in library of NodeJs.
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        // To check the Block chain Hash Value and its Nonce value:
        console.log(`Block mined : ${this.hash}`);
        console.log("Nonce value is : " + this.nonce);
    }
}




class BlockChain {
    //Responsible for initialzing the BlockChain.
    constructor() {
        //Array of Blocks
        this.chain = [this.createGenesisBlock()];

        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningRewards = 100;
    }

    //Creating the First Block --> The GENESIS BLOCK.
    createGenesisBlock() {
        return new Block(0, "01/03/2022", "Genesis Block", "0");
    }


    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    //NEW MINING METHOD :
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty);

        console.log("Block Mined Successfully");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningRewards)
        ];
    }

    createTransactions(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddres(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    // To check VALIDITY : 
    isChainValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash())
                return false;

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }


}

// To test it, we have create an Instance of the BlockChain

// let neelcoin = new BlockChain();

// console.log("Mining first Block.....");
// neelcoin.addBlock(new Block(1, "02/04/2022", { amount: 23 }));

// console.log("Mining second Block.....");
// neelcoin.addBlock(new Block(2, "11/01/2023", { amount: 230 }));

//Checking the validity of the Chain:
// console.log(`Is Blockchain valid : ${neelcoin.isChainValidity()}`);

// Tampering the Data and Hash Value of the 1st Block :
// neelcoin.chain[1].data = { anount: 100 };
// neelcoin.chain[1].hash = neelcoin.chain[1].calculateHash();

//Checking after tampering the Chain:
// console.log(`Is Blockchain valid : ${neelcoin.isChainValidity()}`);

// console.log(JSON.stringify(neelcoin, null, 4));


let neelcoin = new BlockChain();

neelcoin.createTransactions(new Transaction('add1', 'add2', 100));
neelcoin.createTransactions(new Transaction('add2', 'add1', 1000));

console.log("\nStarting the miner... \n");
neelcoin.minePendingTransactions("neel-address");

console.log("\n Balance of neel is " + neelcoin.getBalanceOfAddres("neel-address"));

console.log("\nStarting the miner again... \n");
neelcoin.minePendingTransactions("neel-address");

console.log("\n Balance of neel is " + neelcoin.getBalanceOfAddres("neel-address"));

console.log("\nStarting the miner again... \n");
neelcoin.minePendingTransactions("neel-address");

console.log("\n Balance of neel is " + neelcoin.getBalanceOfAddres("neel-address"));


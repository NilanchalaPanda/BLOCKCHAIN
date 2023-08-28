// import SHA256 from 'crypto-js/sha256';
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    //npm i --save crypto-js ::: Cmd to instal the crypto built-in library of NodeJs.
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class BlockChain {

    //Responsible for initialzing the BlockChain.
    constructor() {
        //Array of Blocks
        this.chain = [this.createGenesisBlock];
    }

    //Creating the First Block --> The GENESIS BLOCK.
    createGenesisBlock() {
        return new Block(0, "01/03/2022", "Genesis Block", "0");
    }


    getLatestBlock() {
        // console.log(this.chain[this.chain.length - 1]);
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        //To push it in the CHAIN, i.e. BLOCK !!:)
        this.chain.push(newBlock);
    }
}

// To test it, we have create an Instance of the BlockChain

let neelcoin = new BlockChain();
// neelcoin.addBlock("New block added.");
neelcoin.addBlock(new Block(1, "02/04/2022", { amount: 23 }));
neelcoin.addBlock(new Block(2, "11/01/2023", { amount: 230 }));


console.log(JSON.stringify(neelcoin, null, 4));


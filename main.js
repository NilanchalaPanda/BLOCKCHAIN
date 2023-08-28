// import SHA256 from 'crypto-js/sha256';
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    //npm i --save crypto-js ::: Cmd to instal the crypto built-in library of NodeJs.
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 3;
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
        newBlock.mineBlock(this.difficulty);

        //To push it in the CHAIN, i.e. BLOCK !!:)
        this.chain.push(newBlock);
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

let neelcoin = new BlockChain();

console.log("Mining first Block.....");
neelcoin.addBlock(new Block(1, "02/04/2022", { amount: 23 }));

console.log("Mining second Block.....");
neelcoin.addBlock(new Block(2, "11/01/2023", { amount: 230 }));

//Checking the validity of the Chain:
// console.log(`Is Blockchain valid : ${neelcoin.isChainValidity()}`);

// Tampering the Data and Hash Value of the 1st Block :
// neelcoin.chain[1].data = { anount: 100 };
// neelcoin.chain[1].hash = neelcoin.chain[1].calculateHash();

//Checking after tampering the Chain:
// console.log(`Is Blockchain valid : ${neelcoin.isChainValidity()}`);

// console.log(JSON.stringify(neelcoin, null, 4));


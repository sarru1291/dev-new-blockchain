const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1561548109274,
      transactions: [],
      nonce: 100,
      hash: "0",
      previousBlockHash: "0"
    },
    {
      index: 2,
      timestamp: 1561548136493,
      transactions: [],
      nonce: 18140,
      hash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
      previousBlockHash: "0"
    },
    {
      index: 3,
      timestamp: 1561548194593,
      transactions: [
        {
          amount: 12.5,
          sender: "00FGSF3",
          recipient: "4d25adbc87c24af99284b3be4d61c0d5",
          transactionId: "5929f85ea2e14a13b7fdff8fb892d0da"
        },
        {
          amount: 100,
          sender: "Sarru920",
          recipient: "Naru2349",
          transactionId: "a13517766d004ca3b953574c24f27622"
        },
        {
          amount: 200,
          sender: "Sarru920",
          recipient: "Naru2349",
          transactionId: "bf965877e42746e3a4c8bf0ddac8463a"
        }
      ],
      nonce: 22436,
      hash: "00000c8d4e8bff42b253462668d61ed1d03b1c1ee61f7c50ac90e4ec947daf59",
      previousBlockHash:
        "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
      index: 4,
      timestamp: 1561548261121,
      transactions: [
        {
          amount: 12.5,
          sender: "00FGSF3",
          recipient: "4d25adbc87c24af99284b3be4d61c0d5",
          transactionId: "9f234af05a794ad79d828eb475b6b23c"
        },
        {
          amount: 50,
          sender: "Sarru920",
          recipient: "Naru2349",
          transactionId: "c8ebe8a6f8794ae9a975b50f6e070bca"
        },
        {
          amount: 8900,
          sender: "Sarru920",
          recipient: "Naru2349",
          transactionId: "4953979b834e4b528cae655d4a836a7d"
        },
        {
          amount: 890,
          sender: "Sarru920",
          recipient: "Naru2349",
          transactionId: "2ec7e8f7fcd74a88bad4f671ff3d9a0b"
        }
      ],
      nonce: 88656,
      hash: "0000e6932bf5d892250c1d7c86fa31e0e22d8f7de0ff912eabf41d1e3dd4149b",
      previousBlockHash:
        "00000c8d4e8bff42b253462668d61ed1d03b1c1ee61f7c50ac90e4ec947daf59"
    }
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00FGSF3",
      recipient: "4d25adbc87c24af99284b3be4d61c0d5",
      transactionId: "fa794b2482454f1dbfa835ac42e62f3b"
    }
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: []
};

console.log('VALID:',bitcoin.chainIsValid(bc1.chain));

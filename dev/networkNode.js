const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Blockchain = require("./blockchain");
const uuid = require("uuid");
const rp = require("request-promise");
const port = process.argv[2];

// new Blockchain Instance
const bitcoin = new Blockchain();
// Random node Address
const nodeAddress = uuid()
  .split("-")
  .join("");

// Parsing incoming post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get entire Blockchain
app.get("/blockchain", function(req, res) {
  res.send(bitcoin);
});

// Create new Transaction
app.post("/transaction", function(req, res) {
  const blockIndex = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );

  res.json({ note: `Transaction will be added to block ${blockIndex}.` });
});

// Mine a Block
app.get("/mine", function(req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  bitcoin.createNewTransaction(12.4, "00", nodeAddress);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  res.json({
    note: "New block mined successfully",
    block: newBlock
  });
});

// Register a node and broadcast to entire network
app.post("/register-and-broadcast-node", function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.networkNodes.indexOf(newNodeUrl == -1)) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  const regNodesPromies = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/register-node",
      method: "POST",
      body: {
        newNodeUrl: newNodeUrl
      },
      json: true
    };
    regNodesPromies.push(rp(requestOptions));
  });

  Promise.all(regNodesPromies)
    .then(data => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-node-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
        },
        json: true
      };
      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({ note: "New node registered with network successfully" });
    });
});

// Register a node with network
app.post("/register-node", function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode)
    bitcoin.networkNodes.push(newNodeUrl);
  res.json({ note: "New node registered successfully." });
});

// Register multiple nodes at once
app.post("/register-nodes-bulk", function(req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
      bitcoin.networkNodes.push(networkNodeUrl);
  });
  res.json({ note: "Bulk registration successful" });
});

app.listen(port, function() {
  console.log(`listening on port ${port}...`);
});

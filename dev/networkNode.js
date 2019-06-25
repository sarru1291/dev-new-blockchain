const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Blockchain = require("./blockchain");
const uuid = require("uuid");
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

app.listen(3000, function() {
  console.log("listening on port 3000...");
});

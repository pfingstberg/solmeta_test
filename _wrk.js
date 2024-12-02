// Import the required library
const { Connection, clusterApiUrl } = require('@solana/web3.js');

// Create a connection to the Solana Devnet (or Mainnet)
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

async function getRecentBlockNumber() {
  return await connection.getSlot('confirmed');
}

async function getBlockhashForSlot(slot) {
  try {
    // Fetch the confirmed block details for the specified slot
    const block = await connection.getConfirmedBlock(slot);

    if (block) {
      console.log(`Blockhash for slot ${slot}: ${block.blockhash}`);
    } else {
      console.log(`No block found for slot ${slot}`);
    }
  } catch (error) {
    console.error('Error fetching block:', error);
  }
}

async function measureExecutionTime() {
  const start = performance.now();
  const slot = await getRecentBlockNumber();
  const end = performance.now();
  console.log(`The most recent block number is: ${slot}`);
  console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
}

measureExecutionTime();

const web3 = require('@solana/web3.js');
const fs = require('fs');

// Create a connection to the Solana mainnet
const connection = new web3.Connection(
  web3.clusterApiUrl('mainnet-beta'),
  'confirmed'
);

async function getLatestConfirmedBlockData() {
  try {
    // Get the latest confirmed slot
    const slot = 298976898; //await connection.getSlot();
    console.log(`Latest confirmed slot: ${slot}`);

    // Get block details with maxSupportedTransactionVersion set to 0
    const block = await connection.getBlock(slot, {
      maxSupportedTransactionVersion: 0,
    });

    // Write block data to a JSON file
    const filePath = './blockData.json';
    fs.writeFileSync(filePath, JSON.stringify(block, null, 2), 'utf8');
    console.log(`Block data written to ${filePath}`);

    // Read block data back into a variable
    const data = fs.readFileSync(filePath, 'utf8');
    const blockData = JSON.parse(data);
    console.log('Block data read from file:', blockData);

    // console.log(`Block details for slot ${slot}:`, block);
  } catch (error) {
    console.error('Error fetching block data:', error);
  }
}

// Execute the function
getLatestConfirmedBlockData();

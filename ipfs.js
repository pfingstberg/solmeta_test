// const { MongoClient } = require('mongodb');
const { Connection, PublicKey } = require('@solana/web3.js');
// const { Token } = require('@solana/spl-token');
const { programs } = require('@metaplex/js');
const { Metadata } = programs.metadata;

const { Metaplex } = require('@metaplex-foundation/js');
// const { Metaplex } = require('@metaplex/js');

// console.log(Metadata);

async function getTokenURI(mintAddress) {
  // Connect to Solana mainnet
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const metaplex = Metaplex.make(connection);

  // Convert mint address string to PublicKey
  const mintPublicKey = new PublicKey(mintAddress);
  // console.log('111:', mintPublicKey);

  // Get the metadata account associated with the token mint
  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintPublicKey });

  // Fetch metadata account info
  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);
  // console.log('222:', metadataAccount);

  if (metadataAccountInfo) {
    // Retrieve token metadata
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintPublicKey });
    console.log('333:', token);
    return token.json.uri; // Return the URI from the JSON metadata
  } else {
    throw new Error('Metadata account does not exist for this mint address.');
  }
}

async function fetchIPFSJson(uri) {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json(); // Parse the JSON from the response

    // Check if there is a Twitter status in the JSON
    // checkForTwitterStatus(data);

    return data; // Return the parsed JSON
  } catch (error) {
    console.error('Error fetching or parsing the JSON:', error);
  }
}

async function getTokenMetadata(mintAddress) {
  // Connect to Solana mainnet
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const metaplex = Metaplex.make(connection);

  // Convert mint address string to PublicKey
  const mintPublicKey = new PublicKey(mintAddress);

  // Get the metadata account associated with the token mint
  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintPublicKey });

  // Fetch metadata account info
  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    // Retrieve token metadata
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintPublicKey });
    return {
      name: token.name,
      symbol: token.symbol,
      image: token.json.image,
      description: token.json.description,
    };
  } else {
    throw new Error('Metadata account does not exist for this mint address.');
  }
}

/*
async function Gluvna() {
  const uri =
    'https://ipfs.io/ipfs/QmTwRaUMmpCmGm5G8kpv4ccYBvnxC9822WjLJKYARvdEvb'; // Use 'const' to declare uri
  const data = await fetchIPFSJson(uri); // Await the result of fetchIPFSJson
  console.log('Type of data:', typeof data);

  if (Array.isArray(data)) {
    console.log('Data is an array with length:', data.length);
  } else if (data !== null && typeof data === 'object') {
    console.log('Data is an object with keys:', Object.keys(data).length);
  } else {
    console.log(
      'Data type is not an array or object. Length:',
      data ? data.length : 0
    );
  }
  // console.log('Fetched data:', data); // Log the fetched data (optional)
}

Gluvna();
*/

// Example usage:
/*
(async () => {
  try {
    const mintAddress = 'zatHUKJXCvgYBkbDMFn6Q8FukeLQkywroBw5Uv4pump'; // Replace with your token mint address
    // const metadata = await getTokenMetadata(mintAddress);
    metadata = await getTokenURI(mintAddress);
    console.log(metadata);
  } catch (error) {
    console.error(error);
  }
})();
*/

// Example usage:
(async () => {
  try {
    const mintAddress = 'zatHUKJXCvgYBkbDMFn6Q8FukeLQkywroBw5Uv4pump'; // Replace with your token mint address
    const uri = await getTokenURI(mintAddress);
    // console.log('Token URI:', uri);
  } catch (error) {
    console.error(error);
  }
})();

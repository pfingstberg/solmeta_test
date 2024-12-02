const { Connection, PublicKey } = require('@solana/web3.js');
const { programs } = require('@metaplex/js');
const { Metadata } = programs.metadata;
const { Metaplex } = require('@metaplex-foundation/js');
// const { Metaplex } = require('@metaplex/js');

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

  if (metadataAccountInfo) {
    // Retrieve token metadata
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintPublicKey });

    console.log('331 (keys):', Object.keys(token));
    console.log('332 (mintAdr...):', mintAddress);
    console.log('334 (uri)       :', token.uri);
    // console.log('335 (json)      :', token.json);
    console.log('336 (name)      :', token.name);
    console.log('337 (symbol)    :', token.symbol);
    // console.log('333:', token);
    return token.uri; // Return the URI from the token metadata
  } else {
    throw new Error('Metadata account does not exist for this mint address.');
  }
}

// Example usage:
(async () => {
  try {
    const mintAddress = 'zatHUKJXCvgYBkbDMFn6Q8FukeLQkywroBw5Uv4pump'; // Replace with your token mint address
    const uri = await getTokenURI(mintAddress);
    console.log('Token URI:', uri);
  } catch (error) {
    console.error(error);
  }
})();

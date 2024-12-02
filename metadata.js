async function getTokenMetadata(mintAddress) {
    try {
        // Connect to your local Solana node
        const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

        // Token mint address (public key)
        const mintPublicKey = new PublicKey(mintAddress);

        // Find the Metadata PDA (Program Derived Address)
        const pda = await Metadata.getPDA(mintPublicKey);

        // Load the Metadata for the token
        const metadata = await Metadata.load(connection, pda);

        uri = metadata.data.data.uri;
        fetchIPFSJson(uri);

        //console.log(metadata);
        // Return the name from metadata
        return metadata.data.data.symbol;

    } catch (error) {
        //console.error(`Error fetching metadata for mint address ${mintAddress}:`, error);
        //console.log("Error ", mintAddress);
        return null; // Return null or an empty value in case of failure
    }
}

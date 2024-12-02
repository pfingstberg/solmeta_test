const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'localhost', // e.g., 'localhost' or your database server IP
  user: 'Test1', // your database username
  password: 'Thira1', // your database password
  database: 'testowa', // the database you want to connect to
  connectionLimit: 5, // number of connections in the pool
});

// Function to run a SELECT query
async function runSelectQuery(whichQuery) {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Execute a SELECT query based on whichQuery parameter
    let query;
    if (whichQuery === 1) {
      query = 'SELECT * FROM tabela_testowa limit 3'; // query for option 1
    } else if (whichQuery === 2) {
      query = 'SELECT * FROM tabela_testowa'; // query for option 2
    } else if (whichQuery === 3) {
      query = 'SELECT * FROM tabela_testowa'; // query for option 3
    } else {
      throw new Error('Invalid query selection');
    }

    const result = await conn.query(query); // SQL query
    console.log('Rows returned:', result.length);
    return result; // Return result for use outside this function
  } catch (err) {
    console.error(err); // Handle errors
  } finally {
    if (conn) conn.end(); // Close the connection
  }
}

// Call the function to run the query
runSelectQuery(1) // Pass 1, 2, or 3 to select the query
  .then((result) => {
    // Receive result as an argument here
    pool.end(); // Close the pool when done

    if (result) {
      // Check if result is defined before using it
      let licznik = result.length;
      // const firstTwoRows = result.slice(0, 2);
      // console.log(firstTwoRows);
      a = [0, 1, 2];
      console.log(typeof a, a);
      for (let i = 0; i < licznik; i++) {
        console.log(result[i]); // Process each row

        if (i === 0) {
          // Check if it's the second iteration (index 1)
          break; // Exit the loop after the second iteration
        }
      }
    } else {
      console.log('No rows returned.');
    }
  })
  .catch((err) => {
    console.error('Error running query:', err);
  });

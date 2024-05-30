import { Client } from "pg";

// Initialize a PostgreSQL client with the default database
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

// Function to initialize the database
export const initDatabase = async () => {
  try {
    // Connect to the PostgreSQL client
    await client.connect();

    // Check if the duties_db database exists
    const dbExists = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'duties_db'"
    );
    if (dbExists.rowCount === 0) {
      // Create the duties_db database if it does not exist
      await client.query("CREATE DATABASE duties_db");
      console.log("Database duties_db created.");
    } else {
      console.log("Database duties_db already exists.");
    }
  } catch (err) {
    // Log any errors during the database check/creation
    console.error("Error checking/creating database:", (err as Error).message);
    throw err;
  } finally {
    // Disconnect the client
    await client.end();
  }

  // Connect to the new duties_db database to verify/create tables
  const dutiesClient = new Client({
    user: "postgres",
    host: "localhost",
    database: "duties_db",
    password: "root",
    port: 5432,
  });

  try {
    // Connect to the dutiesClient
    await dutiesClient.connect();

    // Create the duties table if it does not exist
    await dutiesClient.query(`
          CREATE TABLE IF NOT EXISTS duties (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
          )
        `);
    console.log("Table duties created or already exists.");
  } catch (err) {
    // Log any errors during the table check/creation
    console.error("Error checking/creating table:", (err as Error).message);
    throw err;
  } finally {
    // Disconnect the dutiesClient
    await dutiesClient.end();
  }
};

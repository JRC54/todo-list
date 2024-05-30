import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Client } from "pg";
import dutiesRouter from "./routes/duties";
import { initDatabase } from "./init/initDatabase";

const app = express(); // Create an Express application
const port = 3001; // Define the port to run the server on
const url = 'http://localhost:';

app.use(bodyParser.json()); // Use body-parser to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Initialize a PostgreSQL client for the duties_db database
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "duties_db",
  password: "root",
  port: 5432,
});

export { client }; // Export the client for use in other modules

// Initialize the database and then start the server
initDatabase()
  .then(() => {
    client
      .connect()
      .then(() => {
        console.log("Connected to PostgreSQL");

        // Use the duties router for all routes starting with /duties
        app.use("/duties", dutiesRouter);

        // Define a simple route to check if the server is running
        app.get("/", (req, res) => {
          res.send("Hello World!");
        });

        // Start the server
        app.listen(port, () => {
          console.log(`Server is running on ${url}${port}`);
        });
      })
      .catch((err) => {
        console.error("Connection error", err.message); // Log connection errors
      });
  })
  .catch((err) => {
    console.error("Error initializing database", err.message); // Log initialization errors
  });

export { app };
import express from "express";
import { client } from "../index";
import { Duty } from "../interfaces/Duty";

const router = express.Router();

// Route to get all duties
router.get("/", async (req, res) => {
  try {
    // Query the database to get all duties
    const result = await client.query<Duty>("SELECT * FROM duties");
    // Send the result as JSON
    res.json(result.rows);
  } catch (err) {
    // Log any errors and send a 500 status
    console.error("Error fetching duties:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new duty
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    // Insert a new duty into the database
    const result = await client.query<Duty>(
      "INSERT INTO duties (name) VALUES ($1) RETURNING id::text, name",
      [name]
    );
    // Send the new duty as JSON
    res.json(result.rows[0]);
  } catch (err) {
    // Log any errors and send a 500 status
    console.error("Error adding duty:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update a duty
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    // Update the duty in the database
    const result = await client.query<Duty>(
      "UPDATE duties SET name = $1 WHERE id = $2 RETURNING id::text, name",
      [name, id]
    );
    // Send the updated duty as JSON
    res.json(result.rows[0]);
  } catch (err) {
    // Log any errors and send a 500 status
    console.error("Error updating duty:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a duty
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the duty from the database
    await client.query("DELETE FROM duties WHERE id = $1", [id]);
    // Send a 204 status indicating successful deletion
    res.sendStatus(204);
  } catch (err) {
    // Log any errors and send a 500 status
    console.error("Error deleting duty:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

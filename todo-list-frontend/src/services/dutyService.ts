import { Duty } from "../interfaces/Duty";

// Backend URL
const API_URL = "http://localhost:3001/duties";

// Function to fetch all duties from the backend
export const getDuties = async (): Promise<Duty[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch duties");
  }
  return response.json();
};

// Function to add a new duty to the backend
export const addDuty = async (name: string): Promise<Duty> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to add duty");
  }
  return response.json();
};

// Function to delete a duty from the backend
export const deleteDuty = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete duty");
  }
};

// Function to update a duty in the backend
export const updateDuty = async (updatedDuty: Duty): Promise<Duty> => {
  const response = await fetch(`${API_URL}/${updatedDuty.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: updatedDuty.name }),
  });
  if (!response.ok) {
    throw new Error("Failed to update duty");
  }
  return response.json();
};

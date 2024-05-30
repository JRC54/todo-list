import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as dutyService from "../services/dutyService";

jest.mock("../services/dutyService");

const mockGetDuties = dutyService.getDuties as jest.Mock;
const mockAddDuty = dutyService.addDuty as jest.Mock;
const mockDeleteDuty = dutyService.deleteDuty as jest.Mock;
const mockUpdateDuty = dutyService.updateDuty as jest.Mock;

const duties = [
  { id: "1", name: "Test Duty 1" },
  { id: "2", name: "Test Duty 2" },
];

beforeEach(() => {
  mockGetDuties.mockResolvedValue(duties);
  mockAddDuty.mockResolvedValue({ id: "3", name: "New Duty" });
  mockDeleteDuty.mockResolvedValue({});
  mockUpdateDuty.mockResolvedValue({ id: "1", name: "Updated Duty" });
});

test("renders App and loads duties", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Test Duty 1")).toBeInTheDocument();
    expect(screen.getByText("Test Duty 2")).toBeInTheDocument();
  });
});

test("adds a new duty", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Add a new duty"), {
    target: { value: "New Duty" },
  });
  fireEvent.click(screen.getByText("Add Duty"));

  await waitFor(() => {
    expect(screen.getByText("New Duty")).toBeInTheDocument();
  });
});

test("deletes a duty", async () => {
  render(<App />);

  fireEvent.click(screen.getAllByText("Delete")[0]);

  await waitFor(() => {
    expect(screen.queryByText("Test Duty 1")).not.toBeInTheDocument();
  });
});

test("updates a duty", async () => {
  render(<App />);

  fireEvent.click(screen.getAllByText("Edit")[0]);
  fireEvent.change(screen.getByPlaceholderText("Enter duty name"), {
    target: { value: "Updated Duty" },
  });
  fireEvent.click(screen.getByText("Update Duty"));

  await waitFor(() => {
    expect(screen.getByText("Updated Duty")).toBeInTheDocument();
  });
});

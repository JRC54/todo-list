import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DutyForm from "../components/DutyForm";

test("renders DutyForm and submits data", () => {
  const handleAddDuty = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <DutyForm onAddDuty={handleAddDuty} disabled={false} />
  );

  const input = getByPlaceholderText("Add a new duty");
  const button = getByText("Add Duty");

  fireEvent.change(input, { target: { value: "Test Duty" } });
  fireEvent.click(button);

  expect(handleAddDuty).toHaveBeenCalledWith("Test Duty");
});

test("disables the form when disabled prop is true", () => {
  const handleAddDuty = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <DutyForm onAddDuty={handleAddDuty} disabled={true} />
  );

  const input = getByPlaceholderText("Add a new duty");
  const button = getByText("Add Duty");

  expect(input).toBeDisabled();
  expect(button).toBeDisabled();
});

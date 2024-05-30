import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DutyList from "../components/DutyList";
import { Duty } from "../interfaces/Duty";

const duties: Duty[] = [
  { id: "1", name: "Test Duty 1" },
  { id: "2", name: "Test Duty 2" },
];

test("renders DutyList and interacts with items", () => {
  const handleUpdateDuty = jest.fn();
  const handleDeleteDuty = jest.fn();
  const { getByText } = render(
    <DutyList
      duties={duties}
      onUpdateDuty={handleUpdateDuty}
      onDeleteDuty={handleDeleteDuty}
      disabled={false}
    />
  );

  const viewButton = getByText("View");
  const editButton = getByText("Edit");
  const deleteButton = getByText("Delete");

  fireEvent.click(viewButton);
  fireEvent.click(editButton);
  fireEvent.click(deleteButton);

  expect(handleUpdateDuty).toHaveBeenCalled();
  expect(handleDeleteDuty).toHaveBeenCalled();
});

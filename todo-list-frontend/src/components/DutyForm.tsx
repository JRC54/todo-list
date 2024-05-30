import React, { useState } from "react";
import { Input, Button, Row, Col, message } from "antd";

// Props interface defines the expected properties for the component
interface Props {
  onAddDuty: (name: string) => void; // Function to handle adding a new duty
  disabled: boolean; // Property to disable the form when needed
}
// DutyForm component definition
const DutyForm: React.FC<Props> = ({ onAddDuty, disabled }) => {
  // State to manage the name of the duty being added
  const [dutyName, setDutyName] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation for the duty name
    if (!dutyName) {
      message.error("Please enter a duty name.");
      return;
    } else if (dutyName.length < 3 || dutyName.length > 100) {
      message.error("Duty name must be between 3 and 100 characters.");
      return;
    }
    // Call the onAddDuty function with the duty name
    onAddDuty(dutyName);
    // Reset the duty name input
    setDutyName("");
    message.success("Duty added successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="duty-form">
      <Row gutter={8} align="middle">
        <Col flex="auto">
          <Input
            type="text"
            value={dutyName}
            onChange={(e) => setDutyName(e.target.value)}
            placeholder="Add a new duty"
            className="duty-input"
            disabled={disabled}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            className="add-duty-button"
            disabled={disabled}
          >
            Add Duty
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default DutyForm;

import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { Duty } from '../interfaces/Duty';

// Props interface defines the expected properties for the component
interface Props {
  duty: Duty; // The duty being edited
  visible: boolean; // Controls the visibility of the modal
  onUpdateDuty: (duty: Duty) => void; // Function to handle updating the duty
  onCancel: () => void; // Function to handle cancelling the edit
}

// EditDutyModal component definition
const EditDutyModal: React.FC<Props> = ({ duty, visible, onUpdateDuty, onCancel }) => {
  // State to manage the name of the duty being edited
  const [name, setName] = useState(duty.name);

  // Function to handle updating the duty
  const handleUpdate = async () => {
    // Validation for the duty name
    if (!name || name.length < 3 || name.length > 100) {
      message.error('Duty name must be between 3 and 100 characters.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/duties/${duty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update duty: ${errorMessage}`);
      }

      const updatedDuty = await response.json();
      onUpdateDuty(updatedDuty);
      onCancel();
      message.success('Duty updated successfully');
      window.location.reload();
    } catch (error) {
      message.error(`Failed to update duty: ${message}`);
    }
  };

  return (
    <Modal
      title="Edit Duty"
      open={visible}
      onOk={handleUpdate}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Update Duty
        </Button>,
      ]}
    >
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter duty name" />
    </Modal>
  );
};

export default EditDutyModal;

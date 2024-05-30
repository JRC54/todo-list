import React, { useState } from "react";
import { Button, Card, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Duty } from "../interfaces/Duty";
import EditDutyModal from "./EditDutyModal";

// Props interface defines the expected properties for the component
interface Props {
  duties: Duty[]; // Array of duties to display
  onUpdateDuty: (duty: Duty) => void; // Function to handle updating a duty
  onDeleteDuty: (id: string) => void; // Function to handle deleting a duty
  disabled: boolean; // Property to disable the cards when needed
}

// DutyList component definition
const DutyList: React.FC<Props> = ({
  duties,
  onUpdateDuty,
  onDeleteDuty,
  disabled,
}) => {
  // State to manage the duty being edited
  const [editDuty, setEditDuty] = useState<Duty | null>(null);
  // State to manage the duty being viewed
  const [viewDuty, setViewDuty] = useState<Duty | null>(null);

  // Function to handle deleting a duty
  const handleDelete = async (id: string) => {
    onDeleteDuty(id);
    message.success("Duty deleted successfully");
  };

  // Function to show delete confirmation modal
  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete the duty?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="card-container">
        {duties.map((duty) => (
          <Card
            key={duty.id}
            className="ant-card"
            title={duty.name}
            actions={[
              <Button
                type="link"
                className="action-button"
                icon={<EyeOutlined />}
                onClick={() => setViewDuty(duty)}
                disabled={disabled}
              >
                View
              </Button>,
              <Button
                type="link"
                className="action-button"
                icon={<EditOutlined />}
                onClick={() => setEditDuty(duty)}
                disabled={disabled}
              >
                Edit
              </Button>,
              <Button
                type="link"
                className="action-button"
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(duty.id)}
                disabled={disabled}
              >
                Delete
              </Button>,
            ]}
          >
            Task ID: {duty.id}
          </Card>
        ))}
      </div>
      {editDuty && (
        <EditDutyModal
          duty={editDuty}
          visible={!!editDuty}
          onUpdateDuty={onUpdateDuty}
          onCancel={() => setEditDuty(null)}
        />
      )}
      {viewDuty && (
        <Modal
          title="Duty Details"
          open={!!viewDuty}
          onCancel={() => setViewDuty(null)}
          footer={[
            <Button key="close" onClick={() => setViewDuty(null)}>
              Close
            </Button>,
          ]}
        >
          <p>
            <strong>ID:</strong> {viewDuty.id}
          </p>
          <p>
            <strong>Name:</strong> {viewDuty.name}
          </p>
        </Modal>
      )}
    </>
  );
};

export default DutyList;

import React, { useState, useEffect } from "react";
import { message, Layout, Typography, Spin } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import { Duty } from "./interfaces/Duty";
import DutyForm from "./components/DutyForm";
import DutyList from "./components/DutyList";
import {
  getDuties,
  addDuty,
  deleteDuty,
  updateDuty,
} from "./services/dutyService";

const { Header, Content } = Layout;
const { Title } = Typography;

// Set the duration for messages to 1.75 seconds
message.config({
  duration: 1.75,
});

const App: React.FC = () => {
  // State to manage the list of duties
  const [duties, setDuties] = useState<Duty[]>([]);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  // State to control whether the form and cards are disabled
  const [isDisabled, setIsDisabled] = useState(false);

  // Fetch duties from the backend when the component mounts
  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const dutiesFromServer = await getDuties();
        setDuties(dutiesFromServer);
      } catch (error) {
        setError("Couldn't connect to the database");
        setIsDisabled(true); // Disable everything if there's an error
      } finally {
        setLoading(false); // Set loading to false after fetching duties
      }
    };

    fetchDuties();
  }, []);

  // Show error message if there's an error
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Handle adding a new duty
  const handleAddDuty = async (name: string) => {
    const newDuty = await addDuty(name);
    setDuties([...duties, newDuty]);
  };

  // Handle deleting a duty
  const handleDeleteDuty = async (id: string) => {
    await deleteDuty(id);
    setDuties(duties.filter((duty) => duty.id !== id));
  };

  // Handle updating a duty
  const handleUpdateDuty = async (updatedDuty: Duty) => {
    const newDuty = await updateDuty(updatedDuty);
    setDuties(duties.map((duty) => (duty.id === newDuty.id ? newDuty : duty)));
  };

  // Show loading spinner while fetching duties
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <Title
          level={1}
          style={{ color: "white", textAlign: "center", marginTop: "6px" }}
        >
          To-Do List
        </Title>
      </Header>
      <Content className="content">
        <DutyForm onAddDuty={handleAddDuty} disabled={isDisabled} />
        <div className="card-container">
          <DutyList
            duties={duties}
            onDeleteDuty={handleDeleteDuty}
            onUpdateDuty={handleUpdateDuty}
            disabled={isDisabled}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default App;

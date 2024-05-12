/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-hot-toast"; // Importing toast directly
import "./index.css";

const KanbanBoard = () => {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTicket, setNewTicket] = useState("");

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setBacklog([...backlog, newTicket]);
      setNewTicket("");
      toast.success("New ticket added successfully!");
    } else {
      toast.error("Please enter a valid ticket name.");
    }
  };

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (e, targetColumn) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "Backlog":
          setBacklog([...backlog, task]);
          break;
        case "InProgress":
          setInProgress([...inProgress, task]);
          break;
        case "Completed":
          setCompleted([...completed, task]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "Backlog":
          setBacklog(backlog.filter((t) => t !== task));
          break;
        case "InProgress":
          setInProgress(inProgress.filter((t) => t !== task));
          break;
        case "Completed":
          setCompleted(completed.filter((t) => t !== task));
          break;
        default:
          break;
      }

      toast.success("Ticket moved successfully!");
    }
  };

  return (
    <>
      <div className="add-ticket">
        <input
          type="text"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Enter new ticket"
        />
        <button onClick={handleAddTicket}>Add Ticket</button>
      </div>

      <div className="kanban-board">
        <Column
          title="Backlog"
          tasks={backlog}
          onDrop={(e) => handleDrop(e, "Backlog")}
          onDragStart={handleDragStart}
        />
        <Column
          title="InProgress"
          tasks={inProgress}
          onDrop={(e) => handleDrop(e, "InProgress")}
          onDragStart={handleDragStart}
        />
        <Column
          title="Completed"
          tasks={completed}
          onDrop={(e) => handleDrop(e, "Completed")}
          onDragStart={handleDragStart}
        />
      </div>
    </>
  );
};

export default KanbanBoard;

// eslint-disable-next-line react/prop-types
const Column = ({ title, tasks, onDrop, onDragStart }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task"
          draggable
          onDragStart={(e) => onDragStart(e, task, title)}
        >
          {task}
        </div>
      ))}
    </div>
  );
};

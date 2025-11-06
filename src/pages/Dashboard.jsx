import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });

  // ✅ Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // ✅ Save tasks to localStorage when changed
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Add new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTask({ title: "", description: "", dueDate: "" });
    setShowModal(false);
  };

  // ✅ Delete task
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // ✅ Loading or redirect handling
  if (!isLoaded) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard">
     <nav className="dashboard-nav">
  <div className="dashboard-left">
    {/* Back Button */}
    <button className="back-home-btn" onClick={() => navigate("/")}>
      ← Home
    </button>

    {/* Clickable Logo */}
    <h2
      className="dashboard-logo clickable-logo"
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      Campus<span>Connect</span>
    </h2>
  </div>

  {/* Clerk User Button */}
  <UserButton afterSignOutUrl="/" />
</nav>
      <main className="dashboard-content">
        <h1 className="welcome-text">
          Welcome back, {user?.firstName || "Student"} 👋
        </h1>
        <p className="dashboard-subtitle">
          Your personalized dashboard is coming soon!
        </p>

        <div className="cards">
          <div className="card">
            <h3>Add Task</h3>
            <p>Keep track of assignments and due dates.</p>
            <button className="card-button" onClick={() => setShowModal(true)}>
              Add New Task
            </button>
          </div>

          <div className="card">
            <h3>Your Tasks</h3>
            {tasks.length === 0 ? (
              <p>No tasks added yet.</p>
            ) : (
              <ul className="task-list">
                {tasks.map((task, index) => (
                  <li key={index}>
                    <strong>{task.title}</strong> <br />
                    <small>{task.description}</small> <br />
                    <span>Due: {task.dueDate}</span>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Modal for Adding New Task */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            ></textarea>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <div className="modal-actions">
              <button className="card-button" onClick={handleAddTask}>
                Save Task
              </button>
              <button
                className="card-button"
                style={{ background: "#e2e8f0", color: "#1e293b" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
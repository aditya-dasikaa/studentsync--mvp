import React, { useState, useEffect, useRef } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  // ✅ State variables
  const [newTask, setNewTask] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [newDate, setNewDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const alarmAudioRef = useRef(null);

  const BACKEND_URL = "http://localhost:5000/api/tasks"; // ✅ your backend API

  // ✅ Fetch tasks from MongoDB for this user
  useEffect(() => {
    if (!user) return;
    fetch(`${BACKEND_URL}/${user.id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [user]);

  // ✅ Add new task (POST to backend)
  const handleAddTask = async () => {
    if (!newTask.trim() || !newDate || !priority) return;

    const taskData = {
      userId: user.id,
      text: newTask,
      desc: taskDesc,
      date: newDate,
      priority,
      category,
      alarmEnabled,
      alarmTime,
      status: "pending",
    };

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const savedTask = await res.json();
      setTasks([...tasks, savedTask]);
      setShowModal(false);
      resetTaskForm();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // ✅ Reset form fields
  const resetTaskForm = () => {
    setNewTask("");
    setTaskDesc("");
    setNewDate("");
    setPriority("");
    setCategory("");
    setAlarmEnabled(false);
    setAlarmTime("");
  };

  // ✅ Update task status (PUT to backend)
  const toggleTaskStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ✅ Save edited task (PUT)
  const handleSaveEdit = async () => {
    if (!editingTask) return;
    try {
      const res = await fetch(`${BACKEND_URL}/${editingTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask),
      });
      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      setShowEditModal(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ✅ Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Open edit modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  // ✅ Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  // ✅ Get category icon
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "academic": return "📚";
      case "selfcare": return "🧘";
      case "family": return "👨‍👩‍👧";
      case "work": return "💼";
      case "social": return "🎉";
      case "health": return "❤️";
      case "other": return "📌";
      default: return "";
    }
  };

  // ✅ Loading / redirect
  if (!isLoaded) return <div className="dashboard-loading"><p>Loading...</p></div>;
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard">
      {/* Hidden audio element for alarms */}
      <audio ref={alarmAudioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

      {/* NAVBAR */}
      <nav className="dashboard-nav">
        <div className="dashboard-left">
          <button className="home-btn" onClick={() => navigate("/")}>
            ← Home
          </button>
          <h2 className="dashboard-logo">
            Campus<span>Connect</span>
          </h2>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        <h1 className="welcome-text">
          Welcome back, {user?.firstName || "Student"} 👋
        </h1>
        <p className="dashboard-subtitle">
          Stay organized and manage your tasks with ease.
        </p>

        <div className="cards">
          {/* Add Task Card */}
          <div className="card">
            <h3>Add Task</h3>
            <p>Keep track of assignments and due dates.</p>
            <button className="card-button" onClick={() => setShowModal(true)}>
              Add New Task
            </button>
          </div>

          {/* Tasks Card */}
          <div className="card">
            <h3>Your Tasks</h3>

            {/* FILTER BAR */}
            <div className="filter-bar">
              {["all", "pending", "completed"].map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${filter === type ? "active" : ""}`}
                  onClick={() => setFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* TASK LIST */}
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={`task-item priority-${task.priority} ${
                    task.status === "completed" ? "completed-task" : ""
                  }`}
                >
                  <div className="task-header">
                    <h4>{task.text}</h4>
                    <span
                      className={`status-badge ${task.status}`}
                      onClick={() => toggleTaskStatus(task._id, task.status)}
                    >
                      {task.status === "completed" ? "✔ Completed" : "⏳ Pending"}
                    </span>
                  </div>
                  {task.desc && <p className="task-desc">{task.desc}</p>}
                  <div className="task-meta" onClick={() => openEditModal(task)}>
                    📅 {task.date}
                    {task.alarmEnabled && task.alarmTime && (
                      <span className="alarm-indicator"> | ⏰ {task.alarmTime}</span>
                    )}
                  </div>
                  <div className="task-footer">
                    <span className="priority-label">
                      {task.priority === "high" && "🔴 High"}
                      {task.priority === "medium" && "🟡 Medium"}
                      {task.priority === "low" && "🟢 Low"}
                    </span>
                    {task.category && (
                      <span className="category-badge">
                        {getCategoryIcon(task.category)}{" "}
                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </span>
                    )}
                    <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                      🗑
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </div>
      </main>

      {/* ADD TASK MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Task</h3>
            <input type="text" placeholder="Task Title" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <textarea placeholder="Description (optional)" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} rows="3" />
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
              <option value="">Select Priority</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
              <option value="">Select Category (Optional)</option>
              <option value="academic">📚 Academic</option>
              <option value="selfcare">🧘 Self Care</option>
              <option value="family">👨‍👩‍👧 Family</option>
              <option value="work">💼 Work</option>
              <option value="social">🎉 Social</option>
              <option value="health">❤️ Health</option>
              <option value="other">📌 Other</option>
            </select>

            <div className="alarm-section">
              <label className="alarm-checkbox">
                <input type="checkbox" checked={alarmEnabled} onChange={(e) => setAlarmEnabled(e.target.checked)} />
                <span>Set Reminder/Alarm</span>
              </label>
              {alarmEnabled && (
                <input type="time" value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} className="alarm-time-input" />
              )}
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddTask}>Save Task</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {showEditModal && editingTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <label>Date</label>
            <input type="date" value={editingTask.date} onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })} />
            <label>Category</label>
            <select value={editingTask.category || ""} onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="academic">📚 Academic</option>
              <option value="selfcare">🧘 Self Care</option>
              <option value="family">👨‍👩‍👧 Family</option>
              <option value="work">💼 Work</option>
              <option value="social">🎉 Social</option>
              <option value="health">❤️ Health</option>
              <option value="other">📌 Other</option>
            </select>
            <div className="alarm-section">
              <label className="alarm-checkbox">
                <input
                  type="checkbox"
                  checked={editingTask.alarmEnabled || false}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      alarmEnabled: e.target.checked,
                      alarmTime: e.target.checked ? editingTask.alarmTime : null,
                    })
                  }
                />
                <span>Set Reminder/Alarm</span>
              </label>
              {editingTask.alarmEnabled && (
                <input
                  type="time"
                  value={editingTask.alarmTime || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, alarmTime: e.target.value })}
                />
              )}
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

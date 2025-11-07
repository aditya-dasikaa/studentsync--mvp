// Dashboard.jsx
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

  // Audio ref for alarm sound
  const alarmAudioRef = useRef(null);

  // ✅ Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // ✅ Save tasks to localStorage when changed
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Check for alarms every 30 seconds
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      tasks.forEach(task => {
        if (task.alarmEnabled && task.alarmTime && !task.alarmTriggered) {
          const taskAlarmDateTime = `${task.date}T${task.alarmTime}`;
          
          if (currentDateTime === taskAlarmDateTime) {
            // Trigger alarm
            triggerAlarm(task);
            
            // Mark as triggered
            const updatedTasks = tasks.map(t => 
              t.id === task.id ? { ...t, alarmTriggered: true } : t
            );
            setTasks(updatedTasks);
          }
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkAlarms);
  }, [tasks]);

  // ✅ Trigger alarm notification (WITHOUT alert popup)
  const triggerAlarm = (task) => {
    // Play sound
    if (alarmAudioRef.current) {
      alarmAudioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }

    // Show browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("⏰ Task Reminder", {
        body: `${task.text}\nDue: ${task.date}`,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: `task-${task.id}`
      });
    } else if ("Notification" in window && Notification.permission === "default") {
      // Request permission if not granted
      Notification.requestPermission();
    }
  };

  // ✅ Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Sorting by priority → date
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { high: 1, medium: 2, low: 3, "": 4 };
    const priorityDiff = order[a.priority] - order[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    const dateA = a.date ? new Date(a.date) : new Date("2100-01-01");
    const dateB = b.date ? new Date(b.date) : new Date("2100-01-01");
    return dateA - dateB;
  });

  // ✅ Add new task
  const handleAddTask = () => {
    if (!newTask.trim() || !newDate || !priority) return;

    const updatedTasks = [
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        desc: taskDesc,
        date: newDate,
        priority: priority,
        category: category,
        status: "pending",
        alarmEnabled: alarmEnabled,
        alarmTime: alarmEnabled ? alarmTime : null,
        alarmTriggered: false
      },
    ];

    setTasks(updatedTasks);
    setNewTask("");
    setTaskDesc("");
    setNewDate("");
    setPriority("");
    setCategory("");
    setAlarmEnabled(false);
    setAlarmTime("");
    setShowModal(false);
  };

  // ✅ Toggle Task Completion
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    );
    setTasks(updatedTasks);
  };

  // ✅ Open edit modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  // ✅ Save edited task
  const handleSaveEdit = () => {
    if (!editingTask) return;

    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? { ...editingTask, alarmTriggered: false } : task
    );

    setTasks(updatedTasks);
    setShowEditModal(false);
    setEditingTask(null);
  };

  // ✅ Apply filter
  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  // ✅ Get category icon
  const getCategoryIcon = (cat) => {
    switch(cat) {
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
      {/* Hidden audio element for alarm sound */}
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

          {/* Your Tasks Card */}
          <div className="card">
            <h3>Your Tasks</h3>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

            {/* TASK LIST */}
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item priority-${task.priority} ${
                    task.status === "completed" ? "completed-task" : ""
                  }`}
                >
                  <div className="task-header">
                    <h4>{task.text}</h4>
                    <span
                      className={`status-badge ${
                        task.status === "completed" ? "completed" : "pending"
                      }`}
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      {task.status === "completed" ? "✔ Completed" : "⏳ Pending"}
                    </span>
                  </div>
                  {task.desc && <p className="task-desc">{task.desc}</p>}
                  
                  <div className="task-meta">
                    <p className="task-date-time" onClick={() => openEditModal(task)}>
                      📅 {task.date}
                      {task.alarmEnabled && task.alarmTime && (
                        <span className="alarm-indicator"> | ⏰ {task.alarmTime}</span>
                      )}
                    </p>
                  </div>

                  <div className="task-footer">
                    <span className="priority-label">
                      {task.priority === "high" && "🔴 High"}
                      {task.priority === "medium" && "🟡 Medium"}
                      {task.priority === "low" && "🟢 Low"}
                    </span>
                    {task.category && (
                      <span className="category-badge">
                        {getCategoryIcon(task.category)} {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </span>
                    )}
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

            <input
              type="text"
              placeholder="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />

            <textarea
              placeholder="Task Description (optional)"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              rows="3"
            />

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="">Select Priority</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>

            {/* CATEGORY SELECT */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">Select Category (Optional)</option>
              <option value="academic">📚 Academic</option>
              <option value="selfcare">🧘 Self Care</option>
              <option value="family">👨‍👩‍👧 Family</option>
              <option value="work">💼 Work</option>
              <option value="social">🎉 Social</option>
              <option value="health">❤️ Health</option>
              <option value="other">📌 Other</option>
            </select>

            {/* ALARM SECTION */}
            <div className="alarm-section">
              <label className="alarm-checkbox">
                <input
                  type="checkbox"
                  checked={alarmEnabled}
                  onChange={(e) => setAlarmEnabled(e.target.checked)}
                />
                <span>Set Reminder/Alarm</span>
              </label>

              {alarmEnabled && (
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  className="alarm-time-input"
                />
              )}
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddTask}>
                Save Task
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setAlarmEnabled(false);
                  setAlarmTime("");
                  setCategory("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {showEditModal && editingTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task Details</h3>

            <label className="edit-label">Due Date</label>
            <input
              type="date"
              value={editingTask.date}
              onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
            />

            <label className="edit-label">Category</label>
            <select
              value={editingTask.category || ""}
              onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
              className="category-select"
            >
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
                <input
                  type="checkbox"
                  checked={editingTask.alarmEnabled || false}
                  onChange={(e) => setEditingTask({ 
                    ...editingTask, 
                    alarmEnabled: e.target.checked,
                    alarmTime: e.target.checked ? editingTask.alarmTime : null
                  })}
                />
                <span>Set Reminder/Alarm</span>
              </label>

              {editingTask.alarmEnabled && (
                <input
                  type="time"
                  value={editingTask.alarmTime || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, alarmTime: e.target.value })}
                  className="alarm-time-input"
                />
              )}
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTask(null);
                }}
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
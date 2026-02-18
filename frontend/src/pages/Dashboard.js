import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8080/Assignment/task', {
        credentials: 'include',
      });

      const data = await res.json();
      if (data.status === 'success') {
        setTasks(data.data.tasks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // ⭐ FIX IS HERE ⭐
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id
          ? {
              ...task,          // keep existing user
              ...updatedTask,   // overwrite updated fields
              user: task.user,  // FORCE user retention
            }
          : task
      )
    );

    setEditingTask(null);
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <nav className="navbar">
        <h1>Task Manager</h1>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard">
        <TaskForm
          editingTask={editingTask}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleTaskDeleted}
          onToggleComplete={handleTaskUpdated}
        />
      </div>
    </>
  );
}

export default Dashboard;

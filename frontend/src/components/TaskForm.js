import React, { useState, useEffect } from 'react';

function TaskForm({ onTaskCreated, onTaskUpdated, editingTask, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || ''
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        // Update existing task
        const response = await fetch(
          `http://localhost:8080/Assignment/task/${editingTask._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();


        if (data.status === 'success') {
          onTaskUpdated(data.data.task);
          resetForm();
        }
      } else {
        // Create new task
        const response = await fetch(
          'http://localhost:8080/Assignment/task/createTask',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();


        if (data.status === 'success') {
          onTaskCreated(data.data.task);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: ''
    });
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
          </button>
          {editingTask && (
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

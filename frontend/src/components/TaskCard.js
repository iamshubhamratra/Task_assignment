import React from 'react';

function TaskCard({ task, currentUser, onEdit, onDelete, onToggleComplete }) {
  const isOwnTask = task.user?._id === currentUser?._id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;

    try {
      const res = await fetch(
        `http://localhost:8080/Assignment/task/${task._id}`,
        { method: 'DELETE', credentials: 'include' }
      );
      const data = await res.json();
      if (data.status === 'success') onDelete(task._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/Assignment/task/${task._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ completed: !task.completed }),
        }
      );

      const data = await res.json();
      if (data.status === 'success') {
        onToggleComplete(data.data.task);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      {/* LEFT */}
      <div className="task-left">
        <h4 className={task.completed ? 'strikethrough' : ''}>
          {task.title}
        </h4>

        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}

        <div className="task-meta">
          {/* STATUS */}
          <div
            className={`badge ${
              task.completed ? 'badge-success' : 'badge-pending'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </div>

          {/* SHOW USER INFO ONLY IF NOT OWN TASK */}
          {!isOwnTask && (
            <>
              <div className="badge badge-user">
                👤 {task.user?.name}
              </div>

              <div className="badge badge-email">
                ✉ {task.user?.email}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="task-actions">
        <button
          className="btn-icon btn-complete"
          onClick={handleToggleComplete}
          title="Toggle status"
        >
          ✓
        </button>

        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="btn-icon btn-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

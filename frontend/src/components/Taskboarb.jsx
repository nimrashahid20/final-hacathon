 import React, { useState, useEffect } from 'react';
 import axios from 'axios';

 const TaskBoard = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const fetchTasks = async () => {
    setLoading(true);
    setError(null); 

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(data)) {
        setTasks(data); 
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Error fetching tasks: ' + err.message)
    } finally {
      setLoading(false); 
    }
  };

  
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert('Please enter both title and description');
    
     
   }
return 
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewTask({ title: '', description: '' }); 
      fetchTasks(); 
    } catch (err) {
      setError('Error adding task: ' + err.message); 
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks(); // Reload tasks after deletion
    } catch (err) {
      setError('Error deleting task: ' + err.message); // Handle delete errors
    }
  };

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Task Board</h1>

      <div>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task Description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div style={{ display: 'flex' }}>
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <div
            key={status}
            style={{
              margin: 10,
              border: '1px solid gray',
              width: '250px',
              padding: '10px',
            }}
          >
            <h4>{status}</h4>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task._id} style={{ padding: '8px', marginBottom: '8px' }}>
                  <p>{task.title}</p>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
   );
 };

 export default TaskBoard

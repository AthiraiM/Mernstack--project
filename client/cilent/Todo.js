// client/src/components/Todo.js
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/todo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/todo", { text: task }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit a task
  const editTask = async (id) => {
    const newText = prompt("Edit task:", tasks.find((t) => t._id === id).text);
    if (!newText) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/todo/${id}`, { text: newText }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => editTask(task._id)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

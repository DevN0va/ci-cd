import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTodo({ task: newTask });
    setNewTask("");
    fetchTodos();
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <span
              onClick={() => handleToggle(todo._id, todo.completed)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>
            <button
              className="text-red-500"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoList />
    </div>
  );
}

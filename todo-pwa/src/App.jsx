import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (title, description) => {
    const newTodoData = {
      title,
      description: description,
      date: new Date().toISOString().split("T")[0], // format: YYYY-MM-DD
    };

    try {
      const res = await fetch("http://localhost:3002/api/v1/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodoData),
      });

      const data = await res.json();
      if (res.ok) {
        setTodos([...todos, data.todo]);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Todo PWA</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;

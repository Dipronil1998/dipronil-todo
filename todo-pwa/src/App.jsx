import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchTodos = async (date) => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/todo?date=${date}`);
      const data = await res.json();
      if (res.ok) setTodos(data.response);
      else console.error("Error fetching todos:", data.message);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA');
    setSelectedDate(today);


    fetchTodos(today);
  }, []);

  const addTodo = async (title, description) => {
    const newTodoData = { title, description, date: selectedDate };

    try {
      const res = await fetch("http://localhost:3002/api/v1/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoData),
      });

      const data = await res.json();
      if (res.ok) {
        setShowModal(false)
        fetchTodos();
        const modalEl = document.getElementById('addTodoModal');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
          modalInstance.hide();
        }
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchTodos(newDate); 
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo._id === id ? { ...todo, isComplete: !todo.isComplete } : todo));
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/todo/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        const data = await res.json();
        console.error("Failed to delete todo:", data.message);
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Todo</h1>

      <div className="mb-3">
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <button
        className="btn btn-primary w-100 mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addTodoModal"
        onClick={() => setShowModal(true)}
      >
        Add Todo
      </button>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      <div className="modal fade" id="addTodoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h5 className="modal-title">Add Todo</h5>
            <AddTodo addTodo={addTodo} closeModal={() => setShowModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

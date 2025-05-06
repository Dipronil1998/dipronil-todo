import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA');
    setDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, description, date);
      setTitle("");
      setDescription("");
      const today = new Date().toLocaleDateString('en-CA');
      setDate(today); 
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={!title}>
          Add
        </button>
      </form>
    </div>
  );
}

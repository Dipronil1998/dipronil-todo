import { useEffect, useState } from "react";

export default function AddTodo({ addTodo, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("")

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA');
    setDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title, description);
    setTitle("");
    setDescription("");
    const today = new Date().toLocaleDateString('en-CA');
      setDate(today);
    if (closeModal) closeModal();
    const modal = bootstrap.Modal.getInstance(document.getElementById("addTodoModal"));
    modal.hide();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
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
      <button type="submit" className="btn btn-success w-100" disabled={!title}>Add</button>
    </form>
  );
}

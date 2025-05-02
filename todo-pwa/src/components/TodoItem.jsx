export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
      <li className="flex justify-between items-center border px-2 py-1 rounded">
        <span
          onClick={() => toggleTodo(todo.id)}
          className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
        >
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
          ❌
        </button>
      </li>
    );
  }
  
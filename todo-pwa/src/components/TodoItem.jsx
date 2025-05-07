export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const textStyle = todo.isComplete ? "line-through text-gray-500" : "";

  return (
    <li className="border rounded p-3 mb-2 shadow-sm flex justify-between items-start gap-4">
      <div onClick={() => toggleTodo(todo._id)} className="cursor-pointer flex-1">
        <h3 className={`font-semibold text-lg ${textStyle}`}>{todo.title}</h3>
        {todo.description && (
          <p className={`text-sm mt-1 ${textStyle}`}>{todo.description}</p>
        )}
      </div>
      <button onClick={() => deleteTodo(todo._id)} className="text-red-500 text-xl">
        ❌
      </button>
    </li>
  );
}

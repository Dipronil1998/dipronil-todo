import { useGetTodosQuery } from '../api/apiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"




const TodoList = () => {
    const todo = {
        title:'',
        description:'',
        date:''
    }

    const [newTodo, setNewTodo] = useState(todo)

    const { data: todos, isLoading, isError, isSuccess, error } = useGetTodosQuery();
    // const [addTodo] = useAddTodoMutation()
    // const [updateTodo] = useUpdateTodoMutation()
    // const [deleteTodo] = useDeleteTodoMutation()


    const handleInput = (e)=>{
        setNewTodo({...newTodo, [e.target.name]: e.target.value})
    }
    console.log(newTodo,"newTodo");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ll");
        // addTodo({ id: "1",userId: 1, title: newTodo, completed: false })
        // setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInput}
                    placeholder="Enter new todo"
                    style={{padding: '10px',}}
                />
                 <input
                    type="text"
                    id="new-description"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInput}
                    placeholder="Enter description"
                    style={{padding: '10px',}}
                />
                <input
                    type="date"
                    id="new-date"
                    name="date"
                    value={newTodo.date}
                    onChange={handleInput}
                    style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', transition: 'border-color 0.3s' }}
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>


    let todayLists;
    if (isLoading) {
        todayLists = <p>Loading...</p>
    } else if (isSuccess) {
        todayLists = todos?.response?.map(todo => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            // onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash"
                        // onClick={() => deleteTodo({ id: todo.id })}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        todayLists = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            <h5>Today's tasks</h5>
            {todayLists}
            <h5>Upcoming tasks</h5>
        </main>
    )
}
export default TodoList
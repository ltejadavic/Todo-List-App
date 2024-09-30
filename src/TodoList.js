import React, { useReducer, useState } from "react";

// Reducer function to handle the actions
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // Add a new todo to the state
      return [...state, { id: Date.now(), text: action.text }];
    case "REMOVE_TODO":
      // Remove a todo by filtering it out by its id
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoList() {
  // useReducer hook to manage the state of todos
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  // State to handle the input value of the new todo
  const [todoText, setTodoText] = useState("");

  // Function to add a new todo
  const handleAddTodo = () => {
    if (todoText.trim() === "") return; // Ignore empty input
    dispatch({ type: "ADD_TODO", text: todoText });
    setTodoText(""); // Clear the input field after adding
  };

  // Function to remove a todo by its id
  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)} // Update input field as user types
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
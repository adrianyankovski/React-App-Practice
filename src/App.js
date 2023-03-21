import './App.css';
import { useState, useEffect } from 'react';
import { FormCreator } from './components/todo-creator/todo-creator';
import { TodoItem } from './components/todo-item/todo-item';
import json from './todos.json';

function App() {
  let [todos, setTodos] = useState(json);
  let [completedTodos, setCompletedTodos] = useState([]);
  let [editingIndex, setEditingIndex] = useState(-1);

  const addTodo = (title) => {
    setTodos([...todos, { title, isDone: false }])
  }

  const removeTodo = (index) => {
    return () => {
      const tds = todos.filter((todo, idx) => index !== idx);
      setTodos(tds);
    }
  };

  const completeTodo = (index) => {
    const todo = todos[index];
    setTodos(todos.filter((_, idx) => idx !== index));
    setCompletedTodos([...completedTodos, { ...todo, isDone: true }]);
  };

  const uncompleteTodo = (index) => {
    const todo = completedTodos[index];
    setCompletedTodos(completedTodos.filter((_, idx) => idx !== index));
    setTodos([...todos, { ...todo, isDone: false }]);
  };

  const editTodo = (index, newTitle) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], title: newTitle };
    setTodos(newTodos);
    setEditingIndex(-1);
  }


  useEffect(() => {
    setEditingIndex(-1);
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo app</h1>
      <hr />
      <main>
        <div className="list">
          <FormCreator createTodo={addTodo} />
          {todos.map((todo, index) => {
            if (editingIndex === index) {
              return (
                <FormCreator
                  key={index}
                  createTodo={(title) => editTodo(index, title)}
                  initialTitle={todo.title}
                  cancelEdit={() => setEditingIndex(index)}
                />
              );
            } else {
              return (
                <TodoItem
                  key={index}
                  itemIndex={index}
                  removeItem={removeTodo(index)}
                  title={todo.title}
                  isDone={todo.isDone}
                  checkItem={() => completeTodo(index)}
                  editItem={() => setEditingIndex(index)}
                />
              );
            }
          })}
        </div>
        <div className="list">
          <h2>Completed</h2>
          {completedTodos.map((todo, index) => {
            return (
              <TodoItem
                key={index}
                itemIndex={index}
                removeItem={removeTodo}
                title={todo.title}
                isDone={todo.isDone}
                checkItem={() => uncompleteTodo(index)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;

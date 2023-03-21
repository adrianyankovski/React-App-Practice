import { useState } from 'react';
import './todo-item.css';

export function TodoItem({ title, isDone, checkItem, removeItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdatedTitle(updatedTitle);
    setIsEditing(false);
  };

  return (
    <div className={`todo__item ${isDone ? 'done' : ''}`}>
      {!isEditing ? (
        <>
          <input type="checkbox" checked={isDone} onChange={checkItem} />
          <span onClick={() => setIsEditing(true)}>{updatedTitle}</span>
          <button onClick={removeItem}>X</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(event) => setUpdatedTitle(event.target.value)}
            autoFocus
            onFocus={(event) => event.target.select()}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

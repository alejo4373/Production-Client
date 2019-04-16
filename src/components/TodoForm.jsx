import React, { Component } from 'react';

const TodoForm = (props) => {
  const { handleChange, handleSubmit, inputText} = props
    return (
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputText} placeholder={'Type a todo'}/>
        <button>+</button>
      </form>
    )
}

export default TodoForm;

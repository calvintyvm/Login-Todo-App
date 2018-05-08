import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";

class TodoList extends Component {
  render() {
    return (
      <div>
        <ul className="list">
          {this.props.todos.map(item => {
            return (
              <TodoItems
                key={item._id}
                item={item}
                toggleComplete={this.props.toggleComplete}
                removeTodo={this.props.removeTodo}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

class TodoItems extends Component {
  render() {
    const { item, toggleComplete, removeTodo } = this.props;
    return (
      <li>
        <div className="span">
          <p className="todoitem">{item.todo}</p>
          <div className="buttoncontainer">
            <label htmlFor={item.id}>
              <input
                type="checkbox"
                id={item.id}
                checked={item.complete}
                onClick={() => toggleComplete(item)}
              />
            </label>

            <button
              className="btn btn-primary"
              onClick={() => removeTodo(item)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    );
  }
}

// TodoList.propTypes = {
//   todos: PropTypes.array.isRequired,
//   removeTodo: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired
// };

export default TodoList;

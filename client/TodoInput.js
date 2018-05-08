import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";

class TodoInput extends Component {
  render() {
    const { handleInput, addTodo } = this.props;
    return (
      <div style={styles.input}>
        <form onSubmit={event => addTodo(event)}>
          <input
            className="form-control"
            id="exampleFormControlInput1"
            type="text"
            onChange={event => handleInput(event)}
          />
          <span className="pressenter">Press Enter to Add</span>
          <div />
        </form>
      </div>
    );
  }
}

export default TodoInput;

// TodoInput.propTypes = {
//   handleInput: PropTypes.func.isRequired,
//   addTodo: PropTypes.func.isRequired
// };

import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";

class TodoListFooter extends Component {
  render() {
    let text = "";
    switch (this.props.todoCount) {
      case 0: {
        text = "Nothing to Do";
        break;
      }
      case 1: {
        text = "Todo";
        break;
      }
      default: {
        text = "Too much to not do?";
      }
    }

    return (
      <div>
        <button
          className="btn btn-light"
          type="button"
          onClick={this.props.clearCompleted}
        >
          Clear Completed
        </button>
        <div className="todocount">
          {this.props.todoCount} {this.props.todoCount > 1 ? "todos" : "todo"}
        </div>
        <div style={styles.footerItem2}>
          {/* <span>
            {this.props.todoCount} {this.props.todoCount > 1 ? "todos" : text}
          </span> */}
        </div>
      </div>
    );
  }
}

// TodoListFooter.propTypes = {
//   todoCount: PropTypes.number.isRequired,
//   clearCompleted: PropTypes.func.isRequired
// };

export default TodoListFooter;

import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";

class TodoListHeader extends Component {
  render() {
    return <h1 style={styles.header}>{this.props.title}</h1>;
  }
}

export default TodoListHeader;

//Fallback
TodoListHeader.defaultProps = {
  title: "Something To do!"
};

TodoListHeader.propTypes = {
  title: PropTypes.string.isRequired
};

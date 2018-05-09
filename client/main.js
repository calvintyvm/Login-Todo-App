import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoListHeader from "./TodoListHeader";
import TodoInput from "./TodoInput";
import styles from "./styles";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";
import { Meteor } from "meteor/meteor";
import { ToDos } from "../imports/api/todo";
import { createContainer } from "meteor/react-meteor-data";
import AccountsUIWrapper from "../imports/ui/components/AccountsWrapper";

//mongo insert
//update,delete
class ToDoListApp extends Component {
  constructor() {
    super();
    this.state = {
      inputText: ""
    };
    this.toggleComplete = this.toggleComplete.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  toggleComplete(todo) {
    Meteor.call("todos.toggleComplete", todo);
  }

  //ask maybe?
  removeTodo(todo) {
    Meteor.call("todos.removeTodo", todo);
  }

  clearCompleted(todo) {
    let completedtodos = this.props.todos.filter(todo => {
      return todo.complete === true;
    });
    completedtodos.map(item => {
      Meteor.call("todos.clearCompleted", item);
    });
  }

  handleInput(event) {
    this.setState({ inputText: event.target.value });
  }

  addTodo(todo) {
    todo.preventDefault();
    const newTodo = {
      todo: this.state.inputText,
      completed: false,
      owner: Meteor.userId()
    };
    Meteor.call("todos.addToDo", newTodo);
    exampleFormControlInput1.value = " ";
  }

  render() {
    const { todos } = this.props;
    console.log(todos);
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <div className="container">
          <div className="subcontainer">
            <TodoListHeader title="Todos" />
            {this.props.currentUser && this.props.currentUserId ? (
              <div>
                {this.props.todos.length > 0 ? (
                  <TodoList
                    todos={todos}
                    toggleComplete={this.toggleComplete}
                    removeTodo={this.removeTodo}
                  />
                ) : (
                  <p className="nothing">Nothing to do right now</p>
                )}
                <div>
                  <div className="bottom">
                    <TodoListFooter
                      clearCompleted={this.clearCompleted}
                      todoCount={this.props.todos.length}
                    />
                    <TodoInput
                      handleInput={this.handleInput}
                      addTodo={this.addTodo}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="logged-out-message">
                <p>Please sign in to see your todos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const ToDoAppContainer = createContainer(() => {
  Meteor.subscribe("todos"); // NEW!
  return {
    currentUser: Meteor.user(), // NEW!
    currentUserId: Meteor.userId(), // NEW!
    todos: ToDos.find({}).fetch()
  };
}, ToDoListApp);

Meteor.startup(() => {
  ReactDOM.render(<ToDoAppContainer />, document.getElementById("app"));
});

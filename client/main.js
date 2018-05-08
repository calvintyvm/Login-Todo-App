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
      // todos: [
      //   // { id: 0, todo: "Learn React", completed: false },
      //   // { id: 1, todo: "Learn Redux", completed: false }
      // ],
      inputText: ""
      // lastId: 1
    };
    this.toggleComplete = this.toggleComplete.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  toggleComplete(item) {
    // let todos = this.state.todos.map(todo => {
    //   if (todo.id === item.id) {
    //     todo.completed = !todo.completed;
    //   }
    //   return todo;
    // });
    // this.setState({ todos });

    ToDos.update({ _id: item._id }, { $set: { complete: !item.complete } });
  }

  //ask maybe?
  removeTodo(item) {
    // let todos = this.state.todos.filter(todo => todo.id !== item.id);
    // this.setState({ todos });
    ToDos.remove({ _id: item._id });
  }

  clearCompleted() {
    // let todos = this.state.todos.filter(todo => !todo.completed);
    // this.setState({ todos });
    // ToDos.remove({ complete: { $eq: true } });
    let completedtodos = this.props.todos.filter(todo => {
      return todo.complete === true;
    });
    completedtodos.map(item => {
      ToDos.remove({ _id: item._id });
    });
  }

  handleInput(event) {
    this.setState({ inputText: event.target.value });
  }

  addTodo(event) {
    event.preventDefault();
    // let lastId = this.state.lastId;

    // if (this.state.inputText) {
    //   const newId = lastId + 1;
    //   const newTodo = {
    //     id: newId,
    //     todo: this.state.inputText,
    //     completed: false
    //   };
    //   let todos = this.state.todos.concat(newTodo);
    //   this.setState({ todos, lastId: newId });
    // }
    ToDos.insert({
      todo: this.state.inputText,
      complete: false,
      owner: this.props.currentUserId
    });
  }

  render() {
    // console.log(this.props.todos);
    // console.log(this.state.inputText);
    // console.log(this.props.currentUser == " ");
    const { todos } = this.props;
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
  return {
    currentUser: Meteor.user(), // NEW!
    currentUserId: Meteor.userId(), // NEW!
    todos: ToDos.find({ owner: Meteor.userId() }).fetch()
  };
}, ToDoListApp);

Meteor.startup(() => {
  ReactDOM.render(<ToDoAppContainer />, document.getElementById("app"));
});

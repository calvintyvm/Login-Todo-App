import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "todos.addToDo"(newTodo) {
    // if (todo.owner !== this.userId) {
    //   throw new Meteor.Error(
    //     "todos.toggleComplete.not-authorized",
    //     "You are not allowed to update to-dos for other users."
    //   );
    // }
    ToDos.insert(newTodo);
  },
  "todos.toggleComplete"(todo) {
    // if (todo.owner !== this.userId) {
    //   throw new Meteor.Error(
    //     "todos.toggleComplete.not-authorized",
    //     "You are not allowed to update to-dos for other users."
    //   );
    // }
    ToDos.update(todo._id, {
      $set: { complete: !todo.complete }
    });
  },
  "todos.removeTodo"(todo) {
    // if (todo.owner !== this.userId) {
    //   throw new Meteor.Error(
    //     "todos.toggleComplete.not-authorized",
    //     "You are not allowed to update to-dos for other users."
    //   );
    // }
    ToDos.remove({ _id: todo._id });
  },
  "todos.clearCompleted"(todo) {
    // if (todo.owner !== this.userId) {
    //   throw new Meteor.Error(
    //     "todos.toggleComplete.not-authorized",
    //     "You are not allowed to update to-dos for other users."
    //   );
    // }
    ToDos.remove({ _id: todo._id });
  }
});

if (Meteor.isServer) {
  Meteor.publish("todos", function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}

export const ToDos = new Mongo.Collection("todos");

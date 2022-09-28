const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { Todo } = require("./models");

app.use(bodyParser.json());

app.get("/todos", async function (request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.getAllTodos();
    response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  console.log("Looking for Todo with ID: ", request.params.id);

  try {
    const todo = await Todo.findByPk(request.params.id);
    response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  console.log("Creating new Todo: ", request.body);
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  console.log("We have to update a Todo with ID: ", request.params.id);

  try {
    const todo = await Todo.findByPk(request.params.id);
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);

  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      await todo.delete();
      response.json(true);
    } else {
      response.json(`There is no todo with id ${request.params.id}`);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(false);
  }
});

module.exports = app;

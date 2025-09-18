jest.setTimeout(30000); 
require("dotenv").config();

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("../src/routes/todos");
const Todo = require("../src/models/Todo"); // Import the Mongoose model

const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  // Clear existing data
  await Todo.deleteMany({});

  // Seed sample data
  await Todo.insertMany([
    { task: "Sample Task 1", completed: false },
    { task: "Sample Task 2", completed: true },
    { task: "Sample Task 3", completed: false },
  ]);
});

afterAll(async () => {
  if (mongoose.connection && mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

describe("Todo API", () => {
  it("should fetch all todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].task).toBe("Sample Task 1");
  });

  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ task: "New Test Task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe("New Test Task");

    // Verify total count
    const allTodos = await Todo.find();
    expect(allTodos.length).toBe(4);
  });

  it("should update a todo", async () => {
    const todo = await Todo.findOne({ task: "Sample Task 1" });
    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const todo = await Todo.findOne({ task: "Sample Task 2" });
    const res = await request(app).delete(`/api/todos/${todo._id}`);
    expect(res.statusCode).toBe(200);

    const allTodos = await Todo.find();
    expect(allTodos.length).toBe(2);
  });
});

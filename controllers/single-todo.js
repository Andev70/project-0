import Todo from "../models/todo-model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const getOneTodo = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ msg: "invalid token", status: "failed" });
    }

    const todoId = req.params.todo_id;
    const isValidId = mongoose.isValidObjectId(todoId);
    if (!todoId || !isValidId) {
      return res
        .status(401)
        .json({ msg: "invalid token id", status: "failed" });
    }
    const verify = jwt.verify(authorization, process.env.JWT_SECRET);
    if (!verify) {
      return res
        .status(401)
        .json({ msg: "invalid token identifier", status: "failed" });
    }
    const { _id: id } = verify;
    const singleTodo = await Todo.findOne({ _id: todoId, userId: id });
    if (!singleTodo) {
      return res.status(404).json({ msg: "404 not found", status: "failed" });
    }
    res.status(200).json({ status: "ok", todo: singleTodo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "server error", status: "failed" });
  }
};

export default getOneTodo;

import jwt from "jsonwebtoken";
import Todo from "../models/todo-model.js";
import mongoose from "mongoose";

const deleteTodo = async (req, res) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .json({ msg: "invalid user or unauthorized user", status: "failed" });
    }
    const todoId = req.headers.id;
    const ifValidId = mongoose.isValidObjectId(todoId);
    if (!ifValidId) {
      return res
        .status(401)
        .json({ msg: "invalid todo id.", status: "failed" });
    }
    // verify the token
    const verifyToken = jwt.verify(authorization, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ msg: "no token", status: "failed" });
    }
    console.log(verifyToken);
    const { _id: id } = verifyToken;
    const delTodo = await Todo.findOneAndDelete({ userId: id, _id: todoId });
    if (!delTodo) {
      return res.status(401).json({
        msg: "could not delete your task try again",
        status: "failed",
      });
    }
    const resendAll = await Todo.find({ userId: id });
    res
      .status(200)
      .json({
        msg: "todo deleted successfully",
        status: "ok",
        todos: resendAll,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "server error occured", status: "failed" });
  }
};
export default deleteTodo;

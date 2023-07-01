import Todo from "../models/todo-model.js";
import jwt from "jsonwebtoken";

const updateTodo = async (req, res) => {
  try {
    const { title, description, status, id, __v } = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "token not found", status: "failed" });
    }

    const jwtToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!jwtToken) {
      return res.status(401).json({ msg: "token not found", status: "failed" });
    }
    const { _id: userId } = jwtToken;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: userId },
      { title: title, description: description, status: status, __v: __v }
    );
    if (!updatedTodo) {
      return res.status(401).json({ msg: "cannot update", status: "failed" });
    }

    const updateTodo = await Todo.findById({ _id: id });

    res
      .status(201)
      .json({ msg: "todo has been updated", status: "ok", updateTodo });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "server error", status: "failed" });
  }
};

export default updateTodo;

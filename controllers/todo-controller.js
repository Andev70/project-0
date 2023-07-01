import Todo from "../models/todo-model.js";
import jwt from "jsonwebtoken";
export const getTodos = async (req, res) => {
  try {
    // see if authenticated

    const authenticated = req.headers.authorization;
    if (!authenticated) {
      return res.status(401).json({ msg: "user is not authorized" });
    }

    // get the user id from the token

    const JWT_TOKEN = jwt.verify(authenticated, process.env.JWT_SECRET);

    if (!JWT_TOKEN) res.status(401).json({ msg: "user is not authenticated" });

    const { _id: id, email } = JWT_TOKEN;

    // get the todos

    const todos = await Todo.find({ userId: id });
    if (!todos) {
      return res.status(404).json({ msg: "404 not found" });
    }

    // send the todos
    res.status(200).json({ todos, status: "ok" });
  } catch (e) {
    res.status(500).json({ msg: e });
    console.log(e);
  }
};

export default getTodos;

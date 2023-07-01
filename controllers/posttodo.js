import Todo from "../models/todo-model.js";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";

const postTodo = async (req, res) => {
  try {
    // check authenticatio

    const authenticated = req.headers.authorization;

    const { title } = req.body;
    if (!authenticated) {
      return res.status(401).json({ msg: "authentication failed" });
    }
    // check empty field
    const timestamp = req.body.timestamp;

    if (title === "") {
      return res.status(401).json({ msg: "please provite todo title" });
    } else if (!timestamp) {
      return res.status(401).json({ msg: "time stamp empty" });
    }

    const milliSecond = timestamp;
    const date = DateTime.fromMillis(milliSecond);
    const formattedDate = date.toLocaleString(DateTime.DATETIME_FULL);

    req.body.timestamp = formattedDate;
    // get user token from head

    const JWT_TOKEN = jwt.verify(authenticated, process.env.JWT_SECRET);
    if (!JWT_TOKEN) {
      return res.status(401).json({ msg: "authentication error" });
    }
    const { _id: id, email } = JWT_TOKEN;
    req.body.userId = id;

    //  create todo
    const todo = await Todo.create(req.body);
    if (!todo) {
      return res
        .status(401)
        .json({ msg: "cannot create todo", status: "failed" });
    }
    res
      .status(201)
      .json({ todo, msg: "todo successfully created", status: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "server error" });
  }
};

export default postTodo;

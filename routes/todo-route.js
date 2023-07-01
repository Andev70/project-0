import getTodos from "../controllers/todo-controller.js";
import signup from "../controllers/signup.js";
import postTodo from "../controllers/posttodo.js";
import login from "../controllers/login.js";
import deleteTodo from "../controllers/del-todo.js";
import getOneTodo from "../controllers/single-todo.js";
import updateTodo from "../controllers/update-todo.js";
import editStatus from "../controllers/edit-status.js";
import express from "express";
const router = express.Router();

// signup
// router.route("/:id").get(getuser);

router.route("/signup").post(signup);

// login

router.route("/login").post(login);

// todo related
router.route("/add/todo").post(postTodo);
router.route("/todos").get(getTodos);
router.route("/delete").delete(deleteTodo);
router.route("/:todo_id").get(getOneTodo);
router.route("/update").patch(updateTodo);
router.route("/status").patch(editStatus);
export default router;

import Todo from '../models/todo-model.js';
import jwt from 'jsonwebtoken';

const editStatus = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ msg: 'invalid tooken', status: 'failed' });
    }
    const { todoId, status } = req.body;

    const jwtToken = jwt.verify(authorization, process.env.JWT_SECRET);

    if (!jwtToken) {
      return res.status(401).json({
        msg: 'invalid tooken or verification failed',
        status: 'failed',
      });
    }
    const { _id: id } = jwtToken;
    const updatedStatus = await Todo.findOneAndUpdate(
      { _id: todoId, userId: id },
      { status: status }
    );
    if (!updatedStatus) {
      return res
        .status(401)
        .json({ msg: 'cannot update the todo', status: 'failed' });
    }
    const todos = await Todo.find({ userId: id });
    res.status(201).json({ msg: 'status updated', status: 'ok', todos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'server error', status: 'failed' });
  }
};
export default editStatus;

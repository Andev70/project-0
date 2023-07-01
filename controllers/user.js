import User from "../models/user-model.js";

const getuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ msg: "error" });
    console.log(e);
  }
};

export default getuser;

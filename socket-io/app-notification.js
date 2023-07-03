import jwt from 'jsonwebtoken';
import User from '../model/user-model';

export const onSocketConnection = (ref) => {
  try {
    // when user is connected
    ref.on('connection', (socket) => {
      // user sent id to set socketID
      socket.on('sendID', async (UserID) => {
        // settings start
        const { token } = UserID;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedToken;
        const { id: socketID } = socket;
        const setSocketID = await User.findOneAndUpdate(
          { _id: id },
          { socketID }
        );
        if (!setSocketID) console.log('not setup');
      });
    });
  } catch (e) {
    console.log(e);
  }
};

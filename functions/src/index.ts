import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const StreamChat = require('stream-chat').StreamChat;

const cors = require('cors')({ origin: true });

const serverStreamInstance = StreamChat.getInstance(
  functions.config().stream.key,
  functions.config().stream.secret
);

admin.initializeApp();

export const createStreamUser = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const { user } = request.body;

      if (!user) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'Bad Request'
        );
      }

      try {
        await serverStreamInstance.upsertUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });

        response.status(201).send({ message: 'User created' });
      } catch {}
    });
  }
);

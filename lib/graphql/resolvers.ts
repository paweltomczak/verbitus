import admin from '../firebase/admin';

export const resolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });

        await admin.firestore().collection('users').doc(userRecord.uid).set({
          email: userRecord.email,
          isAdmin: false,
        });

        return {
          uid: userRecord.uid,
          email: userRecord.email,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    verifyUserToken: async (_: any, { token }: { token: string }) => {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        const userDoc = await admin
          .firestore()
          .collection('users')
          .doc(uid)
          .get();

        if (!userDoc.exists) {
          throw new Error('User does not exist');
        }

        if (!userDoc?.data()?.isAdmin) {
          throw new Error('You need to be Admin to access the dashboard');
        }

        const authUser = await admin.auth().getUser(uid);

        return {
          uid: authUser.uid,
          email: authUser.email,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

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
  },
};

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {ListUsersResult} from "firebase-admin/lib/auth/base-auth";
import User from "./user";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// Initialize Firebase Admin
admin.initializeApp();

// Search user emails and return email & uid of matching emails
exports.searchRegisteredEmail = functions
    .region("europe-west1").https
    .onCall(async (data, context) => {
      // Check if the user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );
      }

      // Get the query from the request and convert it to lowercase
      const query: string | null = data.toLowerCase();
      if (query === null) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "The function must be called with a query."
        );
      }

      // Keep looping until we searched all users
      const users: User[] = [];
      let nextPageToken: string | undefined = undefined;

      do {
        const result: ListUsersResult = await admin.auth()
            .listUsers(1000, nextPageToken);
        users.push(...searchusers(query, result));
        nextPageToken = result.pageToken;
      }
      while (nextPageToken);

      return users;
    });


// Search through all user emails and return all users that match the query
const searchusers = (query: string, userList: ListUsersResult): User[] => {
  const users: User[] = [];
  userList.users.forEach((user) => {
    if (user.email !== undefined && user.email.includes(query)) {
      users.push({
        uid: user.uid,
        email: user.email,
      });
    }
  });
  return users;
};


import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {ListUsersResult} from "firebase-admin/lib/auth/base-auth";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// Initialize Firebase Admin
admin.initializeApp();

// Search through all user emails and return all users that match the query
exports.searchUsersByEmail = functions
    .region("europe-west1").https
    .onRequest(async (req, res) => {
      if (req.method !== "GET") {
        res.status(404).send("Not found");
        return;
      }

      // Check if user is authenticated through Firebase
      const tokenId = req.get("Authorization")?.split("Bearer ")[1];
      if (tokenId === undefined) {
        res.status(401).send("Unauthorized");
        return;
      }

      const user = await admin.auth().verifyIdToken(tokenId);
      if (user === null) {
        res.status(401).send("Unauthorized");
        return;
      }

      // Get the query from the request
      const query: string | undefined = req.query.query?.toString();
      if (query === undefined) {
        res.status(400).send("Query is undefined");
        return;
      }

      // Keep looping until we searched all users
      const users: string[] = [];
      let nextPageToken: string | undefined = undefined;

      do {
        const result: ListUsersResult = await admin.auth()
            .listUsers(1000, nextPageToken);
        users.push(...searchusers(query, result));
        nextPageToken = result.pageToken;
      }
      while (nextPageToken);

      res.send(users);
    });


// Search through all user emails and return all users that match the query
const searchusers = (query: string, userList: ListUsersResult) => {
  const users: string[] = [];
  userList.users.forEach((user) => {
    if (user.email !== undefined && user.email.includes(query)) {
      users.push(user.email);
    }
  });
  return users;
};

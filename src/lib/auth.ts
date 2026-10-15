import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI!;
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(url);
  }
  client = globalForMongo._mongoClient;
} else {
  client = new MongoClient(url);
}

const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client, 
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
});

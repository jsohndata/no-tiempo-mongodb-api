import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI } = process.env;
const { DB_NAME } = process.env;
const { COLLECTION_NAME } = process.env;

export async function getDbClient() {
  // Create new MongoClient instance
  const mongo = new MongoClient(MONGO_URI);
  
  // Connect to the MongoDB cluster
  /* await: connect() returns a promise, which resolves when the connection is established. */
  await mongo.connect();

  // Get the database instance
  /* Selects the database with db method from MongoClient */
  const dbClient = mongo.db(DB_NAME);
  
  return ({ 
    dbClient, 
    collectionName: COLLECTION_NAME
  });
}

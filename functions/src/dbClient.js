import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI } = process.env;
const { DB_NAME } = process.env;
const { COLLECTION_NAME } = process.env;

export async function getDbClient() {
  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const dbClient = mongo.db(DB_NAME);
  
  return ({ 
    dbClient, 
    collectionName: COLLECTION_NAME
  });
}

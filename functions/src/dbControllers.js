import { getDbClient } from "./dbClient.js";

const { dbClient, collectionName } = await getDbClient();

// Get: All Docs
export async function getAllDocs(req, res) {
  try {    
    const collection = await dbClient
      .collection(collectionName)
      .find({})
      .limit(10)
      .toArray();

    console.table(collection);
    res.status(200).json({ data: collection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." });
  }
}

// Post: Create Doc
export async function createDoc(req, res) {
  try {
    const collection = await dbClient
      .collection(collectionName)
      .insertOne(req.body)
      
    console.table(collection);
    res.status(201).json({ data: collection });    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." }); 
  }
}

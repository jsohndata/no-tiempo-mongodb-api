import { getDbClient } from "./dbClient.js";
import { ObjectId } from "mongodb";

const { dbClient, collectionName } = await getDbClient();

// Get: All Docs
/* *********************** */
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

// Get: Dic by Id
/* *********************** */
export async function getDocById(req, res) {
  const docId = new ObjectId(req.params.id);

  try {
    const collection = await dbClient
      .collection(collectionName)
      .findOne({ _id: docId });

    console.table(collection);
    res.status(200).json({ data: collection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." });
  }
}

// Post: Create Doc
/* *********************** */
export async function createDoc(req, res) {
  const docContent = req.body;

  try {
    const collection = await dbClient
      .collection(collectionName)
      .insertOne(content)
      
    console.table(collection);
    res.status(201).json({ data: collection }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." }); 
  }
}

// Delete: Doc by Id
/* *********************** */
export async function deleteDoc(req, res) {
  const docId = new ObjectId(req.params.id);  

  try {
    const collection = await dbClient
      .collection(collectionName)
      .deleteOne(
        { _id: docId });

    console.table(collection);
    res.status(200).json({ data: collection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." });
  }
}

// Put: Update Doc by Id
/* *********************** */
export async function updateDoc(req, res) { 
  const docId = new ObjectId(req.params.id);
  const docContent = req.body;

  try {
    const collection = await dbClient
      .collection(collectionName)
      .updateOne(
        { _id: docId }, 
        { $set: docContent});

    console.table(collection);
    res.status(200).json({ data: collection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "💩oopsy! An error occurred." });
  }
}

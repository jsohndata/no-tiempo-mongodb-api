import { getDbClient } from "./dbClient.js";
import { ObjectId } from "mongodb";

const { dbClient, collectionName } = await getDbClient();
const errMessage = { message: "💩oopsy! An error occurred." };

// Get: All Docs
/* *********************** */
export async function getAllDocs(req, res) {
  const sort = req.query.sort || "_id";

  // Check if the sort order is asc or desc
  const sortOrder = sort.startsWith("-") 
    ? -1 
    : 1; 
  
  // Remove the "-" sign from the sort param to get the field to sort by
  const sortBy = sort.slice(1);     
     
  const collection = await dbClient
    .collection(collectionName)
    .find({})
    .sort({ [sortBy]: sortOrder })
    .limit(10)
    .toArray()
    .catch(err => res.status(500).json(errMessage));
  
  console.table(collection);
  res.status(200).json(collection);
}


// Get: Doc by Id
/* *********************** */
export async function getDocById(req, res) {
  const docId = new ObjectId(req.params.id);

  const collection = await dbClient
    .collection(collectionName)
    .findOne({ _id: docId })
    .catch(err => res.status(500).json(errMessage));
  
  console.table(collection);
  res.status(200).json({ data: collection });
}


// Post: Create Doc
/* *********************** */
export async function createDoc(req, res) {
  const docContent = req.body;

  const collection = await dbClient
    .collection(collectionName)
    .insertOne(docContent)
    .catch(err => res.status(500).json(errMessage));
  
    console.table(collection);
    res.status(200).json({ data: collection });
}


// Delete: Doc by Id
/* *********************** */
export async function deleteDoc(req, res) {
  const docId = new ObjectId(req.params.id);

  const collection = await dbClient
    .collection(collectionName)
    .deleteOne(
      { _id: docId })
    .catch(err => res.status(500).json(errMessage));
    
    console.table(collection);
    res.status(200).json({ data: collection });
}


// Put: Update Doc by Id
/* *********************** */
export async function updateDoc(req, res) { 
  const docId = new ObjectId(req.params.id);
  const docContent = req.body;

  const collection = await dbClient
    .collection(collectionName)
    .updateOne(
      { _id: docId }, 
      { $set: docContent })
    .catch(err => res.status(500).json(errMessage));
  
    console.table(collection);
    res.status(200).json({ data: collection });
}

import functions from "firebase-functions";
import express from 'express'; 
import cors from 'cors';
import { getAllDocs, getDocById, createDoc, deleteDoc, updateDoc } from './src/dbControllers.js';  

const app = express();
app.use(express.json());
app.use(cors());
const rootUri = process.cwd();

/* API */
app.get("/api/plants", getAllDocs);
app.get("/api/plants/:id", getDocById);
app.post("/api/plants", createDoc);
app.delete("/api/plants/:id", deleteDoc);
app.patch("/api/plants/:id", updateDoc);


/* Root */
app.get("/", (req,res) => {
  res.status(200).sendFile( rootUri + '/pages/index.html' );
});

/* 404 */
app.get("*", (req,res) => {
  res.status(404).sendFile( rootUri + '/pages/404.html' );
});

export const api = functions.https.onRequest( app );

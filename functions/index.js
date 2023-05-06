import functions from "firebase-functions";
import express from 'express'; 
import cors from 'cors';
import { getAllDocs, createDoc } from './src/dbControllers.js';  

const app = express();
app.use(express.json());
app.use(cors());
const rootUri = process.cwd();

/* API */
app.get("/api/plants", getAllDocs);
app.post("/api/plants", createDoc);
// app.get("/api/plants/:id", getDocById);
// app.put("/api/plants/:id", updateDoc);
// app.delete("/api/plants/:id", deleteDoc);

/* Root */
app.get("/", (req,res) => {
  res.status(200).sendFile( rootUri + '/pages/index.html' );
});

/* 404 */
app.get("*", (req,res) => {
  res.status(404).sendFile( rootUri + '/pages/404.html' );
});

export const api = functions.https.onRequest( app );

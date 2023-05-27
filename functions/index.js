import functions from "firebase-functions";
import express from 'express'; 
import cors from 'cors';
import { getAllDocs, getDocById, getDocByFilter, createDoc, deleteDoc, updateDoc } from './src/plants/dbControllers.js';  
import { getRedirect } from './src/mozartsGhost/index.js';

const app = express();
app.use(express.json());
app.use(cors());
const rootUri = process.cwd();

/* API */
app.get("/api/plants", getAllDocs);
app.get("/api/plants/:id", getDocById);
app.get("/api/plants/filter/:filterType/:filterValue", getDocByFilter);
app.post("/api/plants", createDoc);
app.delete("/api/plants/:id", deleteDoc);
app.patch("/api/plants/:id", updateDoc);

/* Mozart's Ghost */
app.get("/mozartsghost/:id", getRedirect);

/* Root and 404 */
app.get("/", (req,res) => {
  res.status(200).sendFile( rootUri + '/pages/index.html' );
});

app.get("*", (req,res) => {
  res.status(404).sendFile( rootUri + '/pages/404.html' );
});

export const api = functions.https.onRequest( app );

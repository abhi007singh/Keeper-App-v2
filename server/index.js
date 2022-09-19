import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose, { get } from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  })
);

const url = process.env.ATLAS_URL || "mongodb://localhost:27017/KeeperAppDB";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
}

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", notesSchema);

app
  .route("/")
  .get((req, res) => {
    Note.find({}, (err, foundNotes) => {
      if (err) return console.log(err);
      res.send(foundNotes);
    });
  })
  .post((req, res) => {
    // console.log(req.body);
    const note = new Note(req.body);
    note.save((err) => {
      if (err) return console.log(err);
      res.send("Saved to DB.");
    });
  })
app.route("/:id").delete((req, res) => {
    
});

const port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, (err) => {
  console.log("Server is running on port " + port);
});

import express, { Request, Response } from "express";
import { appendFile } from "fs";

// Server
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Thanks for hitting this api!" });
});

app.post("/savetext", (req: Request, res: Response) => {
  const text = req.body.text;

  // Validating text
  if (!text) return res.status(404).json({ msg: "No text found!" });

  // saving text in a text file
  appendFile("data.txt", text, (err) => {
    if (err) return res.status(501).json({ err });
    return res.json({ msg: "Text written successfully!" });
  });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000...");
});

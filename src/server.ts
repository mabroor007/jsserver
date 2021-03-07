import express, { Request, Response } from "express";
import { appendFile } from "fs";
import Users from "./Users";

// Getting the port from the environment variables
let PORT: any = 4000;
if (process.env.PORT) {
  PORT = process.env.PORT;
}

// Server
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get("/", (_: Request, res: Response) => {
  res.json({ msg: `Thappar FROM PORT ${PORT}` });
});

app.post("/savetext", (req: Request, res: Response) => {
  const text = req.body.text;

  // Validating text
  if (!text) return res.status(404).json({ msg: "No text found!" });

  // saving text in a text file
  appendFile("persist/data.txt", text, (err) => {
    if (err) return res.status(501).json({ err });
    return res.json({ msg: "Text written successfully!" });
  });
});

app.post("/login", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Validating the data
    if (!email || !password) {
      return res.status(404).json({
        msg: "Invalid Request",
      });
    }

    const check = Users.loginCheck({ email, password });
    if (check) {
      res.cookie("user", email);
      res.json({ msg: "Login successful" });
    } else {
      res.json({ msg: "User not found!" });
    }
    Users.logger();
  } catch (error) {}
});

app.post("/register", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Validating the data
    if (!email || !password) {
      return res.status(404).json({
        msg: "Invalid Request",
      });
    }

    const check = Users.registerUser({ email, password });

    if (check) {
      res.cookie("user", email);
      res.json({ msg: "register successful" });
    } else {
      res.json({ msg: "Failed to register!" });
    }
  } catch (error) {}
  Users.logger();
});

app.listen(PORT, () => {
  portLog(PORT);
});

function portLog(port: number) {
  console.log(`Server listening on port ${port}`);
}

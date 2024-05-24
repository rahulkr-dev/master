import express from "express";
import { addUserToCourse, sendEmailSync } from "./utils";
const PORT = process.env.PORT || 3000;
const app = express();
import { Queue } from "bullmq";


// this is Producer queue
const emailQueue = new Queue("email-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "Hello from Express Server" });
});

app.post("/add", async (req, res) => {
  console.log("Adding user to course");
  // Critical
  await addUserToCourse();

  // Add email to queue
  await emailQueue.add(`${Date.now()}`,{
    from: "rahulkumar.dev@gmail.com",
    to: "student@gmail.com",
    subject: "Congrats on enrolling in Twitter Course",
    body: "Dear Student, You have been enrolled to Twitter Clone Course.",
  }
);

  return res.json({ status: "success", data: { message: "Enrolled Success" } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

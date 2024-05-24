"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const bullmq_1 = require("bullmq");
// this is Producer queue
const emailQueue = new bullmq_1.Queue("email-queue", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
app.get("/", (req, res) => {
    return res.json({ status: "success", message: "Hello from Express Server" });
});
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Adding user to course");
    // Critical
    yield (0, utils_1.addUserToCourse)();
    // Add email to queue
    yield emailQueue.add(`${Date.now()}`, {
        from: "rahulkumar.dev@gmail.com",
        to: "student@gmail.com",
        subject: "Congrats on enrolling in Twitter Course",
        body: "Dear Student, You have been enrolled to Twitter Clone Course.",
    });
    return res.json({ status: "success", data: { message: "Enrolled Success" } });
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

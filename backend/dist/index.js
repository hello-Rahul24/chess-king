"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const app = (0, express_1.default)();
// simple route for testing
app.get("/", (req, res) => {
    res.send("WebSocket server is running 🎉");
});
const server = http_1.default.createServer(app);
// IMPORTANT: Do NOT use { port: xxxx } on Render
const wss = new ws_1.WebSocketServer({ server });
const gameManager = new GameManager_1.GameManager();
wss.on("connection", (ws) => {
    gameManager.adduser(ws);
    ws.on("close", () => {
        gameManager.removeUser(ws);
    });
});
// Render requires listening on process.env.PORT
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

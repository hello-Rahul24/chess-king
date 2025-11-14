import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const app = express();

// simple route for testing
app.get("/", (req, res) => {
  res.send("WebSocket server is running 🎉");
});

const server = http.createServer(app);

// IMPORTANT: Do NOT use { port: xxxx } on Render
const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

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

import express from "express";
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({ server: app.listen(2567) }),
});

// Placeholder room
gameServer.define("game", class {
  onCreate() {
    console.log("Room created");
  }
});

app.use("/colyseus", monitor());

console.log("Colyseus server running on ws://localhost:2567");

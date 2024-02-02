import app from "./app";
import { createServer } from "node:http";
import initWebSocketApp from "./app-ws";

const fallbackPort = "3000";
const serverPort = process.env.SERVER_PUBLIC_PORT || fallbackPort;

const server = createServer(app);
initWebSocketApp(server);

server.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

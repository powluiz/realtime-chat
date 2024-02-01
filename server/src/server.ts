import app from "./app";
import http from "http";
import appWs from "./app-ws";

const fallbackPort = "3000";
const serverPort = process.env.SERVER_PUBLIC_PORT || fallbackPort;

const server = http.createServer(app);
server.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

appWs(server);

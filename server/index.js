import http from "http";
import setUpWebsocketServer from "./ws/wsControllers/wsServer.js";

const server=http.createServer();


setUpWebsocketServer(server);



server.listen(8080,()=>{
    console.log("Server Listening at Port 8080");
})
import { WebSocketServer } from "ws";
import {v4 as uuidv4} from "uuid";
import url from "url";
import { handleClose,handleMessage } from "./wsControllers.js";

const connections={ };
const users={ };

const setUpWebsocketServer=(server)=>{
    const wsServer=new WebSocketServer({server});
    wsServer.on("connection",(connection,request)=>{
        const {username}=url.parse(request.url,true).query;
        console.log("Username : ",username);
      const uuid=uuidv4();
      
      connections[uuid]=connection;
      
      users[uuid]={
          username:username,
          state:{
      
          }
      };
      
      connection.on("message",message=>handleMessage(message,uuid,users));
      
      connection.on("close",()=>handleClose(uuid,connections,users));
          
      })
      return wsServer;
}

export default setUpWebsocketServer;

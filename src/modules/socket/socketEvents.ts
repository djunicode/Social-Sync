import { FastifyInstance, FastifyRequest } from "fastify";
import { WebSocket } from "ws";

async function socketRoutes(app: FastifyInstance) {

  //test socket route
    app.get("/socket", {websocket:true} ,(socket :WebSocket, req: FastifyRequest) => {
      console.log('a user connected');

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    
      socket.on('message', (msg) => {
        console.log('received message:', msg);
        // Handle the message as needed
      });
    });
}

export default socketRoutes;
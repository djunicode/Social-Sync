import fastify, { FastifyInstance } from "fastify";
import { joinStream, sendMessage } from "./socketControllers";

async function socketRoutes(app: FastifyInstance) {
    
  app.ready((err) => {
    try {
    if (err) throw err;
    app.io.on('connection', (socket):void => {

      app.log.info(`USER CONNECTED:  ${socket.id} `);

      socket.on('join', (stream:string) => joinStream(socket, app, stream));
      
      socket.on('chat', (stream: string, token:string, message: string) => sendMessage(app, stream, token, message));

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    
  } catch (error) {
      console.error("Error starting socket app:", error);
  }
  });
}

export default socketRoutes;
import { FastifyInstance } from "fastify";
import { Socket } from "socket.io";
import { isStream } from "../../utils/stream";
import prisma from "../../utils/prisma";
import { getUser } from "../../utils/user";
import { User } from "@prisma/client";

export async function joinStream(socket: Socket, app: FastifyInstance, stream: string){
    if(!(await isStream(stream)))return;
    socket.join(stream);
    app.log.info(`User joined ${stream}`);
    socket.to(stream).emit('joined', socket.id);
}

export async function sendMessage(app: FastifyInstance, stream: string, token:string , message: string){
    app.log.info({message,stream})
    if(message.trim()===""||!(await isStream(stream))||!token)return;
    const decoded : {userId:string} = await app.jwt.verify(token);
    const user:User|null = await getUser(decoded.userId);
    if(!user)return;
    const comment = await prisma.comment.create({
        data: {
            content:message,
            videoTimestamp:new Date(),
            userUserId: user.userId,
            streamStreamId: stream
        },
    });
    app.io.to(stream).emit('chat', {...comment, user});
  }
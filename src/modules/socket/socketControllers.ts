import { FastifyInstance } from "fastify";
import { Socket } from "socket.io";
import { isStream } from "../../utils/stream";
import prisma from "../../utils/prisma";
import { getUser } from "../../utils/user";
import { User } from "@prisma/client";
import { detectHateSpeech } from "../../utils/hateSpeech";

export async function joinStream(socket: Socket, app: FastifyInstance, stream: string){
    if(!(await isStream(stream)))return;
    socket.join(stream);
    app.log.info(`User joined ${stream}`);
    socket.to(stream).emit('joined', socket.id);
}

export async function sendMessage(app: FastifyInstance, stream: string, token:string , message: string){
    app.log.info({message,stream})
    if(message.trim()===""||!token)return
    const toxicity = await detectHateSpeech({text:message});
    // let tolerable = await new Promise<boolean>((resolve, reject)=>{
    //     if(!toxicity){
    //         console.warn("TOXICITY UNDEFINED!");
    //         resolve(true)
    //     }else{
    //         const toleranceStr = process.env.TOXICITY_TOLERANCE
    //         const tolerance = parseFloat(toleranceStr?toleranceStr:"0.6")
    //         console.log({tolerance, toxicity})
    //         resolve(tolerance>=toxicity)
    //     }
    // })
    // const displayDetection = process.env.DISPLAY_TOXICITY_DETECTION;
    // const toxicityMessage = process.env.TOXICITY_MESSAGE
    // console.log({displayDetection, toxicityMessage})
    // if(!tolerable&&displayDetection==="false")return;
    if(!(await isStream(stream)))return;
    const decoded : {userId:string} = await app.jwt.verify(token);
    const user:User|null = await getUser(decoded.userId);
    if(!user)return;
    const comment = await prisma.comment.create({
        data: {
            // content:tolerable?message:toxicityMessage?toxicityMessage:"[TOXICITY DETECTED]",
            content:message,
            videoTimestamp:new Date(),
            userUserId: user.userId,
            streamStreamId: stream,
            toxicity:toxicity
        },
    });
    console.log({comment})
    app.io.to(stream).emit('chat', {...comment, user});
  }
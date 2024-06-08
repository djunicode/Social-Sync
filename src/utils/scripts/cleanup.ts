import prisma from "../prisma";

export async function cleanPastLiveStrems(){
    try {  
        const streams = await prisma.stream.updateMany({
            where:{
                storageUrl:{not:{startsWith:"https"}}
            },
            data:{
                endTimestamp:(new Date(Date.now())).toISOString()
            }
        })
        return streams.count;
    } catch (error) {
        return 0;  
    }
}

export async function startPastLiveVideos(){
    try {  
        const streams = await prisma.stream.updateMany({
            where:{
                storageUrl:{not:""}
            },
            data:{
                endTimestamp:null
            }
        })
        return streams.count;
    } catch (error) {
        return 0;  
    }
}

export async function addToxicityToComments(){
    try {  
        const streams = await prisma.comment.updateMany({
            where:{
                toxicity:null
            },
            data:{
                toxicity:Math.random()*0.49
            }
        })
        return streams.count;
    } catch (error) {
        return 0;  
    }
}
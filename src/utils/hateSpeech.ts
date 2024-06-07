import { google } from 'googleapis';

const API_KEY = process.env.GOOGLE_API_KEY;

const DISCOVERY_URL = process.env.GOOGLE_API_URL;

export async function detectHateSpeech({ text }: { text: string }): Promise<number> {
    try {
        if (!API_KEY || !DISCOVERY_URL) {
            console.warn("DISOVERY URL OR API KEY NOT FOUND [ALLOWING ALL MESSAGES!]");
            return 0;
        }
        const client: any = await google.discoverAPI(DISCOVERY_URL)
        const analyzeRequest = {
            comment: {
                text: text,
            },
            requestedAttributes: {
                TOXICITY: {},
            },
        };
        const toxicityScore = await new Promise<number>((resolve, reject) => {
            client.comments.analyze(
                {
                    key: API_KEY,
                    resource: analyzeRequest,
                },
                (err: any, response: any) => {
                    if (err) resolve(-1);
                    console.log(text + ": " + JSON.stringify(response.data.attributeScores.TOXICITY.summaryScore.value, null, 2));
                    const toxicity:number = response.data.attributeScores.TOXICITY.summaryScore.value;
                    if (!toxicity) console.warn("response.data.attributeScores.TOXICITY.summaryScore.value is UNDEFINED!")
                    resolve(toxicity ? toxicity : 0);
                });
        })
        return toxicityScore;
    } catch (error) {
        console.warn("ERROR IN HATE SPEECH DETECTION!: " + error);
        return 0;
    }
}
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        const response = new Response(JSON.stringify(prompts), { status: 200 });
        
        // Add the 'Cache-Control' header to prevent caching
        response.headers.set('Cache-Control', 'no-cache, must-revalidate');


        return response;
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
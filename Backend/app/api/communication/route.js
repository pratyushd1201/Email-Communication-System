import { client } from "@/postmark";

export async function GET(request){

    try {
        console.log("inside comm function")
        const response = await client.getOutboundMessages();
        console.log('Outbound messages:', response.Messages);
      } catch (error) {
        console.error('Error fetching outbound messages:', error.message);
      }

    return Response.json({res})
}
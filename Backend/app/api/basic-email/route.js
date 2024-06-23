import { client } from "@/postmark";

export async function POST(request){
    const res = await request.json();
    const {subject, body} = res;
    
    client.sendEmail({
        "From": 'pd.20u10367@btech.nitdgp.ac.in',
        "To": 'pd.20u10367@btech.nitdgp.ac.in',
        "Subject": subject,
        "TextBody": body
    })

    return Response.json({res})
}
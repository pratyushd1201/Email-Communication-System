import { client } from "@/postmark";

export async function POST(request){
    const res = await request.json();
    const {XYZ_services, name} = res;
    
    client.sendEmailWithTemplate({
        "TemplateId": '36369499',
        "From": 'pd.20u10367@btech.nitdgp.ac.in',
        "To": 'pd.20u10367@btech.nitdgp.ac.in',
        "TemplateModel": {
            "XYZ_services": XYZ_services,
            "name": name
        }
    })

    return Response.json({res})
}


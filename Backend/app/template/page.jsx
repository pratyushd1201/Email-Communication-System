'use client';

import { useState } from "react";
import { client } from "@/postmark";

export default function TemplateEmail(){
    const [name, setName] = useState()
    const [XYZ_services, setXYZ_services] = useState()

    async function sendEmail(){
        try{
            await fetch('/api/template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({XYZ_services, name})
            })
            setXYZ_services('');
            setName('')
        } catch(e){
            console.error(e);
        }
    }            

    async function getEmails(startOffset = 0, startCount = 500, todate, fromdate) {

        // const axios = require("axios").default;
        // try {
        //     const url = `http://api.postmarkapp.com/messages/outbound?count=${startCount}&offset=${startOffset}&todate=${todate}&fromdate=${fromdate}`;
        //     const res = await axios.get(url);
        //     return res.data;
        // }
        // catch (err) {
        //     console.log(err)
        // }

        try {
            console.log("inside comm function")
            const response = await client.getOutboundMessages({
            });
            console.log('Outbound messages:', response.Messages);
          } catch (error) {
            console.error('Error fetching outbound messages:', error.message);
          }
    }



    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-white">
                    Send an Email Template
                </h2>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400">XYZ_services</label>
                <input
                   type="text"
                    value={XYZ_services}
                    onChange={(e) => setXYZ_services(e.target.value)}
                    className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                />
            </div>
            <div className="mt-4">
                <button
                    onClick={sendEmail}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Send Email
                </button>
            </div>
        </div>

        <div className="mt-4">
                <button
                    onClick={getEmails}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Get Emails
                </button>
            </div>
    </div>
    )

}
// src/app/api/harvest/route.ts

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Get the URL from the body of the incoming request from the frontend
    const body = await request.json();
    const urlToProcess = body.url;

    if (!urlToProcess) {
      return new Response(JSON.stringify({ detail: 'URL is required' }), { status: 400 });
    }

    // 2. Read the secure environment variables on the server-side
    const apiEndpoint = process.env.SITEHARVESTER_API_URL;
    const apiKey = process.env.SITEHARVESTER_API_KEY;

    if (!apiEndpoint || !apiKey) {
      return new Response(JSON.stringify({ detail: 'API endpoint or key is not configured on the server' }), { status: 500 });
    }
    
    // 3. Make the secure, server-to-server request to your real FastAPI backend
    const fastApiResponse = await fetch(`${apiEndpoint}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey, // <-- The secret key is added here, safely on the server
      },
      body: JSON.stringify({
        url: urlToProcess,
        mode: 'scrape', // You can pass other params from the frontend here too
      }),
    });

    // 4. Handle the response from the FastAPI backend
    if (!fastApiResponse.ok) {
      // If the FastAPI service returned an error, forward it to the frontend
      const errorBody = await fastApiResponse.json();
      return new Response(JSON.stringify(errorBody), { status: fastApiResponse.status });
    }

    // 5. If successful, stream the PDF body directly back to the frontend
    return new Response(fastApiResponse.body, {
      status: 200,
      headers: {
        // Forward the essential headers for the browser to trigger a download
        'Content-Type': 'application/pdf',
        'Content-Disposition': fastApiResponse.headers.get('content-disposition') || 'attachment',
      },
    });

  } catch (error) {
    console.error('Proxy API error:', error);
    return new Response(JSON.stringify({ detail: 'An internal server error occurred' }), { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Read the JSON body from the incoming frontend request
    const formData = await request.json();

    // 2. Get the internal URL of our Python backend from environment variables
    const contactApiUrl = process.env.SITEHARVESTER_USER_API;

    if (!contactApiUrl) {
      // This is a server configuration error
      throw new Error("SITEHARVESTER_USER_API is not defined in environment variables.");
    }

    // 3. Forward the data to the Python/FastAPI service
    const apiResponse = await fetch(`${contactApiUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // 4. Handle the response from the Python service
    const responseBody = await apiResponse.json();

    if (!apiResponse.ok) {
      // If the Python service returned an error, forward that error message
      // and status code to our frontend.
      return NextResponse.json(
        { detail: responseBody.detail || 'An error occurred in the backend service.' },
        { status: apiResponse.status }
      );
    }

    // 5. If successful, forward the success message from the Python service
    return NextResponse.json(responseBody, { status: 200 });

  } catch (error) {
    console.error('Contact API Proxy Error:', error);

    // This catches errors like the fetch failing entirely or a missing env var.
    const errorMessage = error instanceof Error ? error.message : 'An unknown internal server error occurred.';
    return NextResponse.json(
      { detail: errorMessage },
      { status: 500 }
    );
  }
}
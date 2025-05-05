// pages/api/search.js
import type { NextApiRequest, NextApiResponse } from 'next';

// Base URL for your external API
const EXTERNAL_API_URL =
  'https://gak02yuti9.execute-api.us-east-1.amazonaws.com/counties';

/**
 * Handles requests to /api/search
 * Forwards search parameters to the external counties API.
 * @param {NextApiRequest} req - The incoming request object from the client.
 * @param {NextApiResponse} res - The response object to send back to the client.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ensure this handler only responds to GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Get the query parameters from the request object
  // In Pages Router, query params are directly available on req.query
  const { county, state } = req.query; // These will be strings or undefined

  // --- Parameter Validation (Optional but Recommended) ---
  // Ensure at least 'state' is provided
  // Check if state is missing or is an empty string
  if (!state || typeof state !== 'string' || state.trim() === '') {
    return res
      .status(400)
      .json({ error: 'The "state" query parameter is required.' });
  }

  // --- Construct the URL for the external API ---
  const externalUrl = new URL(EXTERNAL_API_URL);
  externalUrl.searchParams.append('state', state); // state is guaranteed to be a non-empty string here

  // Append 'name' only if it exists and is a non-empty string
  if (county && typeof county === 'string' && county.trim() !== '') {
    externalUrl.searchParams.append('county', county);
  }

  console.log(`Forwarding request to: ${externalUrl.toString()}`); // Optional: Log the URL for debugging

  // --- Forward the request to the external API ---
  try {
    const apiResponse = await fetch(externalUrl.toString(), {
      method: 'GET',
      headers: {
        // Add any necessary headers here if your external API requires them
        // 'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY',
      },
    });

    // Check if the external API request was successful
    if (!apiResponse.ok) {
      // If the external API returned an error, forward that error status and message
      // Try to parse error as JSON, otherwise use text
      let errorData;
      try {
        errorData = await apiResponse.json();
      } catch (parseError) {
        console.error(parseError);
        errorData = await apiResponse.text();
      }
      console.error(`External API Error (${apiResponse.status}):`, errorData);
      // Send the same status code received from the external API
      return res.status(apiResponse.status).json({
        error: 'External API request failed.',
        details: errorData, // Include details from external API
      });
    }

    // Get the response data from the external API
    const data = await apiResponse.json(); // Assuming the external API returns JSON

    // --- Return the successful response to the client ---
    // Set cache headers if desired, e.g., cache for 5 minutes
    // res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch (error) {
    // Handle network errors or other issues during the fetch call
    console.error('Error fetching from external API:', error);
    return res
      .status(500)
      .json({ error: 'Failed to fetch data from the external service.' });
  }
}

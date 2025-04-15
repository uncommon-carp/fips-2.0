import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const apiUrl = `https://your-server.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}

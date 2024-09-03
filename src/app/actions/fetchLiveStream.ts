'use server'

import { error } from "console";

export async function FetchLiveStream() {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCW-4nEie-LVG7LK3CkQeBuw&eventType=live&type=video&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
    
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error fetching live stream:', errorDetails);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorDetails.error.message}`);
    }

    let data = await response.json();

    if (data.items && data.items.length > 0) {
        const liveTitle = data.items[0].snippet.title; 

        if (liveTitle.includes("FURIA")) {
            data = data.items[0].id.videoId
            return {data, error: null};
          }
          return { data: null, error: 'furia offline' };
    }
    return { data:null, error: 'furia offline' };
  } catch (error) {
    console.error('FetchLiveStream error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
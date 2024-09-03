import { NextResponse } from "next/server";
import { JSDOM } from 'jsdom';

export async function GET(request: Request) {
  const playerIds = [681, 939, 725, 8706, 1711];
  
  const results = await Promise.all(playerIds.map(async (playerId) => {
    try {
      const response = await fetch(`https://www.vlr.gg/player/${playerId}`);
      const html = await response.text();
  
      const dom = new JSDOM(html);
      const document = dom.window.document;
  
      const name = document.querySelector('.wf-title')?.textContent?.trim().replace(/\s+/g, "");
      const pictureDiv = document.querySelector('.wf-avatar');
        const picture = ("https:" + pictureDiv?.querySelector('img')?.src);

  
      const table = document.querySelector('.wf-table');
      const firstRow = table?.querySelector('tbody tr');
      const cells = firstRow?.querySelectorAll('td');
  
      const imgElement = cells?.[0]?.querySelector('img');
        const agent = ("https://vlr.gg" + imgElement?.getAttribute('src')?.trim());
        const agentName = imgElement?.getAttribute('alt')?.trim();
      const rating = cells?.[3]?.textContent?.trim();
      const acs = cells?.[4]?.textContent?.trim();
      const kd = cells?.[5]?.textContent?.trim();
  
      return {
        playerId,
        name,
        picture,
        rating,
        acs,
        kd,
        agent,
        agentName
      };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
        console.error(`Error fetching data for playerId ${playerId}:`, errorMessage);
        return {
          playerId,
          error: errorMessage
        };
      }
  }));

  const jsonResponse = {
    players: results
  };

  return NextResponse.json(jsonResponse);
}
import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(request: Request) {
  const response = await fetch(
    "https://www.vlr.gg/team/matches/2406/?group=upcoming"
  );
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const matches = document.querySelectorAll(".wf-card.fc-flex.m-item");

  const results = Array.from(matches).map((match) => {
    try {
      const date = match
        .querySelector(".rm-item-score-eta")
        ?.textContent?.trim()
        .replace("w", "sem");
      const logoFurDiv = match.querySelector(".m-item-logo");
      const logoFur = "https:" + logoFurDiv?.querySelector("img")?.src;
      const logoAgainstDiv = match.querySelector(".m-item-logo.mod-right");
      const logoAgainst = "https:" + logoAgainstDiv?.querySelector("img")?.src;
      const nameAgainstDiv = match.querySelector(
        ".m-item-team.text-of.mod-right"
      );
      const nameAgainst = nameAgainstDiv
        ?.querySelector(".m-item-team-name")
        ?.textContent?.replace(/\n/g, "") 
        ?.replace(/\t/g, "") 
        ?.trim();

      return {
        date,
        logoFur,
        logoAgainst,
        nameAgainst,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      console.error(`Error fetching data:`, errorMessage);
      return {
        error: errorMessage,
      };
    }
  });

  const jsonResponse = {
    matches: results,
  };

  return NextResponse.json(jsonResponse);
}

"use server";

import { cache } from 'react';

interface VideoData {
  dataVideo: string | null;
  errorVideo: string | null;
}

const CACHE_TTL = 1000 * 60 * 45;

const cachedFetchLatestVideo = cache(async (): Promise<VideoData> => {
  try {
    const getVideoDetails = async (videoId: string): Promise<string> => {
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      if (!detailsResponse.ok) {
        throw new Error("Erro ao buscar detalhes do vídeo");
      }

      const detailsData = await detailsResponse.json();
      return detailsData.items[0].contentDetails.duration;
    };

    const getNextVideo = async (pageToken: string = ''): Promise<any> => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UChf8LEceNDVGUBb-WR4VJ4A&order=date&type=video&maxResults=50&pageToken=${pageToken}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar vídeos");
      }

      return response.json();
    };

    let pageToken = '';
    while (true) {
      const dataYtApi = await getNextVideo(pageToken);

      if (dataYtApi.items && dataYtApi.items.length > 0) {
        for (const item of dataYtApi.items) {
          const videoId = item.id.videoId;
          const duration = await getVideoDetails(videoId);

          if (duration && duration.startsWith('PT') && parseDuration(duration) >= 60) {
            return { dataVideo: videoId, errorVideo: null };
          }
        }

        pageToken = dataYtApi.nextPageToken;
        if (!pageToken) {
          break;
        }
      } else {
        return { dataVideo: null, errorVideo: "Nenhum vídeo encontrado para o canal especificado." };
      }
    }

    return { dataVideo: null, errorVideo: "Nenhum vídeo normal encontrado." };

  } catch (error) {
    console.error("Erro:", error);
    return { dataVideo: null, errorVideo: error instanceof Error ? error.message : "Erro desconhecido" };
  }
});

export default async function FetchLatestVideo(): Promise<VideoData> {
  return cachedFetchLatestVideo();
}

const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(\d+)M(\d+)S/);
  if (match) {
    return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  }
  return 0;
};
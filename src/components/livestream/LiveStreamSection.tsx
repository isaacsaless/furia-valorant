import React, { useEffect, useState } from "react";
import LoadingLive from "./LoadingLive";
import "@/app/globals.css";
import LiveStream from "../LiveStream";
import FuriaOffline from "@/components/livestream/FuriaOffline";
import { FetchLiveStream } from "@/app/actions/fetchLiveStream";
import FetchLatestVideo from "@/app/actions/fetchLatestVideo";

interface StreamData {
  liveStreamId: string | null;
  latestVideoId: string | null;
  error: string | null;
  loading: boolean;
}

export default function LiveStreamSection() {
  const [streamData, setStreamData] = useState<StreamData>({ 
    liveStreamId: null, 
    latestVideoId: null, 
    error: null, 
    loading: true 
  });
  const [showAlternativeComponent, setShowAlternativeComponent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveStreamResult, latestVideoResult] = await Promise.all([
          FetchLiveStream(),
          FetchLatestVideo()
        ]);

        setStreamData({
          liveStreamId: liveStreamResult.data,
          latestVideoId: latestVideoResult.dataVideo,
          error: liveStreamResult.error || null,
          loading: false
        });
      } catch (err) {
        setStreamData({
          liveStreamId: null,
          latestVideoId: null,
          error: err instanceof Error ? err.message : 'Unexpected error occurred.',
          loading: false
        });
        console.error('Unexpected error:', err);
      }
    };

    fetchData();
  }, []);

  if (streamData.loading) {
    return <LoadingLive />;
  }

  if (streamData.error && streamData.error !== 'furia offline') {
    return <div>Aconteceu um erro inesperado ao tentar carregar a LiveStream</div>;
  }

  if (streamData.error === 'furia offline') {
    if (showAlternativeComponent) {
      return <LiveStream videoId={streamData.latestVideoId || "-sE04n4KFr0"} />;
    }
    
    return (
      <div>
        <FuriaOffline onButtonClick={() => setShowAlternativeComponent(true)} />
      </div>
    );
  }

  return (
    <LiveStream videoId={streamData.liveStreamId || ""} />
  );
}
import React, { useEffect, useState } from "react";
import LoadingLive from "./LoadingLive";
import "@/app/globals.css";
import LiveStream from "../LiveStream";
import FuriaOffline from "@/components/livestream/FuriaOffline";
import { FetchLiveStream } from "@/app/actions/fetchLiveStream";

export default function LiveStreamSection() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchLiveStream();
        if (result.error) {
          setError(result.error);
          console.error('Error fetching data:', result.error);
        } else {
          setData(result.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Unexpected error:', err);
        } else {
          setError('Unexpected error occurred.');
          console.error('Unexpected error occurred:', err);
        }
      }
    };

    fetchData();
  }, []);

  if (error && error !== 'furia offline') {
    return <div>Aconteceu um erro inesperado ao tentar carregar a LiveStream</div>;
  }

  if(error === 'furia offline'){
    return <FuriaOffline/>;
  }

  if (!data || !data.players) {
    return <LoadingLive/>;
  }

  return (
    <LiveStream
    videoId={data}/>
  );
}
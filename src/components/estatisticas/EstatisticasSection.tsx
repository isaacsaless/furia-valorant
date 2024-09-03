import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import PlayerCard from "../PlayerCard";
import { FetchPlayerData } from "@/app/actions/fetchPlayerData";

interface Player {
  playerId: number;
  name: string;
  picture: string;
  rating: string;
  acs: string;
  kd: string;
  agent: string;
  agentName: string;
}

interface Data {
  players: Player[];
}

export default function EstatisticasSection() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchPlayerData();
        if (result.error) {
          setError('Error fetching data: ' + result.error);
          console.error('Error fetching data:', result.error);
        } else {
          setData(result.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Unexpected error: ' + err.message);
          console.error('Unexpected error:', err);
        } else {
          setError('Unexpected error occurred.');
          console.error('Unexpected error occurred:', err);
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || !data.players) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {data.players.length === 0 ? (
        <div>Erro: Sem jogadores disponíveis</div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center bg-bottom-bg pt-10">
          {data.players.map((player: Player) => {
            let picture = player.picture;
  
            if (player.name === "havoc") {
              picture = "https://i.imgur.com/1qfwzks.png";
            } else if (player.name === "mwzera") {
              picture = "https://i.imgur.com/kWcFU2o.png";
            } else if (player.name === "xand") {
              picture = "https://i.imgur.com/cRWEzXp.png";
            } else if (player.name === "nzr") {
              picture = "https://i.imgur.com/gd1Y6Iz.png";
            }
  
            return (
              <PlayerCard
                key={player.playerId}
                name={player.name}
                rating={player.rating}
                acs={player.acs}
                kd={player.kd}
                picture={picture}
                agent={player.agent}
                agentName={player.agentName}
              />
            );
          })}
        </div>
      )}
    </>
  );  
}

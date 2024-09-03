'use client'

import React, { useEffect, useState } from "react";
import MatchCard from "../MatchCard";
import SemJogos from "./SemJogos";
import { FetchMatchData } from "@/app/actions/fetchMatchData";
import "@/app/globals.css";

interface Match {
  date: string;
  logoFur: string;
  logoAgainst: string;
  nameAgainst: string;
}

interface Data {
  matches: Match[];
}

export default function EstatisticasSection() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchMatchData();
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

  if (!data || !data.matches) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {data.matches.length === 0 ? (
        // <div>Erro: Sem jogadores disponíveis</div>
        <div className="bg-bottom-bg min-h-screen pb-20 text-white overflow-hidden">
          <SemJogos/>
        </div>
      ) : (
        <div className="bg-bottom-bg min-h-screen pt-10">
        {data.matches.map((match: Match) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <MatchCard
              date={match.date}
              logoFur={match.logoFur}
              logoAgainst={match.logoAgainst}
              nameAgainst={match.nameAgainst}
            />
          );
        })}
        </div>
      )}
    </>
  );
}
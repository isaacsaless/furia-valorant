'use client'

// import LiveStream from "@/components/LiveStream";
import LiveStreamSection from "@/components/livestream/LiveStreamSection";
import PlayerCard from "@/components/PlayerCard";
import EstatisticasSection from "@/components/estatisticas/EstatisticasSection";
import { useState } from "react";
import CalendarioSection from "@/components/calendario/CalendarioSection";
import CarteirinhaSection from "@/components/carteirinha/CarteirinhaSection";
import "@/app/globals.css";

export default function Home() {
  const [activePage, setActivePage] = useState('estatisticas');

  return (
    <>
      <LiveStreamSection />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-black pb-3 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-start overflow-x-auto custom-scrollbar">
            <div className="flex-shrink-0 flex space-x-4 mb-4 mt-4">
            <button 
                onClick={() => setActivePage('estatisticas')}
                className={`text-white hover:bg-white hover:text-black rounded-lg p-2 text-xl whitespace-nowrap transition duration-300 ease-in-out ${activePage === 'estatisticas' ? 'bg-white text-black' : ''}`}
              >
                Estatísticas
              </button>
              <button 
                onClick={() => setActivePage('carteirinha')}
                className={`text-white hover:bg-white hover:text-black rounded-lg p-2 text-xl whitespace-nowrap transition duration-300 ease-in-out ${activePage === 'carteirinha' ? 'bg-white text-black' : ''}`}
              >
                Carteirinha
              </button>
              <button 
                onClick={() => setActivePage('calendario')}
                className={`text-white hover:bg-white hover:text-black rounded-lg p-2 text-xl whitespace-nowrap transition duration-300 ease-in-out ${activePage === 'calendario' ? 'bg-white text-black' : ''}`}
              >
                Calendario
              </button>
            </div>
          </div>
        </div>
      </div>
      {activePage === 'estatisticas' && (
          <div>
            <EstatisticasSection/>
          </div>
        )}
        {activePage === 'carteirinha' && (
          <div className="">
            <CarteirinhaSection/>
          </div>
        )}
        {activePage === 'calendario' && (
          <div>
            <CalendarioSection/>
          </div>
        )}
    </>
  );
}
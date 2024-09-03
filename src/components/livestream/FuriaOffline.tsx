import "@/app/globals.css";

interface FuriaOfflineProps {
  onButtonClick: () => void;
}

export default function FuriaOffline({ onButtonClick }: FuriaOfflineProps) {
  return (
    <div className="w-full h-auto aspect-video max-h-livestreamSize p-4 border border-gray-200 rounded shadow">
      <div className="flex flex-col items-center justify-center h-full bg-gray-300 rounded dark:bg-gray-400 overflow-hidden">
        <h1 className="text-center">A Fúria Valorant não está jogando agora.</h1>
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-center mb-4">Fique ligado no calendário!</h2>
          <h2 className="mx-4">Ou veja o último vídeo da Fúria Valorant clicando <button onClick={onButtonClick} className="text-blue-700 underline">aqui</button></h2>
        </div>
      </div>
    </div>
  );
}
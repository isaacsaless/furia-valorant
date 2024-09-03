import Image from "next/image";
import McLovin from "@/assets/mcLovin.jpeg";
import CertificadoFur from "@/assets/certificado-fur.png";
import Carteirinhabg from "@/assets/carteirinha-bg.png";
import BarsCode from "@/assets/code-bars.png";
import "@/app/globals.css";

interface BodyProps {
  picture: string;
  name: string;
}

export default function Carteirinha({picture, name}: BodyProps) {
  const date = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="relative w-100 h-60 flex flex-col items-start rounded-xl overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Carteirinhabg.src})`,
          filter: "blur(2px)",
        }}
      />
      <div className="relative z-10 flex flex-row bg-transparent mt-6">
        <div className="flex flex-col items-center justify-center text-center ml-2 w-28">
          <Image
            src={picture}
            alt="User pfp"
            width={110}
            height={110}
            className="object-contain"
          />
          <Image
            src={BarsCode}
            alt="Logo Valorant"
            width={110}
            height={10}
            className="object-contain mt-2 mb-1"
          />
          <h1 className="text-base font-bold text-white truncate w-full">
            {name}
          </h1>
        </div>
        <div className="flex flex-col ml-4">
          <h1 className="text-2xl font-bold text-center mb-3">
            Fã furioso certificado
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span className="text-xs">EXP</span>
              <span className="font-bold text-sm">{date}</span>
            </div>
            <div className="flex flex-row mt-3">
              <span className="text-xs">VAL</span>
              <span className="font-bold text-sm">10/07/2029</span>
            </div>
          </div>
          <Image
            src={CertificadoFur}
            alt="Certificado Furia"
            width={100}
            height={100}
            className="ml-36"
          />
        </div>
      </div>
    </div>
  );
}

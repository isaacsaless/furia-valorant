import Image from "next/image"
import "@/app/globals.css"

interface BodyProps {
    name: string;
    picture: string;
    agent: string;
    rating: string;
    acs: string;
    kd: string;
    agentName: string;
}

export default function PlayerCard({name, rating, acs, kd, picture, agent, agentName}: BodyProps){
    return(
        <div className="bg-card-bg w-100 flex flex-row mb-24 border-4 border-gold sm:ml-0 md:ml-4 rounded-sm">
            <Image 
                src={picture}
                alt="Foto jogador"
                width={150}
                height={150}
                className="mr-10"/>

            <div className="flex flex-col pr-5 justify-center">
                <div className="bg-gray-400">
                <Image 
                    src={agent}
                    alt="Logo agente"
                    width={40}
                    height={40}/>
                </div>
                <span className="text-sm text-white">{agentName}</span>
            </div>

            <div className="flex flex-col text-center justify-center text-white">
                <h1 className="text-3xl">{name}</h1>
                <span>Rating: {rating}</span>
                <span>Acs: {acs}</span>
                <span>Kd: {kd}</span>
            </div>
        </div>
    )
}
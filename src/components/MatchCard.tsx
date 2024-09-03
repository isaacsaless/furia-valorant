import "@/app/globals.css"
import Image from "next/image"

interface BodyProps {
    date: string;
    logoFur: string;
    logoAgainst: string;
    nameAgainst: string;
}

export default function MatchCard({date, logoFur, logoAgainst, nameAgainst}: BodyProps){
    return(
        <div className="bg-card-bg flex flex-row mb-24 border-4 border-gold ml-4 w-11/12 h-24 rounded-sm text-white overflow-hidden">
            <div className="flex items-center justify-center h-full w-full">
                <span>Fúria</span>
                <Image src={logoFur} width={50} height={50} alt="Logo Fúria" className="mr-4 ml-4"/>
                <div className="flex flex-col text-center">
                    <span>{date}</span>
                    <span className="text-red-700">Contra</span>
                </div>
                <Image src={logoAgainst} width={50} height={50} alt="Logo adversário Fúria" className="ml-4 mr-4"/>
                <span>{nameAgainst}</span>
            </div>
        </div>
    )
}
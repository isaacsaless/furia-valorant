import Image from "next/image"
import LogoFuria from "@/assets/furia-logo.png"
import LogoValorant from "@/assets/valorant-logo.png"

export default function NavBar(){
    return(
        <nav className="bg-black border-b-2 border-b-gold">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="https://furia.gg/" target="_blank">
                                <Image 
                                src={LogoFuria}
                                alt="Logo Furia"
                                width={50}
                                height={50}/>
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Image 
                        src={LogoValorant}
                        alt="Logo Valorant"
                        width={150}
                        height={150}
                        priority={true}
                        />
                    </div>
                    <div className="md:block">
                        <div className="ml-4 flex items-center space-x-4">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
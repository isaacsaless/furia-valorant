interface BodyProps {
    videoId: string;
}

export default function LiveStream({videoId}: BodyProps){
    return (
    <div className="relative border-b-8 border-b-gold">
        <iframe className="w-full h-auto aspect-video max-h-livestreamSize" width="853" height="480" src={`https://www.youtube.com/embed/${videoId}`} title="Let It Happen" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    )
}
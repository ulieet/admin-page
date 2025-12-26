import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AnnouncementData {
  texto: string;
  enlace?: string; 
  bgColor?: string;
  textColor?: string;
  animado?: boolean; 
}

export function BloqueAnnouncement({ data }: { data: AnnouncementData }) {
  const {
    texto = "¡Aprovecha nuestras ofertas exclusivas!",
    enlace,
    bgColor = "#000000",
    textColor = "#ffffff",
    animado = false,
  } = data;

  const content = (
    <div className="flex items-center justify-center h-full px-4">
      <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
        {texto}
        {enlace && !animado && <ArrowRight className="w-4 h-4" />}
      </span>
    </div>
  );

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {animado ? (
        <div className="py-2.5 flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex min-w-full justify-around items-center gap-8 px-4">
            <span>{texto}</span>
            <span>{texto}</span>
            <span>{texto}</span>
            <span>{texto}</span>
          </div>
          <div className="animate-marquee flex min-w-full justify-around items-center gap-8 px-4 absolute top-2.5 left-full">
            <span>{texto}</span>
            <span>{texto}</span>
            <span>{texto}</span>
            <span>{texto}</span>
          </div>
        </div>
      ) : (
        <div className="py-2.5 container mx-auto text-center">
          {enlace ? (
            <Link href={enlace} className="hover:underline decoration-1 underline-offset-4 block w-full h-full">
              {content}
            </Link>
          ) : (
            content
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
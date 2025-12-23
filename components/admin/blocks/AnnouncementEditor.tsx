"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; 
import { Card } from "@/components/ui/card";

interface AnnouncementEditorProps {
  data: {
    texto?: string;
    enlace?: string;
    bgColor?: string;
    textColor?: string;
    animado?: boolean;
  };
  onChange: (campo: string, valor: any) => void;
}

export default function AnnouncementEditor({ data, onChange }: AnnouncementEditorProps) {
  const texto = data.texto || "";
  const enlace = data.enlace || "";
  const bgColor = data.bgColor || "#000000";
  const textColor = data.textColor || "#ffffff";
  const animado = data.animado || false;

  return (
    <div className="space-y-6 p-4 border rounded-md bg-slate-50">
      
      {/* VISTA PREVIA DENTRO DEL EDITOR */}
      <div className="space-y-2">
        <Label>Vista Previa Rápida</Label>
        <div 
            className="p-3 rounded text-center text-sm font-medium border shadow-sm transition-colors"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {texto || "Escribe un texto..."} {animado && "(Animación activada)"}
        </div>
      </div>

      <div className="grid gap-5">
        {/* CAMPO DE TEXTO */}
        <div className="space-y-2">
          <Label>Texto del Anuncio</Label>
          <Input
            value={texto}
            onChange={(e) => onChange("texto", e.target.value)}
            placeholder="Ej: ¡Envios Gratis en compras superiores a $50.000!"
          />
        </div>

        {/* CAMPO DE ENLACE */}
        <div className="space-y-2">
          <Label>Enlace (Opcional)</Label>
          <Input
            value={enlace}
            onChange={(e) => onChange("enlace", e.target.value)}
            placeholder="https://..."
          />
          <p className="text-[11px] text-muted-foreground">Si lo dejas vacío, será solo un texto informativo.</p>
        </div>

        {/* SELECTORES DE COLOR */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Color de Fondo</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => onChange("bgColor", e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input 
                value={bgColor}
                onChange={(e) => onChange("bgColor", e.target.value)}
                className="font-mono text-xs uppercase"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Color del Texto</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => onChange("textColor", e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input 
                value={textColor}
                onChange={(e) => onChange("textColor", e.target.value)}
                className="font-mono text-xs uppercase"
              />
            </div>
          </div>
        </div>

        {/* SWITCH ANIMACIÓN */}
        <div className="flex items-center justify-between border p-3 rounded-lg bg-white">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">Modo Deslizante (Marquee)</Label>
            <p className="text-xs text-muted-foreground">
              El texto se moverá infinitamente de derecha a izquierda.
            </p>
          </div>
          <Switch
            checked={animado}
            onCheckedChange={(val) => onChange("animado", val)}
          />
        </div>
      </div>
    </div>
  );
}
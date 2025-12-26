"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FaqEditorProps {
  data: {
    titulo?: string;
    descripcion?: string; 
    items?: { pregunta: string; respuesta: string }[];
  };
  onChange: (campo: string, valor: any) => void;
}

export default function FaqEditor({ data, onChange }: FaqEditorProps) {
  const items = Array.isArray(data.items) ? data.items : [];
  const titulo = data.titulo || "";
  const descripcion = data.descripcion || "";

  const handleTituloChange = (val: string) => onChange("titulo", val);
  const handleDescripcionChange = (val: string) => onChange("descripcion", val);

  const handleItemChange = (index: number, field: "pregunta" | "respuesta", val: string) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: val,
    };
    onChange("items", newItems);
  };

  const addFaq = () => {
    // 'pregunta' y 'respuesta' para coincidir frontend BloqueFaq
    const newItems = [...items, { pregunta: "", respuesta: "" }];
    onChange("items", newItems);
  };

  const removeFaq = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange("items", newItems);
  };

  return (
    <div className="space-y-6 p-4 border rounded-md bg-slate-50">
      <div className="space-y-2">
        <Label>Título de la Sección FAQ</Label>
        <Input
          value={titulo}
          onChange={(e) => handleTituloChange(e.target.value)}
          placeholder="Ej: Preguntas Frecuentes"
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label>Descripción (Opcional)</Label>
        <Textarea
          value={descripcion}
          onChange={(e) => handleDescripcionChange(e.target.value)}
          placeholder="Texto introductorio..."
          className="bg-white"
          rows={2}
        />
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center justify-between">
            <Label>Lista de Preguntas ({items.length})</Label>
        </div>
        
        {items.length === 0 && (
          <div className="text-center p-6 border-2 border-dashed rounded-lg text-slate-400 bg-white">
            No hay preguntas agregadas aún.
          </div>
        )}

        {items.map((item, index) => (
          <Card key={index} className="relative group overflow-hidden">
            <CardContent className="pt-6 space-y-4 bg-white">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => removeFaq(index)}
                title="Eliminar pregunta"
              >
                <Trash2 className="h-3 w-3" />
              </Button>

              <div className="grid gap-4">
                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-500">Pregunta #{index + 1}</Label>
                    <Input
                    value={item.pregunta}
                    onChange={(e) => handleItemChange(index, "pregunta", e.target.value)}
                    placeholder="¿Cuál es la duda?"
                    className="font-medium"
                    />
                </div>
                
                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-500">Respuesta</Label>
                    <Textarea
                    value={item.respuesta}
                    onChange={(e) => handleItemChange(index, "respuesta", e.target.value)}
                    placeholder="Escribe la respuesta detallada..."
                    rows={3}
                    className="resize-none"
                    />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          onClick={addFaq} 
          variant="outline" 
          className="w-full border-dashed border-2 hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-colors py-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar Nueva Pregunta
        </Button>
      </div>
    </div>
  );
}